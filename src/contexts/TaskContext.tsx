// Импорт необходимых зависимостей из React
import { createContext, useContext, useState, ReactNode } from "react";
import { Task } from "../types";

/**
 * Интерфейс контекста задач.
 * Определяет структуру и типы данных/методов,
 * которые будут доступны через контекст.
 */
interface TaskContextType {
  tasks: Task[]; // Массив задач
  addTask: (task: Task) => void; // Функция добавления новой задачи
  updateTask: (id: string, updatedTask: Partial<Task>) => void; // Функция обновления задачи
  deleteTask: (id: string) => void; // Функция удаления задачи
  getTaskById: (id: string) => Task | undefined; // Функция получения задачи по ID
}

// Создание контекста с начальным значением undefined
const TaskContext = createContext<TaskContextType | undefined>(undefined);

/**
 * Провайдер контекста задач.
 * Обеспечивает доступ к данным и методам работы с задачами
 * для всех дочерних компонентов.
 */
export const TaskProvider = ({ children }: { children: ReactNode }) => {
  // Состояние для хранения списка задач с начальными демо-данными
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Fix login page",
      description: "Login button not working on mobile",
      category: "Bug",
      status: "In Progress",
      priority: "High",
    },
    {
      id: "2",
      title: "Add dark mode",
      description: "Implement dark theme for the application",
      category: "Feature",
      status: "To Do",
      priority: "Medium",
    },
  ]);

  /**
   * Добавляет новую задачу в список.
   * @param task - Объект новой задачи
   */
  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  /**
   * Обновляет существующую задачу.
   * @param id - ID задачи для обновления
   * @param updatedTask - Объект с обновляемыми полями задачи
   */
  const updateTask = (id: string, updatedTask: Partial<Task>) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task,
      ),
    );
  };

  /**
   * Удаляет задачу из списка.
   * @param id - ID задачи для удаления
   */
  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  /**
   * Находит задачу по ID.
   * @param id - ID искомой задачи
   * @returns Объект задачи или undefined, если не найдена
   */
  const getTaskById = (id: string) => {
    return tasks.find((task) => task.id === id);
  };

  // Предоставление значения контекста дочерним компонентам
  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        getTaskById,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

/**
 * Кастомный хук для доступа к контексту задач.
 * @returns Контекст задач
 * @throws Ошибку, если используется вне TaskProvider
 */
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
