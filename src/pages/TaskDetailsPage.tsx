import { useParams, useNavigate } from "react-router-dom";
import { useTasks } from "../contexts/TaskContext";
import { useEffect, useState } from "react";
import { Task } from "../types";
import TaskDetails from "../components/TaskDetails";

/**
 * Страница редактирования задачи
 * Обрабатывает:
 * - Загрузку существующей задачи
 * - Редактирование полей задачи
 * - Сохранение изменений
 * - Навигацию после действий
 */
export default function TaskDetailsPage() {
  // Получаем параметр id из URL
  const { id } = useParams<{ id: string }>();

  // Хук для навигации между страницами
  const navigate = useNavigate();

  // Получаем методы работы с задачами из контекста
  const { getTaskById, updateTask } = useTasks();

  // Состояние для хранения данных задачи
  const [task, setTask] = useState<Task | null>(null);

  // Эффект для загрузки данных задачи при монтировании
  useEffect(() => {
    if (id) {
      const existingTask = getTaskById(id);
      if (existingTask) {
        setTask(existingTask);
      } else {
        // Если задача не найдена, перенаправляем на 404
        navigate("/404", { replace: true });
      }
    }
  }, [id, getTaskById, navigate]);

  /**
   * Обработчик отправки формы
   * @param e - Событие формы
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!task) return;

    // Валидация обязательных полей
    if (!task.title.trim()) {
      alert("Пожалуйста, укажите название задачи");
      return;
    }

    try {
      // Обновление существующей задачи
      updateTask(task.id, task);

      // Возврат на главную страницу после успешного сохранения
      navigate("/", { state: { refresh: true } });
    } catch (error) {
      console.error("Ошибка при сохранении задачи:", error);
      alert("Произошла ошибка при сохранении задачи");
    }
  };

  if (!task) {
    return <div>Загрузка...</div>; // компонент загрузки
  }

  return (
    <TaskDetails
      task={task}
      onTaskChange={setTask}
      onSubmit={handleSubmit}
      onCancel={() => navigate("/")}
    />
  );
}
