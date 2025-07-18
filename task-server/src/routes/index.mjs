import { Router } from "express";
import tasksRouter from './tasks.mjs';
 
const router = Router();

router.use('/api/tasks', tasksRouter);

export default router;