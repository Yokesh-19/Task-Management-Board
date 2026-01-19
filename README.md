# 🚀 Kanban Task Management Board

A full-stack Kanban board application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring drag-and-drop functionality, JWT authentication, and real-time toast notifications.

![Kanban Board Demo](./images/kanban-overview.png)

## ✨ Features

### 🔐 **Authentication System**
- JWT-based user authentication
- Secure password hashing with bcrypt
- User registration and login
- Protected routes and API endpoints

![Login Screen](./images/login-screen.png)

### 📋 **Kanban Board**
- **Three Columns**: To Do, In Progress, Done
- **Drag & Drop**: Smooth task movement between columns using React DnD
- **Real-time Updates**: Instant UI updates with optimistic rendering
- **Task Counters**: Live count of tasks in each column

![Kanban Board](./images/kanban-board.png)

### 📝 **Task Management**
- **Create Tasks**: Add new tasks with title, description, and status
- **Edit Tasks**: Modify existing tasks with inline editing
- **Delete Tasks**: Remove tasks with confirmation dialog
- **Status Management**: Automatic status updates when dragging between columns

![Task Creation](./images/task-creation.png)
![Task Editing](./images/task-editing.png)

### 🎨 **User Interface**
- **Beautiful Gradients**: Modern glass-morphism design
- **Responsive Layout**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Hover effects and transitions
- **Toast Notifications**: Real-time feedback for all actions

![Toast Notifications](./images/toast-notifications.png)

### 🎯 **Demo Mode**
- **One-Click Demo**: Load sample data instantly
- **Pre-configured User**: Demo credentials provided
- **Sample Tasks**: Ready-to-use tasks across all columns

![Demo Data](./images/demo-data.png)

## 🛠️ Technology Stack

### **Frontend**
- **React.js** - UI library with hooks and functional components
- **React DnD** - Drag and drop functionality
- **Material-UI** - UI components and dialogs
- **React Toastify** - Toast notifications
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with gradients and animations

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (choose one option below)
- **npm** or **yarn** package manager

### MongoDB Setup Options

**Option 1: Local MongoDB**
```bash
# Download and install MongoDB Community Edition
# https://www.mongodb.com/try/download/community
# Start MongoDB service
mongod
```

**Option 2: MongoDB Atlas (Cloud) - Recommended**
```bash
# 1. Create free account at https://www.mongodb.com/atlas
# 2. Create a cluster
# 3. Get connection string
# 4. Update .env file with your connection string
```

**Option 3: Docker**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd "Kanban Task Management Board"
```

### 2. Install Dependencies
```bash
# Install all dependencies (frontend + backend)
npm run install-all

# OR install separately:
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend/client
npm install
```

### 3. Environment Configuration
Create a `.env` file in the `backend` directory:
```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/kanban-board
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/kanban-board

# JWT Secret Key (use a strong secret in production)
JWT_SECRET=your-super-secret-jwt-key-here

# Server Port
PORT=5001
```

### 4. Start the Application
```bash
# Start both frontend and backend concurrently
npm run dev

# OR start separately:
# Terminal 1 - Backend (from root directory)
npm run server

# Terminal 2 - Frontend (from root directory)  
npm run client
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001

## 🎮 Demo Usage

### Quick Demo Setup
1. Open http://localhost:3000
2. Click **"Load Demo Data"** button
3. Login with demo credentials:
   - **Username**: `demo`
   - **Password**: `demo123`
4. Start using the Kanban board!

### Manual Setup
1. Click **"Register"** to create a new account
2. Fill in your username and password
3. Start creating tasks and organizing your workflow

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| POST | `/api/register` | Register new user | `{ username, password }` |
| POST | `/api/login` | Login user | `{ username, password }` |

### Task Endpoints (Protected)

| Method | Endpoint | Description | Body | Headers |
|--------|----------|-------------|------|---------|
| GET | `/api/tasks` | Get user's tasks | - | `Authorization: Bearer <token>` |
| POST | `/api/tasks` | Create new task | `{ title, description?, status? }` | `Authorization: Bearer <token>` |
| PUT | `/api/tasks/:id` | Update task | `{ title?, description?, status? }` | `Authorization: Bearer <token>` |
| DELETE | `/api/tasks/:id` | Delete task | - | `Authorization: Bearer <token>` |

### Utility Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/seed` | Create demo user and sample tasks |

### Example API Calls

