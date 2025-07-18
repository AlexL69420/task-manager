import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
        alias: {
          map: [
            ["@", "./src"],
            ["@app", "./src/app"],
            ["@entities", "./src/entities"],
            ["@features", "./src/features"],
            ["@pages", "./src/pages"],
            ["@shared", "./src/shared"],
            ["@App", "./src/app/App.tsx"],
            ["@main", "./src/app/main.tsx"],
            ["@ErrorState", "./src/entities/ErrorState.tsx"],
            ["@taskApi", "./src/features/api/taskApi.ts"],
            ["@TaskEmptyState", "./src/features/components/TaskEmptyState.tsx"],
            ["@TaskFilters", "./src/features/components/TaskFilters.tsx"],
            ["@TaskItem", "./src/features/components/TaskItem.tsx"],
            ["@TaskList", "./src/features/components/TaskList.tsx"],
            ["@TaskSorting", "./src/features/components/TaskSorting.tsx"],
            ["@useTasks", "./src/features/hooks/useTasks.ts"],
            ["@sortTasks", "./src/features/lib/sortTasks.ts"],
            ["@taskStore", "./src/features/model/store/taskStore.ts"],
            ["@indexStore", "src/features/model/store"],
            ["@taskTypes", "./src/features/model/types.ts"],
            ["@NotFoundPage", "./src/pages/NotFoundPage.tsx"],
            ["@TaskForm", "./src/pages/TaskForm.tsx"],
          ],
          extensions: [".ts", ".tsx", ".js", ".jsx"],
        },
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "import/no-unresolved": "error",
    },
  },
);
