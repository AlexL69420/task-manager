/**
 * Компонент для отображения состояния ошибки
 * @component
 * @param {Object} props - Пропсы компонента
 * @param {string} props.error - Текст ошибки для отображения
 * @param {Function} [props.onRetry] - Функция для повторной попытки
 * @param {string} [props.title="Error Loading Data"] - Заголовок ошибки
 * @param {string} [props.retryText="Try Again"] - Текст кнопки повтора
 * @param {ReactNode} [props.icon] - Иконка для отображения (по умолчанию используется иконка ошибки)
 * @returns {JSX.Element} Компонент состояния ошибки
 * @example
 * <ErrorState
 *   error="Failed to load data"
 *   onRetry={fetchData}
 *   title="Connection Error"
 * />
 */
import { Button } from "flowbite-react";
import { ReactNode } from "react";

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
  title?: string;
  retryText?: string;
  icon?: ReactNode;
}

export const ErrorState = ({
  error,
  onRetry,
  title = "Error Loading Data",
  retryText = "Try Again",
  icon,
}: ErrorStateProps) => {
  // Основной контейнер компонента
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Карточка с ошибкой */}
      <div className="mx-auto max-w-md rounded-xl border border-red-200 bg-white p-6 shadow-lg transition-all hover:shadow-red-100/30 dark:border-red-800/50 dark:bg-gray-800 dark:hover:shadow-red-900/20">
        <div className="flex flex-col items-center text-center">
          {/* Иконка ошибки (по умолчанию или переданная через пропс) */}
          {icon || (
            <div className="mb-4 rounded-full bg-red-100 p-3 dark:bg-red-900/30">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-500 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          )}

          {/* Заголовок ошибки */}
          <h3 className="mb-2 text-lg font-medium text-gray-900 dark:text-white">
            {title}
          </h3>

          {/* Текст ошибки */}
          <p className="mb-6 text-red-500 dark:text-red-400">{error}</p>

          {/* Кнопка повтора (отображается только если передана функция onRetry) */}
          {onRetry && (
            <Button
              onClick={onRetry}
              color="failure"
              className="w-full max-w-xs transition-transform hover:scale-[1.02]"
              pill
            >
              <div className="flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                {retryText}
              </div>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
