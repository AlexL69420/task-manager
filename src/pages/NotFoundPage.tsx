import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-100 to-cyan-100 p-4 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">
      <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white text-center shadow-xl transition-all duration-300 hover:shadow-2xl dark:bg-gray-800">
        <div className="p-8">
          <div className="mb-6 flex justify-center">
            <div className="text-6xl">😕</div>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-gray-800 dark:text-white">
            404 - Страница не найдена
          </h1>

          <p className="mb-8 text-gray-600 dark:text-gray-300">
            Похоже, вы заблудились в цифровом пространстве. Давайте вернём вас
            на правильный путь.
          </p>

          <Link
            to="/"
            className="inline-block rounded-lg bg-emerald-500 px-6 py-3 font-medium text-white shadow-md transition-colors duration-300 hover:bg-emerald-600 hover:shadow-lg"
          >
            Вернуться на главную
          </Link>
        </div>

        <div className="bg-gray-50 px-8 py-4 text-center dark:bg-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Если вы считаете, что это ошибка, пожалуйста, сообщите нам
          </p>
        </div>
      </div>
    </main>
  );
}
