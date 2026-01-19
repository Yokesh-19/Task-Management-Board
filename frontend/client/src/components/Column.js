import React from 'react';
import { useDrop } from 'react-dnd';
import TaskCard from './TaskCard';
import '../styles/Column.css';

function Column({ column, tasks, onTaskUpdate, onTaskDelete, onTaskEdit }) {
  const [{ isOver }, drop] = useDrop({
    accept: 'task',
    drop: (item) => {
      if (item.status !== column.id) {
        onTaskUpdate(item.id, column.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  return (
    <div ref={drop} className={`column ${isOver ? 'drag-over' : ''}`}>
      <div className="column-header">
        <h3 className="column-title">{column.title}</h3>
        <span className="task-count">{tasks.length}</span>
      </div>
      <div className="column-content">
        <div className="drop-zone">
          {tasks.map(task => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={onTaskEdit}
              onDelete={onTaskDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Column;