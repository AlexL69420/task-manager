import { Router } from "express";
import tasksRouter from "./tasks";

// Роутер для других роутеров
const indexRouter = Router();

indexRouter.use('/api/tasks', tasksRouter);

export default indexRouter;