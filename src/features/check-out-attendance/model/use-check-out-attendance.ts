export const useCheckOutAttendance = (onSuccess?: () => void) => {
  const checkOutAttendance = () => {
    // TODO: 퇴실 처리 API 연동
    onSuccess?.();
  };

  return { checkOutAttendance };
};
