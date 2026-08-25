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
    // 앱 셸의 스크롤 영역(.app-shell__scroll) 안에 놓이므로 dvh가 아니라 부모 높이를 채운다.
    <div
      className="flex min-h-full flex-col items-center justify-center bg-gray-50 px-6 text-center"
      role="status"
      aria-live="polite"
    >
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
    </div>
  );
};
