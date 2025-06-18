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
        background: "#f0f0f0",
        padding: 10,
        width: 250,
        minHeight: 500,
        borderRadius: 8,
      }}
    >
      <h3>{title}</h3>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} deleteTask={deleteTask} />
      ))}
    </div>
  );
};

export default Column;
