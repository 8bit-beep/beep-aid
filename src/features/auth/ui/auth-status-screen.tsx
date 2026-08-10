type AuthStatusScreenProps = {
  title: string;
  description: string;
  loading?: boolean;
  onRetry?: () => void;
};

export const AuthStatusScreen = ({
  title,
  description,
  loading = false,
  onRetry,
}: AuthStatusScreenProps) => {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-gray-50 px-6 text-center">
      <div className="flex max-w-sm flex-col items-center gap-3">
        {loading && (
          <div
            className="mb-2 h-8 w-8 animate-spin rounded-full border-3 border-gray-200 border-t-blue-500"
            aria-label="로딩 중"
          />
        )}
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm leading-6 text-gray-600">{description}</p>
        {onRetry && (
          <button
            type="button"
            className="mt-3 rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
            onClick={onRetry}
          >
            다시 시도
          </button>
        )}
      </div>
    </main>
  );
};
