import { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const trimmedTitle = title.trim();

    if (trimmedTitle === "") {
      return;
    }

    try {
      await onAdd({ title: trimmedTitle, dueDate });
      setTitle("");
      setDueDate("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a task title"
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <button type="submit">Add task</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default TaskForm;
