/**
 * Компонент формы создания/редактирования задачи
 * @component
 * @description Форма для создания новой или редактирования существующей задачи.
 * Поддерживает все поля задачи: заголовок, описание, категорию, статус и приоритет.
 * Включает валидацию и обработку ошибок.
 * @returns {JSX.Element} Модальное окно с формой задачи
 */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextInput, Textarea, Select } from "flowbite-react";
import { Category, Status, Priority, Task } from "@taskTypes";
import { useTasks } from "@useTasks";

export default function TaskForm() {
  // Получение параметров маршрута и навигации
  const { id } = useParams();
  const navigate = useNavigate();

  // Получение методов и состояния из хука задач
  const {
    addTask,
    updateTask,
    useTaskById,
    status: apiStatus,
    error: apiError,
  } = useTasks();

  // Определение, является ли задача новой
  const isNewTask = id === "new";
  // Получение существующей задачи (если редактирование)
  const taskFromHook = useTaskById(id || ""); // Всегда вызываем хук
  const existingTask = !isNewTask ? taskFromHook : null;
  console.log(taskFromHook);

  // Состояние формы задачи
  const [task, setTask] = useState<Omit<Task, "id">>({
    title: existingTask?.title || "",
    description: existingTask?.description || "",
    category: existingTask?.category || Category.Bug,
    status: existingTask?.status || Status.Todo,
    priority: existingTask?.priority || Priority.Medium,
    createdAt: existingTask?.createdAt || new Date().toISOString(),
    updatedAt: existingTask?.updatedAt || new Date().toISOString(),
  });

  // Локальное состояние ошибок
  const [localError, setLocalError] = useState<string | null>(null);
  const isSubmitting = apiStatus === "loading";

  // Обработка ошибок из Redux
  useEffect(() => {
    if (apiError) {
      setLocalError(apiError);
    }
  }, [apiError]);

  /**
   * Обработчик отправки формы
   * @param {React.FormEvent} e - Событие формы
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация формы
    if (!task.title?.trim()) {
      setLocalError("Task title is required");
      return;
    }

    if (!task.category || !task.status || !task.priority) {
      setLocalError("Please fill all required fields");
      return;
    }

    try {
      // Сохранение задачи (создание или обновление)
      if (isNewTask) {
        const newTaskData: Omit<Task, "id" | "createdAt" | "updatedAt"> = {
          title: task.title,
          description: task.description || "",
          category: task.category as Category,
          status: task.status as Status,
          priority: task.priority as Priority,
        };
        await addTask(newTaskData);
      } else if (id) {
        const updatedFields: Partial<Task> = {
          title: task.title,
          description: task.description,
          category: task.category,
          status: task.status,
          priority: task.priority,
        };
        await updateTask(id, updatedFields);
      }
      navigate("/");
    } catch (err) {
      console.error("Error saving task:", err);
      setLocalError("Failed to save task. Please try again.");
    }
  };

  /**
   * Обработчик изменения полей формы
   * @param {keyof Task} field - Имя поля
   * @param {string} value - Новое значение
   */
  const handleChange = (field: keyof Task, value: string) => {
    setTask((prev) => ({ ...prev, [field]: value }));
    if (localError) setLocalError(null);
  };

  // Определяем, показывать ли дату создания
  const showCreatedAt = !isNewTask && task.createdAt;

  return (
    // Модальное окно формы
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-transparent p-4 backdrop-blur-sm">
      {/* Основной контейнер формы */}
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl dark:bg-gray-800">
        <div className="p-6">
          {/* Заголовок формы и кнопка закрытия */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {isNewTask ? "Create New Task" : "Edit Task"}
            </h1>
            <button
              onClick={() => navigate("/")}
              className="text-gray-400 hover:cursor-pointer hover:text-gray-500 dark:hover:text-gray-300"
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Блок отображения ошибок */}
          {(localError || apiError) && (
            <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700 dark:bg-red-200">
              {localError || apiError}
            </div>
          )}

          {/* Форма задачи */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Поле заголовка */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Title*
              </label>
              <TextInput
                id="title"
                value={task.title || ""}
                onChange={(e) => handleChange("title", e.target.value)}
                required
                className="w-full"
              />
            </div>

            {/* Поле описания */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <Textarea
                id="description"
                value={task.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={4}
                className="w-full"
              />
            </div>

            {/* Группа выпадающих списков (категория, статус, приоритет) */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {["category", "status", "priority"].map((field) => (
                <div key={field}>
                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {field.charAt(0).toUpperCase() + field.slice(1)}*
                  </label>
                  <Select
                    id={field}
                    value={task[field as keyof typeof task] || ""}
                    onChange={(e) =>
                      handleChange(field as keyof Task, e.target.value)
                    }
                    required
                    className="w-full"
                  >
                    {Object.values(
                      field === "category"
                        ? Category
                        : field === "status"
                          ? Status
                          : Priority,
                    ).map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </Select>
                </div>
              ))}
            </div>

            {/* Блок даты создания (только для существующих задач) */}
            {showCreatedAt && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Created At
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(task.createdAt!).toLocaleString()}
                </p>
              </div>
            )}

            {/* Кнопки формы */}
            <div className="flex justify-end gap-3 pt-4">
              {/* Кнопка отмены */}
              <Button
                type="button"
                color="light"
                onClick={() => navigate("/")}
                disabled={isSubmitting}
                className="px-6 py-2 hover:cursor-pointer"
              >
                Cancel
              </Button>
              {/* Кнопка сохранения */}
              <Button
                type="submit"
                color="blue"
                disabled={isSubmitting}
                className="px-6 py-2 hover:cursor-pointer dark:bg-blue-950 dark:hover:bg-blue-900"
              >
                {isSubmitting ? (
                  // Индикатор загрузки
                  <>
                    <svg
                      className="mr-2 -ml-1 h-4 w-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Saving...
                  </>
                ) : isNewTask ? (
                  "Create Task"
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
