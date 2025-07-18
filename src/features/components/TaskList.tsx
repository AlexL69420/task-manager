/**
 * Компонент списка задач с фильтрацией, сортировкой и управлением задачами
 * @component
 * @description Отображает список задач с возможностью фильтрации по категории/статусу/приоритету,
 * сортировки по различным критериям, а также удаления задач. Включает состояния загрузки и ошибки.
 * @returns {JSX.Element} Компонент списка задач
 */
import { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { useTasks } from "@useTasks";
import { ErrorState } from "@ErrorState";
import { TaskItem } from "@TaskItem";
import { TaskFilters } from "@TaskFilters";
import { TaskSorting } from "@TaskSorting";
import { TaskEmptyState } from "@TaskEmptyState";
import { sortTasks } from "@sortTasks";
import { SortCriteria, SortOrder } from "@taskTypes";

export const TaskList = () => {
  // Получение данных задач и состояния загрузки/ошибки
  const { tasks, status, error, loadTasks, deleteTask } = useTasks();

  // Состояние фильтров
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    priority: "",
  });

  // Состояние сортировки
  const [sortConfig, setSortConfig] = useState<{
    criteria: SortCriteria;
    order: SortOrder;
  }>({
    criteria: "none",
    order: "asc",
  });

  // Загрузка задач при монтировании компонента
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  /**
   * Обработчик изменения сортировки
   * @param {SortCriteria} criteria - Критерий сортировки
   */
  const handleSortChange = (criteria: SortCriteria) => {
    setSortConfig((prev) => ({
      criteria,
      order:
        prev.criteria === criteria
          ? prev.order === "asc"
            ? "desc"
            : "asc"
          : "asc",
    }));
  };

  // Фильтрация задач по выбранным критериям
  const filteredTasks = tasks.filter(
    (task) =>
      (!filters.category || task.category === filters.category) &&
      (!filters.status || task.status === filters.status) &&
      (!filters.priority || task.priority === filters.priority),
  );

  // Сортировка отфильтрованных задач
  const sortedTasks = sortTasks(
    filteredTasks,
    sortConfig.criteria,
    sortConfig.order,
  );

  // Состояние загрузки
  if (status === "loading")
    return <div className="py-8 text-center">Loading...</div>;

  // Состояние ошибки
  if (error) return <ErrorState error={error} onRetry={loadTasks} />;

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Панель управления (фильтры и сортировка) */}
      <div className="mb-6 flex flex-row flex-wrap gap-8 space-y-4">
        {/* Компонент фильтров */}
        <TaskFilters
          filters={filters}
          onFilterChange={(field, value) =>
            setFilters((prev) => ({ ...prev, [field]: value }))
          }
        />

        {/* Кнопка сброса фильтров */}
        <div className="flex items-end">
          <Button
            color="gray"
            className="hover:cursor-pointer"
            aria-label="reset filters button"
            onClick={() =>
              setFilters({ category: "", status: "", priority: "" })
            }
            disabled={!filters.category && !filters.status && !filters.priority}
          >
            Reset Filters
          </Button>
        </div>

        {/* Компонент сортировки */}
        <TaskSorting
          criteria={sortConfig.criteria}
          order={sortConfig.order}
          onSortChange={handleSortChange}
        />
      </div>

      {/* Отображение списка задач или состояния "пусто" */}
      {sortedTasks.length === 0 ? (
        <TaskEmptyState
          hasTasks={tasks.length > 0}
          onCreateNew={() => (window.location.href = "/task/new")}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={() => {
                if (window.confirm("Delete this task?")) {
                  deleteTask(task.id);
                }
              }}
            />
          ))}
        </div>
      )}
    </main>
  );
};
