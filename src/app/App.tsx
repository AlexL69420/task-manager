// Импорт компонентов и зависимостей
import { TaskList } from "@TaskList";
import { Button, DarkThemeToggle } from "flowbite-react";
import { useNavigate } from "react-router-dom";

/**
 * Главный компонент приложения
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
  const navigate = useNavigate();
  const handleAddNewTask = () => {
    navigate("/task/new");
  };

  return (
    // Основной контейнер приложения с адаптивными отступами
    <main className="container mx-auto min-h-screen min-w-screen px-4 py-8 dark:bg-slate-700">
      {/* Шапка приложения с заголовком и кнопкой */}
      <div className="mb-6 flex flex-col items-start justify-around gap-4 sm:flex-row sm:items-center sm:gap-0">
        {/* Заголовок приложения с поддержкой темной темы */}
        <div className="flex flex-row items-center gap-3">
          <DarkThemeToggle className="rounded-full border-2 hover:cursor-pointer dark:bg-slate-800" />
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
            Task Manager
          </h1>
        </div>

        {/* Кнопка добавления новой задачи */}
        <Button
          onClick={handleAddNewTask}
          aria-label="Add new task"
          className="w-full hover:cursor-pointer sm:w-auto dark:text-white"
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
