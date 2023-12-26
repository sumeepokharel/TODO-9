import React, { useState } from "react";
import styles from "../App.module.css";

interface Task {
  id: number;
  title: string;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState<string>("");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
      const newTaskObject: Task = {
        id: tasks.length + 1,
        title: newTask,
      };
      setTasks([...tasks, newTaskObject]);
      setNewTask("");
    }
  };

  const handleEditTask = (taskId: number) => {
    setEditingTaskId(taskId);
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditedTask(taskToEdit ? taskToEdit.title : "");
  };

  const handleSaveEdit = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: editedTask } : task
    );
    setTasks(updatedTasks);
    setEditingTaskId(null);
    setEditedTask("");
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
      setEditingTaskId(null);
      return updatedTasks;
    });
  };

  return (
    <div className={styles["todo-list"]}>
      <h1>Todo List</h1>
      <form onSubmit={handleAddTask} className={styles.addTask}>
        <input
          type="text"
          placeholder="Enter new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className={styles.addButton}>
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
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                />
                <button
                  onClick={() => handleSaveEdit(task.id)}
                  className={styles.saveButton}
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                {task.title}
                <button
                  onClick={() => handleEditTask(task.id)}
                  className={styles.editButton}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
