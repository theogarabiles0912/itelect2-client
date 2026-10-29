function TaskList({ tasks }) {
  function formatDueDate(dueDate) {
    if (!dueDate) {
      return "No due date";
    }

    return new Date(dueDate).toLocaleDateString();
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <span>{task.title}</span>
          <span>{formatDueDate(task.dueDate)}</span>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
