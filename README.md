# 🚀 Kanban Task Management Board

A full-stack Kanban board application built with **MERN Stack** featuring drag-and-drop functionality, JWT authentication, and real-time notifications.

## 🛠️ Tech Stack

**Frontend:** React.js, React DnD, Material-UI, Axios, CSS3  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt

## 📸 Application Features

### 🔐 Authentication (Login & Register)
![Login Screen](./images/login-screen.png)

### 📋 Kanban Board Overview
![Kanban Board](./images/kanban-board.png)

### 🔄 Drag & Drop Task Management
![Drag and Drop](./images/task-creation.png)

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation
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

### Access
- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5001

## 🎯 Key Features

- **JWT Authentication** with secure login/register
- **Drag & Drop** tasks between columns using React DnD
- **Real-time Toast Notifications** for user feedback
- **CRUD Operations** for task management
- **Responsive Design** with modern UI

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

---

**Built with ❤️ using MERN Stack**