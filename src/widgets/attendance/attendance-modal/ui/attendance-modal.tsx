import { useState } from "react";
import { Actions, useBridgeProvider } from "@b1nd/aid-kit/bridge-kit/web";
import { Dropdown } from "@b1nd/dodam-design-system/components";
import { useAttendanceTypes } from "@/entities/attendance";
import { useNFCCheck } from "@/features/attendance/nfc-check";
import { useQRCheck } from "@/features/attendance/qr-check";
import { Button } from "@/shared/ui/button";
import { Modal } from "@/shared/ui/modal";
import { useToast } from "@/shared/ui/toast";
import type { AttendanceModalProps } from "../type";

export const AttendanceModal = ({ onClose, onSuccess, method }: AttendanceModalProps) => {
  const { send } = useBridgeProvider();
  const toast = useToast();
  const { attendanceTypes, isLoading, error: attendanceTypesError, refetch } = useAttendanceTypes();
  const dropdownItems = attendanceTypes.map(item => ({
    value: String(item.id),
    name: item.name,
  }));
  const [selectedAttendanceTypeId, setSelectedAttendanceTypeId] = useState("출석 유형 선택");
  const selectedAttendanceType = attendanceTypes.find(
    item => String(item.id) === selectedAttendanceTypeId
  );

  const completeAttendance = async () => {
    send(Actions.HAPTIC, { style: "success" });
    toast.success("출석이 완료됐어요.");

    if (selectedAttendanceType) {
      await onSuccess(selectedAttendanceType);
    }
  };

  const nfc = useNFCCheck({ onSuccess: completeAttendance });
  const qr = useQRCheck({ onSuccess: completeAttendance });
  const action = method === "NFC" ? nfc : qr;
  const isBusy = action.isBusy;

  const handleAttendance = () => {
    if (!selectedAttendanceType || isBusy) return;

    if (method === "NFC") {
      nfc.nfcCheck(selectedAttendanceType.id);
      return;
    }

    qr.qrCheck(selectedAttendanceType.id);
  };

  const handleClose = () => {
    if (!isBusy) onClose();
  };

  const buttonLabel =
    action.status === "scanning"
      ? method === "NFC"
        ? "NFC 태그 인식 중..."
        : "QR 인식 중..."
      : action.status === "submitting"
        ? "출석 처리 중..."
        : "출석";

  return (
    <Modal title="어떤 출석체크인가요?" onClose={handleClose}>
      <div className="flex flex-col gap-6">
        {isLoading && (
          <p className="py-3 text-center text-sm text-gray-500" role="status">
            출석 타입을 불러오고 있어요.
          </p>
        )}

        {attendanceTypesError && (
          <div className="flex flex-col items-center gap-3 py-2 text-center">
            <p className="text-sm text-red-600">출석 타입을 불러오지 못했어요.</p>
            <button type="button" className="text-sm font-semibold text-blue-600" onClick={refetch}>
              다시 시도
            </button>
          </div>
        )}

        {!isLoading && !attendanceTypesError && attendanceTypes.length === 0 && (
          <p className="py-3 text-center text-sm text-gray-500">사용 가능한 출석 타입이 없어요.</p>
        )}

        {!isLoading && !attendanceTypesError && attendanceTypes.length > 0 && (
          <Dropdown
            items={dropdownItems}
            value={selectedAttendanceTypeId}
            onSelectedItemChange={item => {
              setSelectedAttendanceTypeId(item.value);
              nfc.reset();
              qr.reset();
            }}
            customStyle={{
              width: "100%",
              boxSizing: "border-box",
              border: "1px solid #e5e7eb",
            }}
          />
        )}

        {action.error && (
          <p className="text-center text-sm text-red-600" role="alert">
            {action.error.message}
          </p>
        )}

        <div className="flex gap-3">
          <Button variant="danger" disabled={isBusy} onClick={handleClose}>
            취소
          </Button>
          <Button
            variant="primary"
            disabled={!selectedAttendanceType || isBusy}
            onClick={handleAttendance}
            className="disabled:opacity-60"
          >
            {buttonLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
