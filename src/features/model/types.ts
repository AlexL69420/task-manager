// Перечисление категорий задач
export enum Category {
  Bug = "Bug",
  Feature = "Feature",
  Documentation = "Documentation",
  Refactor = "Refactor",
  Test = "Test",
}

// Перечисление статусов задач
export enum Status {
  Todo = "To Do",
  InProgress = "In Progress",
  Done = "Done",
}

// Перечисление приоритетов задач
export enum Priority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

// Интерфейс задачи
export interface Task {
  id: string; // Уникальный идентификатор задачи
  title: string; // Название задачи (обязательное поле)
  description?: string; // Описание задачи (опциональное)
  category: Category; // Категория задачи (из enum)
  status: Status; // Статус задачи (из enum)
  priority: Priority; // Приоритет задачи (из enum)
  createdAt: string; // Дата создания в ISO формате
  updatedAt?: string; // Дата последнего обновления (опционально)
}

// Тип для частичного обновления задачи
export type TaskUpdate = Partial<Omit<Task, "id" | "createdAt">>;

// Тип для создания новой задачи (без id и дат)
export type NewTask = Omit<Task, "id" | "createdAt" | "updatedAt">;

// Типы для сортировки
export type SortCriteria = "createdAt" | "priority" | "status" | "none";
export type SortOrder = "asc" | "desc";

// Интерфейс для конфигурации сортировки
export interface SortConfig {
  criteria: SortCriteria;
  order: SortOrder;
}
