import React from 'react';
import { useDrag } from 'react-dnd';
import '../styles/TaskCard.css';

function TaskCard({ task, onEdit, onDelete }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: { id: task._id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  return (
    <div
      ref={drag}
      className={`task-card ${isDragging ? 'dragging' : ''}`}
    >
      <div className="task-header">
        <h4 className="task-title">{task.title}</h4>
        <div className="task-actions">
          <button 
            className="action-button edit-button"
            onClick={() => onEdit(task)}
          >
            ✏️
          </button>
          <button 
            className="action-button delete-button"
            onClick={() => onDelete(task._id)}
          >
            🗑️
          </button>
        </div>
      </div>
      {task.description && (
        <p className="task-description">{task.description}</p>
      )}
      <div className="task-meta">
        <span className={`task-status status-${task.status}`}>
          {task.status.replace('inprogress', 'in progress')}
        </span>
      </div>
    </div>
  );
}

export default TaskCard;