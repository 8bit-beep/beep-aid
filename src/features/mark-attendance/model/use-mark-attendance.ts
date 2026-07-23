export const useMarkAttendance = (onSuccess?: () => void) => {
  const markAttendance = () => {
    // TODO: 출석 처리 API 연동
    onSuccess?.();
  };

  return { markAttendance };
};
