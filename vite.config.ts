import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import flowbiteReact from "flowbite-react/plugin/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@app": path.resolve(__dirname, "./src/app"),
      "@entities": path.resolve(__dirname, "./src/entities"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@shared": path.resolve(__dirname, "./src/shared"),

      // Конкретные файлы
      "@App": path.resolve(__dirname, "./src/app/App.tsx"),
      "@main": path.resolve(__dirname, "./src/app/main.tsx"),
      "@ErrorState": path.resolve(__dirname, "./src/entities/ErrorState.tsx"),
      "@taskApi": path.resolve(__dirname, "./src/features/api/taskApi.ts"),
      "@TaskEmptyState": path.resolve(
        __dirname,
        "./src/features/components/TaskEmptyState.tsx",
      ),
      "@TaskFilters": path.resolve(
        __dirname,
        "./src/features/components/TaskFilters.tsx",
      ),
      "@TaskItem": path.resolve(
        __dirname,
        "./src/features/components/TaskItem.tsx",
      ),
      "@TaskList": path.resolve(
        __dirname,
        "./src/features/components/TaskList.tsx",
      ),
      "@TaskSorting": path.resolve(
        __dirname,
        "./src/features/components/TaskSorting.tsx",
      ),
      "@useTasks": path.resolve(__dirname, "./src/features/hooks/useTasks.ts"),
      "@sortTasks": path.resolve(__dirname, "./src/features/lib/sortTasks.ts"),
      "@taskStore": path.resolve(
        __dirname,
        "./src/features/model/store/taskStore.ts",
      ),
      "@indexStore": path.resolve(__dirname, "./src/features/model/store"),
      "@taskTypes": path.resolve(__dirname, "./src/features/model/types.ts"),
      "@NotFoundPage": path.resolve(__dirname, "./src/pages/NotFoundPage.tsx"),
      "@TaskForm": path.resolve(__dirname, "./src/pages/TaskForm.tsx"),
    },
  },
});
