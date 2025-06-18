import React from "react";
import { useDrag } from "react-dnd";

const TaskCard = ({ task, deleteTask }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "TASK",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        background: "white",
        padding: 10,
        margin: "10px 0",
        borderRadius: 6,
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        opacity: isDragging ? 0.5 : 1,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>{task.title}</span>
      <button
        onClick={() => deleteTask(task._id)}
        style={{
          color: "red",
          border: "none",
          background: "transparent",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        🗑️
      </button>
    </div>
  );
};

export default TaskCard;
