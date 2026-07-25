export const useNFCCheck = (onSuccess?: () => void) => {
  const nfcCheck = () => {
    // TODO: 출석 처리 API 연동
    onSuccess?.();
  };

  return { nfcCheck };
};
