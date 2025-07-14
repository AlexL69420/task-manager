// Импорт компонентов и зависимостей
import { TaskList } from "../components/TaskList";
import { Button } from "flowbite-react";

/**
 * Главный компонент приложения - Task Manager
 * Содержит:
 * - Заголовок приложения
 * - Кнопку создания новой задачи
 * - Список задач с фильтрами
 */
export default function App() {
  /**
   * Обработчик клика по кнопке добавления задачи
   * Перенаправляет на страницу создания новой задачи
   */
  const handleAddNewTask = () => {
    console.log("new task added"); // Тут будет переход на страницу создания задачи
  };

  return (
    // Основной контейнер приложения с адаптивными отступами
    <main className="container mx-auto px-4 py-8">
      {/* Шапка приложения с заголовком и кнопкой */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-0">
        {/* Заголовок приложения с поддержкой темной темы */}
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
          Task Manager
        </h1>

        {/* Кнопка добавления новой задачи */}
        <Button
          onClick={handleAddNewTask}
          aria-label="Add new task"
          className="w-full hover:cursor-pointer sm:w-auto"
          // Цвет кнопки из палитры Flowbite
          color="success"
        >
          {/* Иконка плюса для лучшей визуализации */}
          <svg
            className="mr-2 h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add New Task
        </Button>
      </div>

      {/* Компонент списка задач */}
      <TaskList />
    </main>
  );
}
