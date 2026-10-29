import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm.jsx";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

async function fetchTasks() {
  if (!API_URL) {
    throw new Error("VITE_API_URL is not set.");
  }

  const res = await fetch(`${API_URL}/api/tasks`);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `GET /api/tasks answered ${res.status}`);
  }

  return data;
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [loggedInAs, setLoggedInAs] = useState("");

  useEffect(() => {
    async function loadTasks() {
      try {
        setTasks(await fetchTasks());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  async function logIn(email, password) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Could not log in.");
    }

    setToken(data.token);
    setLoggedInAs(email);
  }

  function logOut() {
    setToken("");
    setLoggedInAs("");
  }

  async function addTask(task) {
    const res = await fetch(`${API_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...task, completed: false }),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Could not add the task.");
    }

    setTasks(await fetchTasks());
  }

  return (
    <main className="task-manager">
      <h1>Task Manager</h1>

      {token ? (
        <p className="who">
          Logged in as {loggedInAs}
          <button type="button" onClick={logOut}>
            Log out
          </button>
        </p>
      ) : (
        <LoginForm onLogin={logIn} />
      )}

      {token && <TaskForm onAdd={addTask} />}
      {loading && <p>Loading tasks...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <p>{tasks.length} tasks</p>
          <TaskList tasks={tasks} />
        </>
      )}
    </main>
  );
}

export default App;
