import { BRAND_COLOR } from "@/shared/config/colors";
import { Button } from "@/shared/ui/button";

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
      role={loading ? "status" : "alert"}
    >
      <div className="flex w-full max-w-sm flex-col items-center gap-3">
        {loading && (
          <div
            className="mb-2 h-8 w-8 animate-spin rounded-full border-3 border-gray-200"
            style={{ borderTopColor: BRAND_COLOR }}
            aria-label="로딩 중"
          />
        )}
        <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm leading-6 text-gray-600">{description}</p>
        {onRetry && (
          <div className="mt-3 flex w-full">
            <Button variant="primary" onClick={onRetry}>
              다시 시도
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
