/**
 * Компонент для отображения состояния пустого списка задач
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {boolean} props.hasTasks - Флаг, указывающий есть ли задачи в системе
 * @param {Function} [props.onCreateNew] - Callback-функция для создания новой задачи
 * @returns {JSX.Element} Компонент пустого состояния
 * @example
 * <TaskEmptyState
 *   hasTasks={false}
 *   onCreateNew={() => setShowCreateModal(true)}
 * />
 */
import { Button } from "flowbite-react";

interface TaskEmptyStateProps {
  hasTasks: boolean;
  onCreateNew?: () => void;
}

export const TaskEmptyState = ({
  hasTasks,
  onCreateNew,
}: TaskEmptyStateProps) => (
  // Основной контейнер компонента
  <div className="py-8 text-center">
    {/* Текст в зависимости от наличия задач в системе */}
    <p className="mb-4 text-gray-500 dark:text-gray-400">
      {hasTasks ? "No tasks match your filters." : "No tasks found."}
    </p>

    {/* Кнопка создания первой задачи (показывается только если нет задач и передан onCreateNew) */}
    {!hasTasks && onCreateNew && (
      <Button color="blue" onClick={onCreateNew} className="mx-auto">
        Create Your First Task
      </Button>
    )}
  </div>
);
