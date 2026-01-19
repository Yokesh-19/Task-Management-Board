const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Validate environment variables
if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
  console.error('Missing required environment variables: MONGODB_URI, JWT_SECRET');
  process.exit(1);
}

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '10mb' }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Task Schema
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  status: { type: String, enum: ['todo', 'inprogress', 'done'], default: 'todo' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Task = mongoose.model('Task', taskSchema);

// Auth middleware
const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Input validation
const validateInput = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password || typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ message: 'Invalid input' });
  }
  if (username.length < 3 || password.length < 6) {
    return res.status(400).json({ message: 'Username min 3 chars, password min 6 chars' });
  }
  next();
};

// Auth routes
app.post('/api/register', validateInput, async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username: username.trim(), password: hashedPassword });
    await user.save();
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'User already exists' });
    } else {
      res.status(500).json({ message: 'Registration failed' });
    }
  }
});

app.post('/api/login', validateInput, async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username.trim() });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: 'Login failed' });
  }
});

// Task routes
app.get('/api/tasks', auth, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/tasks', auth, async (req, res) => {
  try {
    const { title, description, status } = req.body;
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ message: 'Title is required' });
    }
    const taskData = {
      title: title.trim(),
      description: description ? description.trim() : '',
      status: ['todo', 'inprogress', 'done'].includes(status) ? status : 'todo',
      userId: req.userId
    };
    const task = new Task(taskData);
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task' });
  }
});

app.put('/api/tasks/:id', auth, async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const updateData = {};
    if (title && typeof title === 'string') updateData.title = title.trim();
    if (description !== undefined) updateData.description = description ? description.trim() : '';
    if (status && ['todo', 'inprogress', 'done'].includes(status)) updateData.status = status;
    
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      updateData,
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update task' });
  }
});

app.delete('/api/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete task' });
  }
});

// Seed data
app.post('/api/seed', async (req, res) => {
  try {
    const demoUsername = 'demo';
    const demoPassword = 'demo123';
    
    const hashedPassword = await bcrypt.hash(demoPassword, 10);
    let user = await User.findOne({ username: demoUsername });
    if (!user) {
      user = new User({ username: demoUsername, password: hashedPassword });
      await user.save();
    }

    const sampleTasks = [
      { title: 'Setup project structure', description: 'Initialize React and Node.js setup', status: 'done', userId: user._id },
      { title: 'Implement authentication', description: 'Add JWT-based user authentication', status: 'inprogress', userId: user._id },
      { title: 'Create Kanban board UI', description: 'Build drag-and-drop interface', status: 'todo', userId: user._id },
      { title: 'Add task management', description: 'CRUD operations for tasks', status: 'todo', userId: user._id }
    ];

    await Task.deleteMany({ userId: user._id });
    await Task.insertMany(sampleTasks);
    
    res.json({ message: 'Sample data created', credentials: { username: demoUsername, password: demoPassword } });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding data' });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));