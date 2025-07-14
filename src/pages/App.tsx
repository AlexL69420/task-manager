import { TaskList } from "../components/TaskList";
import { Button } from "flowbite-react";

export default function App() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Task Manager
        </h1>
        <Button
          onClick={() => console.log("new task added")}
          aria-label="add new task"
          className="hover:cursor-pointer"
        >
          Add New Task
        </Button>
      </div>
      <TaskList />
    </main>
  );
}
