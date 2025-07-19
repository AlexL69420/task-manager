import express from 'express';
import cors from 'cors';
import indexRouter from './routes';

// Инициализация сервера
const app = express();

// Парсим JSON с увеличенным лимитом (для загрузки файлов)
app.use(express.json({ limit: '10mb' }));

// Настраиваем CORS для фронтенда
app.use(cors({
    origin: 'http://localhost:5173', // Домен фронтенд-приложения
    credentials: true, // Разрешаем передачу кук 
}));

// Разрешаем preflight-запросы для всех маршрутов
app.options('*', cors());

// Подключаем основные роуты
app.use(indexRouter);

// Запускаем сервер на указанном порту
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
