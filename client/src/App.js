import React, { useEffect, useState } from "react";
import axios from "axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./components/Column";

const columns = ["todo", "inprogress", "done"];
const columnTitles = {
  todo: "TODO",
  inprogress: "IN-PROGRESS",
  done: "DONE",
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks")
      .then(res => setTasks(res.data))
      .catch(console.error);
  }, []);

  const addTask = () => {
    if (newTask.trim()) {
      axios.post("http://localhost:5000/api/tasks", { title: newTask, status: "todo" })
        .then((res) => {
          setTasks([...tasks, res.data]);
          setNewTask("");
        });
    }
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter(t => t._id !== id)));
  };

  const moveTask = (id, newStatus) => {
    const task = tasks.find(t => t._id === id);
    if (task && task.status !== newStatus) {
      axios.put(`http://localhost:5000/api/tasks/${id}`, { ...task, status: newStatus })
        .then(res => {
          const updated = tasks.map(t => (t._id === id ? res.data : t));
          setTasks(updated);
        });
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: 20, textAlign: "center" }}>
        <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>Kanban Task Management</h1>
        <div style={{ margin: "10px 0" }}>
          <input
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New task"
            style={{
              padding: "6px 10px",
              fontSize: "16px",
              marginRight: "10px",
              borderRadius: 4,
              border: "1px solid #ccc",
            }}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 30, marginTop: 20 }}>
          {columns.map((col) => (
            <Column
              key={col}
              status={col}
              title={columnTitles[col]}
              tasks={tasks.filter(t => t.status === col)}
              moveTask={moveTask}
              deleteTask={deleteTask}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
