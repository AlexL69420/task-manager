/**
 * Компонент карточки задачи с возможностью просмотра, редактирования и удаления
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {Task} props.task - Объект задачи для отображения
 * @param {Function} props.onDelete - Обработчик удаления задачи
 * @returns {JSX.Element} Карточка задачи с интерактивными элементами
 * @example
 * <TaskItem
 *   task={taskData}
 *   onDelete={(id) => handleDeleteTask(id)}
 * />
 */
import { Task, Priority, Status } from "@taskTypes";
import { useNavigate } from "react-router-dom";
import { Card, Badge, Button } from "flowbite-react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ task, onDelete }: TaskItemProps) => {
  const navigate = useNavigate();

  // Определение стилей для приоритета задачи
  const getPriorityStyles = (priority: Priority) => {
    const base = {
      light: {
        High: "failure",
        Medium: "warning",
        Low: "success",
      },
      dark: {
        High: "dark:bg-red-800 dark:text-red-100",
        Medium: "dark:bg-yellow-800 dark:text-yellow-100",
        Low: "dark:bg-green-800 dark:text-green-100",
      },
    };
    return {
      color: base.light[priority],
      className: base.dark[priority],
    };
  };

  // Определение стилей для статуса задачи
  const getStatusStyles = (status: Status) => {
    const base = {
      light: {
        Done: "success",
        "In Progress": "warning",
        "To Do": "info",
      },
      dark: {
        Done: "dark:bg-green-800 dark:text-green-100",
        "In Progress": "dark:bg-purple-800 dark:text-purple-100",
        "To Do": "dark:bg-blue-800 dark:text-blue-100",
      },
    };
    return {
      color: base.light[status],
      className: base.dark[status],
    };
  };

  // Стандартные стили для категории задачи
  const getCategoryStyles = () => ({
    color: "info",
    className: "dark:bg-indigo-800 dark:text-indigo-100",
  });

  // Форматирование даты для отображения
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Получение стилей для текущей задачи
  const priorityStyles = getPriorityStyles(task.priority);
  const statusStyles = getStatusStyles(task.status);
  const categoryStyles = getCategoryStyles();

  return (
    // Основная карточка задачи с обработчиком клика для перехода к редактированию
    <Card
      className="h-full cursor-pointer transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white"
      onClick={() => navigate(`/task/${task.id}`)}
    >
      {/* Основное содержимое карточки */}
      <div className="flex-grow">
        {/* Заголовок задачи */}
        <h3 className="text-xl font-bold dark:text-white">{task.title}</h3>

        {/* Описание задачи (если есть) */}
        {task.description && (
          <p className="my-2 line-clamp-2 text-gray-600 dark:text-gray-300">
            {task.description}
          </p>
        )}

        {/* Бейджи с категорией, статусом и приоритетом */}
        <div className="my-3 flex flex-wrap gap-2">
          <Badge
            color={categoryStyles.color}
            className={categoryStyles.className}
          >
            {task.category}
          </Badge>
          <Badge color={statusStyles.color} className={statusStyles.className}>
            {task.status}
          </Badge>
          <Badge
            color={priorityStyles.color}
            className={priorityStyles.className}
          >
            {task.priority}
          </Badge>
        </div>

        {/* Дата создания задачи */}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Created: {formatDate(task.createdAt || new Date().toISOString())}
        </p>
      </div>

      {/* Кнопки действий */}
      <div className="flex justify-end gap-2">
        {/* Кнопка удаления задачи */}
        <Button
          size="sm"
          color="failure"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task.id);
          }}
          aria-label="Delete task"
          className="hover:cursor-pointer dark:bg-red-800 dark:text-red-100 dark:hover:bg-red-700"
        >
          <FaTrash />
        </Button>

        {/* Кнопка редактирования задачи */}
        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/task/${task.id}`);
          }}
          aria-label="Edit task"
          className="hover:cursor-pointer dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700"
        >
          <FaEdit />
        </Button>
      </div>
    </Card>
  );
};
