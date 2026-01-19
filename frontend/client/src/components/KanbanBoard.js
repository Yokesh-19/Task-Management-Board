import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from 'react-toastify';
import axios from 'axios';
import Column from './Column';
import TaskDialog from './TaskDialog';
import '../styles/KanbanBoard.css';

function KanbanBoard({ user, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'inprogress', title: 'In Progress' },
    { id: 'done', title: 'Done' }
  ];

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
      toast.success('Tasks loaded successfully');
    } catch (error) {
      toast.error('Failed to load tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskUpdate = async (taskId, newStatus) => {
    const originalTasks = [...tasks];
    
    // Optimistic update
    setTasks(tasks.map(task => 
      task._id === taskId ? { ...task, status: newStatus } : task
    ));

    try {
      await axios.put(`/api/tasks/${taskId}`, { status: newStatus });
      toast.success('Task moved successfully');
    } catch (error) {
      // Revert on error
      setTasks(originalTasks);
      toast.error('Failed to move task');
      console.error('Error updating task:', error);
    }
  };

  const handleTaskDelete = async (taskId) => {
    const taskToDelete = tasks.find(task => task._id === taskId);
    const taskTitle = taskToDelete?.title || 'this task';

    toast.warning(
      <div>
        <div style={{ marginBottom: '10px' }}>Are you sure you want to delete "{taskTitle}"?</div>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <button 
            onClick={() => {
              toast.dismiss();
              confirmDelete(taskId);
            }}
            style={{
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Delete
          </button>
          <button 
            onClick={() => toast.dismiss()}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Cancel
          </button>
        </div>
      </div>,
      {
        position: 'top-center',
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        closeButton: false
      }
    );
  };

  const confirmDelete = async (taskId) => {
    const originalTasks = [...tasks];
    
    // Optimistic update
    setTasks(tasks.filter(task => task._id !== taskId));

    try {
      await axios.delete(`/api/tasks/${taskId}`);
      toast.success('Task deleted successfully');
    } catch (error) {
      // Revert on error
      setTasks(originalTasks);
      toast.error('Failed to delete task');
      console.error('Error deleting task:', error);
    }
  };

  const handleTaskEdit = (task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        const response = await axios.put(`/api/tasks/${editingTask._id}`, taskData);
        setTasks(tasks.map(task => 
          task._id === editingTask._id ? response.data : task
        ));
        toast.success('Task updated successfully');
      } else {
        const response = await axios.post('/api/tasks', taskData);
        setTasks([...tasks, response.data]);
        toast.success('Task created successfully');
      }
      setDialogOpen(false);
      setEditingTask(null);
    } catch (error) {
      toast.error(editingTask ? 'Failed to update task' : 'Failed to create task');
      console.error('Error saving task:', error);
    }
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    localStorage.removeItem('token');
    onLogout();
  };

  if (loading) {
    return (
      <div className="kanban-container">
        <div className="loading-message">Loading your tasks...</div>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="kanban-container">
        <div className="kanban-header">
          <h1 className="kanban-title">Kanban Board</h1>
          <div className="header-buttons">
            <button className="add-task-button" onClick={() => setDialogOpen(true)}>
              Add Task
            </button>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <div className="kanban-board">
          {columns.map(column => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter(task => task.status === column.id)}
              onTaskUpdate={handleTaskUpdate}
              onTaskDelete={handleTaskDelete}
              onTaskEdit={handleTaskEdit}
            />
          ))}
        </div>
      </div>

      <TaskDialog
        open={dialogOpen}
        task={editingTask}
        onClose={() => {
          setDialogOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
      />
    </DndProvider>
  );
}

export default KanbanBoard;