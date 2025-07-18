import axios from "axios";
import { Task } from "@taskTypes";

const API_URL = "http://localhost:5000/api/tasks";

export const taskApi = {
  /**
   * Получить все задачи с возможностью фильтрации
   * @param params {status?, priority?, category?} - Параметры фильтрации
   */
  fetchTasks: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  /**
   * Получить задачу по ID
   * @param id - ID задачи
   */
  fetchTaskById: async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  /**
   * Создать новую задачу
   * @param task - Данные для создания задачи (без id и дат)
   */
  createTask: async (task: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const response = await axios.post(API_URL, task);
    return response.data;
  },

  /**
   * Обновить задачу
   * @param id - ID задачи для обновления
   * @param updates - Поля для обновления
   */
  updateTask: async (id: string, updates: Partial<Task>) => {
    const response = await axios.put(`${API_URL}/${id}`, updates);
    return response.data;
  },

  /**
   * Удалить задачу
   * @param id - ID задачи для удаления
   */
  deleteTask: async (id: string) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },
};
