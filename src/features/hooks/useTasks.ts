import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import {
  selectAllTasks,
  selectTaskById,
  selectTasksStatus,
  selectTasksError,
  selectLastUpdated,
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  localAddTask,
  localUpdateTask,
  localDeleteTask,
} from "@taskStore";
import { Task } from "@taskTypes";
import { RootState, AppDispatch } from "@indexStore";

export const useTasks = () => {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);
  const status = useSelector(selectTasksStatus);
  const error = useSelector(selectTasksError);
  const lastUpdated = useSelector(selectLastUpdated);

  // Загрузка задач
  const loadTasks = useCallback(async () => {
    try {
      await dispatch(fetchTasks()).unwrap();
    } catch (err) {
      console.error("Failed to load tasks:", err);
    }
  }, [dispatch]);

  const optimisticAddTask = useCallback(
    async (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
      const tempId = `temp-${Date.now()}`;
      const newTask: Task = {
        ...taskData,
        id: tempId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // -- Локальное обновление задач, раскомментировать если нет сервера
      //dispatch(localAddTask(newTask));
      console.log(taskData, newTask);

      try {
        const result = await dispatch(createTask(taskData)).unwrap();
        console.log(result);

        return result;
      } catch (err) {
        // Удаляем только если задача ещё существует
        dispatch(localDeleteTask(tempId));
        throw err;
      }
    },
    [dispatch],
  );

  // Обновление задачи
  const handleUpdateTask = useCallback(
    async (id: string, changes: Partial<Task>) => {
      dispatch(localUpdateTask({ id, changes }));
      try {
        const result = await dispatch(updateTask({ id, changes })).unwrap();
        return result;
      } catch (err) {
        dispatch(fetchTasks()); // Откатываем изменения при ошибке
        throw err;
      }
    },
    [dispatch],
  );

  // Удаление задачи
  const handleDeleteTask = useCallback(
    async (id: string) => {
      await dispatch(deleteTask(id)).unwrap();
    },
    [dispatch],
  );

  // Хук для получения задачи по ID
  const useTaskById = (id: string) => {
    console.log(id);

    return useSelector((state: RootState) => selectTaskById(id)(state));
  };

  // Автоматическое обновление при монтировании
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return {
    // Состояние
    tasks,
    status,
    error,
    lastUpdated,

    // Селекторы
    useTaskById,

    // Действия
    loadTasks,
    addTask: optimisticAddTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,

    // Синхронные версии
    localAddTask: (task: Task) => dispatch(localAddTask(task)),
    localUpdateTask: (id: string, changes: Partial<Task>) =>
      dispatch(localUpdateTask({ id, changes })),
    localDeleteTask: (id: string) => dispatch(localDeleteTask(id)),
  };
};

// Альтернативная версия только для операций
export const useTaskOperations = () => {
  const dispatch: AppDispatch = useDispatch();

  return {
    addTask: (taskData: Omit<Task, "id">) => dispatch(createTask(taskData)),
    updateTask: (id: string, changes: Partial<Task>) =>
      dispatch(updateTask({ id, changes })),
    deleteTask: (id: string) => dispatch(deleteTask(id)),
  };
};
