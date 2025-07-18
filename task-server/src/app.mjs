import express from 'express';
import cors from 'cors';
import indexRouter from './routes/index.mjs'

const app = express();
app.use(express.json({ limit: '10mb' })); 

app.use(cors({
    origin: 'http://localhost:5173', // Указываем конкретный домен фронтенда
    credentials: true, // Разрешаем отправку кук
    
  }));

// Обработка preflight-запросов
app.options('*', cors()); // Разрешаем preflight для всех маршрутов
app.use(indexRouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`server listening on port ${PORT}`);
});
