import { useState } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import "./App.css";

const STARTING_TASKS = [
  {
    id: 1,
    title: "Finish the Task Manager API",
    dueDate: "2026-10-20",
  },
  {
    id: 2,
    title: "Create the React client",
    dueDate: "2026-10-21",
  },
  {
    id: 3,
    title: "Review Session 13",
    dueDate: "2026-10-22",
  },
];

function App() {
  const [tasks, setTasks] = useState(STARTING_TASKS);

  function addTask(title) {
    const newTask = {
      id: Date.now(),
      title,
      dueDate: "No due date",
    };

    setTasks([...tasks, newTask]);
  }

  return (
    <main className="task-manager">
      <h1>Task Manager</h1>
      <p>{tasks.length} tasks</p>

      <TaskForm onAdd={addTask} />
      <TaskList tasks={tasks} />
    </main>
  );
}

export default App;
