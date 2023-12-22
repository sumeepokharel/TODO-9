import React, { useState } from "react";
import styles from "../App.module.css";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks((prevTasks) => [
        ...prevTasks,
        { id: Date.now(), title: newTask, completed: false },
      ]);
      setNewTask("");
    }
  };

  const editTask = (taskId: number, newTitle: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, title: newTitle } : task
      )
    );
    setEditingTaskId(null);
  };

  const deleteTask = (taskId: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );
    if (isConfirmed) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    }
  };

  return (
    <div className={styles["todo-list"]}>
      <h1>Todo List</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Enter new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="button" onClick={addTask}>
          Add Task
        </button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={styles["task-item"]}>
            {editingTaskId === task.id ? (
              <div>
                <input
                  className={styles["edit-input"]}
                  type="text"
                  value={task.title}
                  onChange={(e) => editTask(task.id, e.target.value)}
                />
              </div>
            ) : (
              <div>
                {task.title}
                <button onClick={() => setEditingTaskId(task.id)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