```javascript
// Register new user
const response = await axios.post('/api/register', {
  username: 'john_doe',
  password: 'securepassword123'
});

// Login
const loginResponse = await axios.post('/api/login', {
  username: 'john_doe',
  password: 'securepassword123'
});

// Create task (with JWT token)
const taskResponse = await axios.post('/api/tasks', {
  title: 'Complete project documentation',
  description: 'Write comprehensive README and API docs',
  status: 'todo'
}, {
  headers: { Authorization: `Bearer ${token}` }
});
```

## 📁 Project Structure

```
Kanban Task Management Board/
├── backend/
│   ├── server.js              # Express server with API routes
│   ├── .env                   # Environment variables
│   └── package.json           # Backend dependencies
├── frontend/client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js       # Authentication component
│   │   │   ├── KanbanBoard.js # Main board with DnD
│   │   │   ├── Column.js      # Drop zone for tasks
│   │   │   ├── TaskCard.js    # Draggable task component
│   │   │   └── TaskDialog.js  # Task creation/editing modal
│   │   ├── styles/
│   │   │   ├── App.css        # Global styles
│   │   │   ├── Login.css      # Login page styles
│   │   │   ├── KanbanBoard.css# Board layout styles
│   │   │   ├── Column.css     # Column styles
│   │   │   ├── TaskCard.css   # Task card styles
│   │   │   └── TaskDialog.css # Dialog styles
│   │   ├── App.js             # Main app component
│   │   └── index.js           # React entry point
│   └── package.json           # Frontend dependencies
├── package.json               # Root package.json with scripts
└── README.md                  # This file
```

## 🔧 Available Scripts

### Root Directory Scripts
```bash
npm run install-all    # Install all dependencies
npm run dev            # Start both frontend and backend
npm run server         # Start backend only
npm run client         # Start frontend only
npm run build          # Build frontend for production
```

### Backend Scripts
```bash
cd backend
npm start              # Start backend server
npm run dev            # Start with nodemon (development)
```

### Frontend Scripts
```bash
cd frontend/client
npm start              # Start development server
npm run build          # Build for production
npm test               # Run tests
```

## 🗄️ Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  username: String (required, unique),
  password: String (required, hashed),
  createdAt: Date
}
```

### Task Model
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (optional),
  status: String (enum: ['todo', 'inprogress', 'done']),
  userId: ObjectId (reference to User),
  createdAt: Date
}
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Authentication**: Secure token-based auth
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for specific origins
- **User Isolation**: Tasks are user-specific
- **Environment Variables**: Sensitive data in .env files

## 🎨 Customization

### Modify Columns
Edit the `columns` array in `frontend/client/src/components/KanbanBoard.js`:
```javascript
const columns = [
  { id: 'todo', title: 'To Do' },
  { id: 'inprogress', title: 'In Progress' },
  { id: 'done', title: 'Done' },
  { id: 'review', title: 'Review' } // Add new column
];
```

### Update Styling
- **Colors**: Modify gradient colors in CSS files
- **Layout**: Adjust spacing and sizing in component styles
- **Animations**: Customize transitions and hover effects

### Add Task Fields
1. Update task schema in `backend/server.js`
2. Modify TaskDialog component for new fields
3. Update TaskCard to display new information

## 🐛 Troubleshooting

### Common Issues

**1. MongoDB Connection Error**
```bash
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution**: Ensure MongoDB is running locally or check Atlas connection string

**2. Port Already in Use**
```bash
Error: listen EADDRINUSE :::3000
```
**Solution**: Kill existing processes or change ports in package.json

**3. JWT Token Issues**
```bash
Error: jwt malformed
```
**Solution**: Clear localStorage and login again

**4. CORS Errors**
```bash
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**: Check backend CORS configuration matches frontend URL

### Debug Commands
```bash
# Check if MongoDB is running
mongo --eval "db.adminCommand('ismaster')"

# Check running processes on ports
netstat -an | grep :3000
netstat -an | grep :5001

# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
```bash
cd frontend/client
npm run build
# Deploy the 'build' folder
```

### Backend Deployment (Heroku/Railway)
```bash
# Set environment variables in hosting platform
MONGODB_URI=your-atlas-connection-string
JWT_SECRET=your-production-secret
PORT=5000
```

### Full Stack Deployment
1. Deploy backend to Heroku/Railway
2. Update frontend API base URL
3. Deploy frontend to Netlify/Vercel
4. Update CORS settings in backend

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the API documentation
3. Ensure all dependencies are properly installed
4. Verify MongoDB connection and environment variables

---

**Happy Coding! 🎉**

Built with ❤️ using the MERN Stack