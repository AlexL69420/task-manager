import { useTasks } from "../contexts/TaskContext";
import { TaskItem } from "./TaskItem";
import { useState } from "react";
import { Category, Status, Priority } from "../types";
import { Select, Button } from "flowbite-react";

export const TaskList = () => {
  const { tasks } = useTasks();
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    priority: "",
  });

  const filteredTasks = tasks.filter((task) => {
    return (
      (filters.category === "" || task.category === filters.category) &&
      (filters.status === "" || task.status === filters.status) &&
      (filters.priority === "" || task.priority === filters.priority)
    );
  });

  const resetFilters = () => {
    setFilters({
      category: "",
      status: "",
      priority: "",
    });
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="mb-4 text-2xl font-bold">Task Manager</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <div className="grid grid-cols-1 gap-4 md:col-span-3 md:grid-cols-3">
            <div>
              <label htmlFor="category-filter" />
              Category
              <label />
              <Select
                id="category-filter"
                value={filters.category}
                aria-label="filter by category"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    category: e.target.value as Category,
                  })
                }
              >
                <option value="">All</option>
                <option value="Bug">Bug</option>
                <option value="Feature">Feature</option>
                <option value="Documentation">Documentation</option>
                <option value="Refactor">Refactor</option>
                <option value="Test">Test</option>
              </Select>
            </div>

            <div>
              <label htmlFor="status-filter" />
              Status
              <label />
              <Select
                id="status-filter"
                value={filters.status}
                aria-label="filter by status"
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value as Status })
                }
              >
                <option value="">All</option>
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </Select>
            </div>

            <div>
              <label htmlFor="priority-filter" />
              Priority
              <label />
              <Select
                id="priority-filter"
                value={filters.priority}
                aria-label="filter by priority"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    priority: e.target.value as Priority,
                  })
                }
              >
                <option value="">All</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Select>
            </div>
          </div>

          <div className="flex items-end">
            <Button
              color="gray"
              onClick={resetFilters}
              aria-label="reset filters"
              className="w-full hover:cursor-pointer"
              disabled={
                !filters.category && !filters.status && !filters.priority
              }
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No tasks found.{" "}
            {tasks.length > 0
              ? "Try adjusting your filters."
              : "Create your first task!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </main>
  );
};
