/**
 * Компонент для управления сортировкой задач
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {SortCriteria} props.criteria - Текущий критерий сортировки
 * @param {SortOrder} props.order - Текущее направление сортировки (asc/desc)
 * @param {Function} props.onSortChange - Обработчик изменения сортировки
 * @param {string} [props.className=""] - Дополнительные CSS-классы
 * @returns {JSX.Element} Компонент управления сортировкой
 * @example
 * <TaskSorting
 *   criteria="priority"
 *   order="asc"
 *   onSortChange={(criteria) => handleSortChange(criteria)}
 * />
 */
import { Select, Button } from "flowbite-react";
import { SortCriteria, SortOrder } from "@taskTypes";

interface TaskSortingProps {
  criteria: SortCriteria;
  order: SortOrder;
  onSortChange: (criteria: SortCriteria) => void;
  className?: string;
}

export const TaskSorting = ({
  criteria,
  order,
  onSortChange,
  className = "",
}: TaskSortingProps) => (
  // Основной контейнер компонента
  <div className={`flex flex-row gap-2 ${className}`}>
    {/* Выпадающий список для выбора критерия сортировки */}
    <div className="flex flex-col">
      <label
        htmlFor="select-sorting"
        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        Sorting
      </label>
      <Select
        id="select-sorting"
        value={criteria}
        onChange={(e) => onSortChange(e.target.value as SortCriteria)}
        className="min-w-[120px]"
      >
        <option value="none">No sorting</option>
        <option value="createdAt">By Date</option>
        <option value="priority">By Priority</option>
        <option value="status">By Status</option>
      </Select>
    </div>

    {/* Кнопка переключения направления сортировки (отображается только при активной сортировке) */}
    <div className="flex items-center">
      {criteria !== "none" && (
        <Button
          color="light"
          onClick={() => onSortChange(criteria)}
          className="px-3 hover:cursor-pointer"
          aria-label={`Sort ${order === "asc" ? "descending" : "ascending"}`}
        >
          {order === "asc" ? "↑" : "↓"}
        </Button>
      )}
    </div>
  </div>
);
