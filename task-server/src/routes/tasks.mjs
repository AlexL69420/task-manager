import { Router } from "express";
import pool from "../utils/data.mjs";

const router = Router();

// Получить все активные задачи 
router.get('/', async (req, res) => {
  const { limit = 100, offset = 0 } = req.query;

  try {
    const result = await pool.query(
      'SELECT * FROM get_all_active_tasks($1::integer, $2::integer)',
      [limit, offset]
    );
    
    res.status(200).json({
      tasks: result.rows,
    });
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Создать новую задачу
router.post('/', async (req, res) => {
  const { title, description, category, status, priority } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM create_task($1, $2, $3::task_category, $4::task_status, $5::task_priority)',
      [title, description, category, status, priority]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Получить задачу по ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM get_task_by_id($1)',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching task:', err);
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// Обновить задачу
router.put('/:id', async (req, res) => {
  const { id }
   = req.params;
  const { title, description, category, status, priority } = req.body;

  try {
    const result = await pool.query(
      'SELECT * FROM update_task($1, $2, $3, $4::task_category, $5::task_status, $6::task_priority)',
      [id, title, description, category, status, priority]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Удалить задачу
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM delete_task($1)',
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

export default router;