import React from "react";
import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

const Column = ({ status, title, tasks, moveTask, deleteTask }) => {
  const [, drop] = useDrop({
    accept: "TASK",
    drop: (item) => {
      moveTask(item.id, status);
    },
  });

  return (
    <div
      ref={drop}
      style={{
        background: "#f5f5f5",
        padding: 20,
        width: 300,
        minHeight: 500,
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          padding: "10px 0",
          background: "#eee",
          borderRadius: "6px",
          fontWeight: "bold",
        }}
      >
        {title}
      </h2>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} deleteTask={deleteTask} />
      ))}
    </div>
  );
};

export default Column;
