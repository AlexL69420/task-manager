/**
 * Компонент фильтров задач с выпадающими списками
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {Object} props.filters - Текущие значения фильтров
 * @param {string} props.filters.category - Выбранная категория
 * @param {string} props.filters.status - Выбранный статус
 * @param {string} props.filters.priority - Выбранный приоритет
 * @param {Function} props.onFilterChange - Обработчик изменения фильтра
 * @param {string} [props.className=""] - Дополнительные CSS-классы
 * @returns {JSX.Element} Компонент фильтров задач
 * @example
 * <TaskFilters
 *   filters={{ category: 'work', status: 'in_progress', priority: 'high' }}
 *   onFilterChange={(field, value) => setFilters(...)}
 *   className="mb-4"
 * />
 */
import { Select } from "flowbite-react";
import { Category, Status, Priority } from "@taskTypes";

interface TaskFiltersProps {
  filters: {
    category: string;
    status: string;
    priority: string;
  };
  onFilterChange: (field: string, value: string) => void;
  className?: string;
}

export const TaskFilters = ({
  filters,
  onFilterChange,
  className = "",
}: TaskFiltersProps) => (
  // Основной контейнер с адаптивной сеткой
  <main className={`grid grid-cols-1 gap-4 md:grid-cols-3 ${className}`}>
    {/* Фильтр по категориям */}
    <div>
      <label
        htmlFor="category-filter"
        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Category
      </label>
      <Select
        id="category-filter"
        value={filters.category}
        onChange={(e) => onFilterChange("category", e.target.value)}
        className="w-full"
      >
        <option value="">All</option>
        {Object.values(Category).map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </Select>
    </div>

    {/* Фильтр по статусам */}
    <div>
      <label
        htmlFor="status-filter"
        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Status
      </label>
      <Select
        id="status-filter"
        value={filters.status}
        onChange={(e) => onFilterChange("status", e.target.value)}
        className="w-full"
      >
        <option value="">All</option>
        {Object.values(Status).map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </Select>
    </div>

    {/* Фильтр по приоритетам */}
    <div>
      <label
        htmlFor="priority-filter"
        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Priority
      </label>
      <Select
        id="priority-filter"
        value={filters.priority}
        onChange={(e) => onFilterChange("priority", e.target.value)}
        className="w-full"
      >
        <option value="">All</option>
        {Object.values(Priority).map((priority) => (
          <option key={priority} value={priority}>
            {priority}
          </option>
        ))}
      </Select>
    </div>
  </main>
);
