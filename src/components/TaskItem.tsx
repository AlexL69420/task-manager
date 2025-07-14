// Импорт типов и зависимостей
import { Task, Priority, Status } from "../types";
import { useNavigate } from "react-router-dom";
import { Card, Badge, Button } from "flowbite-react";

// Интерфейс пропсов компонента
interface TaskItemProps {
  task: Task; // Объект задачи для отображения
}

/**
 * Компонент карточки задачи (TaskItem)
 * Отображает краткую информацию о задаче в виде карточки
 * Содержит кнопку для перехода к редактированию задачи
 */
export const TaskItem = ({ task }: TaskItemProps) => {
  const navigate = useNavigate(); // Хук для навигации

  /**
   * Определяет цвет баджа в зависимости от приоритета задачи
   * @param priority Приоритет задачи (Low/Medium/High)
   * @returns Цвет баджа из палитры Flowbite
   */
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "High":
        return "failure"; // Красный для высокого приоритета
      case "Medium":
        return "warning"; // Желтый для среднего
      case "Low":
        return "success"; // Зеленый для низкого
      default:
        return "info"; // Синий по умолчанию
    }
  };

  /**
   * Определяет цвет баджа в зависимости от статуса задачи
   * @param status Статус задачи (To Do/In Progress/Done)
   * @returns Цвет баджа из палитры Flowbite
   */
  const getStatusColor = (status: Status) => {
    switch (status) {
      case "Done":
        return "success"; // Зеленый для выполненных
      case "In Progress":
        return "warning"; // Желтый для задач в работе
      case "To Do":
        return "info"; // Синий для задач в очереди
      default:
        return "gray"; // Серый по умолчанию
    }
  };

  /**
   * Обрезает длинное описание задачи и добавляет многоточие
   * @param description Текст описания
   * @param maxLength Максимальная длина текста (по умолчанию 100 символов)
   * @returns Обрезанный текст с ... или оригинальный текст, если он короче maxLength
   */
  const truncateDescription = (description: string, maxLength = 100) => {
    return description.length > maxLength
      ? `${description.substring(0, maxLength)}...`
      : description;
  };

  return (
    // Карточка задачи с ARIA-атрибутом для доступности
    <Card className="flex h-full flex-col" aria-label="task card">
      {/* Основное содержимое карточки с flex-grow для правильного растяжения */}
      <div className="flex-grow">
        {/* Заголовок задачи */}
        <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {task.title}
        </h3>

        {/* Описание задачи (отображается только если есть) */}
        {task.description && (
          <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
            {truncateDescription(task.description)}
          </p>
        )}

        {/* Блок с метками (баджами) задачи */}
        <div className="mb-4 flex flex-wrap gap-2">
          {/* Бэдж категории */}
          <Badge
            color="info"
            className="whitespace-nowrap"
            aria-label="task category"
          >
            {task.category}
          </Badge>

          {/* Бэдж статуса с динамическим цветом */}
          <Badge
            color={getStatusColor(task.status)}
            className="whitespace-nowrap"
            aria-label="task status"
          >
            {task.status}
          </Badge>

          {/* Бэдж приоритета с динамическим цветом */}
          <Badge
            color={getPriorityColor(task.priority)}
            className="whitespace-nowrap"
            aria-label="task priority"
          >
            {task.priority}
          </Badge>
        </div>
      </div>

      {/* Кнопка редактирования (располагается внизу благодаря mt-auto) */}
      <Button
        onClick={() => navigate(`/task/${task.id}`)} // Переход на страницу редактирования
        className="mt-auto hover:cursor-pointer"
        aria-label="edit task"
      >
        Edit
      </Button>
    </Card>
  );
};
