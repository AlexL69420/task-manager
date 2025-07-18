# Менеджер задач (Task Manager)

Веб-приложение, позволяющее просматривать список задач и редактировать их.

## Функционал

- Просмотр списка задач в виде карточек
- Редактирование задач (название, описание, статус, приоритет, категория)
- Добавление новых задач
- Удаление новых задач
- Фильтрация по категории, статусу и приоритету
- Сортировка по категории, статусу, приоритету и дате
- Адаптивный интерфейс
- Поддержка тёмной темы

## Технологии и подходы

- React 18 (TypeScript)
- React Router v6
- UI: Flowbite (на основе Tailwind CSS)
- Инструменты стилизации: Tailwind CSS
- Сборка: Vite
- State Management: Redux-Toolkit
- Адаптивный дизайн
- Реальный бэкенд на Express.js
- База данных PostgreSQl
- Path Aliases
- Autoprefixer & PostCSS автоматически применяются Tailwind
- Комментарии в формате JSDoc

## Краткое описание применённой архитектуры

Применена архитиктура Feature-Sliced Design

## Установка и запуск

1. **Клонировать репозиторий**

- git clone https://github.com/AlexL69420/task-manager.git
- cd task-manager

2. **Установить зависимости и запустить**

- npm install
- npm run dev

3. **Импортировать базу данных**

- psql postgresql://postgres:mango@localhost/TaskManagerApp -f "путь*к*файлу_database.sql"

4. **Запустить сервер**

- открыть папку task-server в терминале
- npm install
- npm start

## Внешний вид

![screenshot](image.png)
