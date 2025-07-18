import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "@taskTypes";
import { taskApi } from "@taskApi";

interface TasksState {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  lastUpdated: number | null;
}

const initialState: TasksState = {
  tasks: [],
  status: "idle",
  error: null,
  lastUpdated: null,
};

// Асинхронные Thunks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await taskApi.fetchTasks();
      return response.tasks;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createTask = createAsyncThunk(
  "tasks/create",
  async (
    taskData: Omit<Task, "id" | "createdAt" | "updatedAt">,
    { rejectWithValue },
  ) => {
    try {
      const response = await taskApi.createTask(taskData);
      console.log(response);

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const updateTask = createAsyncThunk(
  "tasks/update",
  async (
    { id, changes }: { id: string; changes: Partial<Task> },
    { rejectWithValue },
  ) => {
    try {
      const response = await taskApi.updateTask(id, changes);

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const deleteTask = createAsyncThunk(
  "tasks/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await taskApi.deleteTask(id);
      return id;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Синхронные редьюсеры для локальных операций
    localAddTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    localUpdateTask: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<Task> }>,
    ) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id,
      );
      if (index !== -1) {
        state.tasks[index] = {
          ...state.tasks[index],
          ...action.payload.changes,
        };
      }
    },
    localDeleteTask: (state, action: PayloadAction<string>) => {
      if (!action.payload) return;
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Обработка fetchTasks
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Обработка createTask
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
        state.lastUpdated = Date.now();
      })

      // Обработка updateTask
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id,
        );
        if (index !== -1) {
          state.tasks[index] = action.payload; // Заменяем весь объект
          state.lastUpdated = Date.now();
        }
      })

      // Обработка deleteTask
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        state.lastUpdated = Date.now();
      });
  },
});

// Экспортируем синхронные и асинхронные экшены
export const { localAddTask, localUpdateTask, localDeleteTask } =
  tasksSlice.actions;
export default tasksSlice.reducer;

// Селекторы
export const selectAllTasks = (state: { tasks: TasksState }) =>
  state.tasks.tasks;
export const selectTaskById = (id: string) => (state: { tasks: TasksState }) =>
  state.tasks.tasks.find((task) => task.id == id);
export const selectTasksStatus = (state: { tasks: TasksState }) =>
  state.tasks.status;
export const selectTasksError = (state: { tasks: TasksState }) =>
  state.tasks.error;
export const selectLastUpdated = (state: { tasks: TasksState }) =>
  state.tasks.lastUpdated;
