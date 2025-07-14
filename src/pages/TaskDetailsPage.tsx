import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../contexts/TaskContext";
import { useEffect, useState } from "react";
import { Task } from "../types";
import TaskDetails from "../components/TaskDetails";

export default function TaskDetailsPage() {
  const { id } = useParams();
  const { getTaskById, updateTask, addTask } = useTasks();
  const navigate = useNavigate();

  const [task, setTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    category: "Bug",
    status: "To Do",
    priority: "Medium",
  });

  const isNewTask = id === "new";

  useEffect(() => {
    if (!isNewTask && id) {
      const existingTask = getTaskById(id);
      if (existingTask) {
        setTask(existingTask);
      }
    }
  }, [id, isNewTask, getTaskById]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNewTask) {
      const newTask = {
        ...task,
        id: Date.now().toString(),
      } as Task;
      addTask(newTask);
    } else if (id) {
      updateTask(id, task);
    }
    navigate("/");
  };

  return (
    <TaskDetails
      task={task}
      isNewTask={isNewTask}
      onTaskChange={setTask}
      onSubmit={handleSubmit}
      onCancel={() => navigate("/")}
    />
  );
}
