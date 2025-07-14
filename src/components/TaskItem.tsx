import { Task, Priority, Status } from "../types";
import { useNavigate } from "react-router-dom";
import { Card, Badge, Button } from "flowbite-react";

interface TaskItemProps {
  task: Task;
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const navigate = useNavigate();

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "High":
        return "failure";
      case "Medium":
        return "warning";
      case "Low":
        return "success";
      default:
        return "info";
    }
  };

  const getStatusColor = (status: Status) => {
    switch (status) {
      case "Done":
        return "success";
      case "In Progress":
        return "warning";
      case "To Do":
        return "info";
      default:
        return "gray";
    }
  };

  const truncateDescription = (description: string, maxLength = 100) => {
    return description.length > maxLength
      ? `${description.substring(0, maxLength)}...`
      : description;
  };

  return (
    <Card className="flex h-full flex-col" aria-label="task card">
      <div className="flex-grow">
        <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {task.title}
        </h3>
        {task.description && (
          <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
            {truncateDescription(task.description)}
          </p>
        )}
        <div className="mb-4 flex flex-wrap gap-2">
          <Badge
            color="info"
            className="whitespace-nowrap"
            aria-label="task category"
          >
            {task.category}
          </Badge>
          <Badge
            color={getStatusColor(task.status)}
            className="whitespace-nowrap"
            aria-label="task status"
          >
            {task.status}
          </Badge>
          <Badge
            color={getPriorityColor(task.priority)}
            className="whitespace-nowrap"
            aria-label="task priority"
          >
            {task.priority}
          </Badge>
        </div>
      </div>
      <Button
        onClick={() => navigate(`/task/${task.id}`)}
        className="mt-auto hover:cursor-pointer"
        aria-label="edit"
      >
        Edit
      </Button>
    </Card>
  );
};
