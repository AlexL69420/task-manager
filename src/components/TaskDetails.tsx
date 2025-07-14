import { Task, Category, Status, Priority } from "../types";
import { Button, TextInput, Textarea, Select } from "flowbite-react";

interface TaskDetailsProps {
  task: Partial<Task>;
  isNewTask: boolean;
  onTaskChange: (updatedTask: Partial<Task>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function TaskDetails({
  task,
  isNewTask,
  onTaskChange,
  onSubmit,
  onCancel,
}: TaskDetailsProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
        {isNewTask ? "Create New Task" : "Edit Task"}
      </h1>

      <form className="flex max-w-md flex-col gap-4" onSubmit={onSubmit}>
        <div>
          <label htmlFor="title" />
          Title
          <label />
          <TextInput
            id="title"
            type="text"
            placeholder="Task title"
            aria-label="input task title"
            required
            value={task.title}
            onChange={(e) => onTaskChange({ ...task, title: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="description" />
          Description
          <label />
          <Textarea
            id="description"
            placeholder="Task description"
            aria-label="input task description"
            rows={4}
            value={task.description || ""}
            onChange={(e) =>
              onTaskChange({ ...task, description: e.target.value })
            }
          />
        </div>

        <div>
          <label htmlFor="category" />
          Category
          <label />
          <Select
            id="category"
            aria-label="select task category"
            required
            value={task.category}
            onChange={(e) =>
              onTaskChange({ ...task, category: e.target.value as Category })
            }
          >
            <option value="Bug">Bug</option>
            <option value="Feature">Feature</option>
            <option value="Documentation">Documentation</option>
            <option value="Refactor">Refactor</option>
            <option value="Test">Test</option>
          </Select>
        </div>

        <div>
          <label htmlFor="status" />
          Status
          <label />
          <Select
            id="status"
            aria-label="select task status"
            required
            value={task.status}
            onChange={(e) =>
              onTaskChange({ ...task, status: e.target.value as Status })
            }
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </Select>
        </div>

        <div>
          <label htmlFor="priority" />
          Priority
          <label />
          <Select
            id="priority"
            aria-label="select task priority"
            required
            value={task.priority}
            onChange={(e) =>
              onTaskChange({ ...task, priority: e.target.value as Priority })
            }
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            type="submit"
            aria-label="submit"
            className="hover:cursor-pointer"
          >
            Save
          </Button>
          <Button
            color="gray"
            onClick={onCancel}
            aria-label="cancel"
            className="hover:cursor-pointer"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
