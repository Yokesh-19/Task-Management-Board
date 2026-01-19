# 🚀 Kanban Task Management Board

A full-stack Kanban board application built with **MERN Stack** featuring drag-and-drop functionality, JWT authentication, and real-time notifications.

## 🎯 Key Features

- **JWT Authentication** with secure login/register
- **Drag & Drop** tasks between columns using React DnD
- **Real-time Toast Notifications** for user feedback
- **CRUD Operations** for task management
- **Demo Mode** with sample data
- **Responsive Design** with modern UI

## 🛠️ Tech Stack

**Frontend:** React.js, React DnD, Material-UI, Axios, CSS3  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt

## 📸 Application Screenshots

### Login & Authentication
![Login Screen](./images/login-screen.png)

### Main Kanban Board Interface
![Kanban Board](./images/kanban-board.png)

### Task Creation Dialog
![Task Creation](./images/task-creation.png)

### Drag & Drop Task Movement
![Task Editing](./images/task-editing.png)

### Real-time Toast Notifications
![Toast Notifications](./images/toast-notifications.png)

### Demo Data Loading Feature
![Demo Data](./images/demo-data.png)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation & Setup
```bash
# Clone repository
git clone https://github.com/Yokesh-19/Task-Management-Board.git
cd Task-Management-Board

# Install dependencies
npm run install-all

# Setup environment (backend/.env)
MONGODB_URI=mongodb://localhost:27017/kanban-board
JWT_SECRET=your-secret-key
PORT=5001

# Start application
npm run dev
```

### Access Application
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5001

## 🎮 Demo Usage

1. Open http://localhost:3000
2. Click **"Load Demo Data"**
3. Login with: `demo` / `demo123`
4. Start using the Kanban board!

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/register` | User registration |
| POST | `/api/login` | User login |
| GET | `/api/tasks` | Get user tasks |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| POST | `/api/seed` | Load demo data |

## 📁 Project Structure

```
├── backend/
│   ├── server.js          # Express server & API routes
│   └── .env              # Environment variables
├── frontend/client/
│   ├── src/
│   │   ├── components/   # React components
│   │   └── styles/       # CSS files
│   └── package.json      # Frontend dependencies
└── package.json          # Root scripts
```

## 🔧 Available Scripts

```bash
npm run install-all    # Install all dependencies
npm run dev           # Start both frontend & backend
npm run server        # Backend only
npm run client        # Frontend only
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation & sanitization
- User-specific data isolation
- CORS protection

---

**Built with ❤️ using MERN Stack**