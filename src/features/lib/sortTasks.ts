import { Task, Priority, Status } from "@taskTypes";

type SortCriteria = "createdAt" | "priority" | "status" | "none";
type SortOrder = "asc" | "desc";

export const sortTasks = (
  tasks: Task[],
  criteria: SortCriteria,
  order: SortOrder,
): Task[] => {
  if (criteria === "none") return [...tasks];

  return [...tasks].sort((a, b) => {
    // Сортировка по дате создания
    if (criteria === "createdAt") {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return order === "asc" ? dateA - dateB : dateB - dateA;
    }

    // Сортировка по приоритету
    if (criteria === "priority") {
      const priorityOrder = {
        [Priority.High]: 3,
        [Priority.Medium]: 2,
        [Priority.Low]: 1,
      };
      return order === "asc"
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority];
    }

    // Сортировка по статусу
    if (criteria === "status") {
      const statusOrder = {
        [Status.Todo]: 1,
        [Status.InProgress]: 2,
        [Status.Done]: 3,
      };
      return order === "asc"
        ? statusOrder[a.status] - statusOrder[b.status]
        : statusOrder[b.status] - statusOrder[a.status];
    }

    return 0;
  });
};
