export type Category =
  | "Bug"
  | "Feature"
  | "Documentation"
  | "Refactor"
  | "Test";
export type Status = "To Do" | "In Progress" | "Done";
export type Priority = "Low" | "Medium" | "High";

export interface Task {
  id: string;
  title: string;
  description?: string;
  category: Category;
  status: Status;
  priority: Priority;
}
