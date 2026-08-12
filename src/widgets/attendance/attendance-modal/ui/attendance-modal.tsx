import { useState } from "react";
import { Dropdown } from "@b1nd/dodam-design-system/components";
import { useAttendanceTypes } from "@/entities/attendance";
import { Button } from "@/shared/ui/button";
import { Modal } from "@/shared/ui/modal";
import type { AttendanceModalProps } from "../type";

export const AttendanceModal = ({ onClose, method }: AttendanceModalProps) => {
  const { attendanceTypes, isLoading, error, refetch } = useAttendanceTypes();
  const dropdownItems = attendanceTypes.map(item => ({
    value: String(item.id),
    name: item.name,
  }));
  const [selectedAttendanceTypeId, setSelectedAttendanceTypeId] = useState("출석 유형 선택");
  const hasValidSelection = attendanceTypes.some(
    item => String(item.id) === selectedAttendanceTypeId,
  );

  const handleAttendance = () => {
    if (!selectedAttendanceTypeId) return;

    if (method === "NFC") {
      // NFC Scan
      return;
    }

    // QR 스캔
  };

  return (
    <Modal title="어떤 출석체크인가요?" onClose={onClose}>
      <div className="flex flex-col gap-6">
        {isLoading && (
          <p className="py-3 text-center text-sm text-gray-500" role="status">
            출석 타입을 불러오고 있어요.
          </p>
        )}

        {error && (
          <div className="flex flex-col items-center gap-3 py-2 text-center">
            <p className="text-sm text-red-600">출석 타입을 불러오지 못했어요.</p>
            <button type="button" className="text-sm font-semibold text-blue-600" onClick={refetch}>
              다시 시도
            </button>
          </div>
        )}

        {!isLoading && !error && attendanceTypes.length === 0 && (
          <p className="py-3 text-center text-sm text-gray-500">사용 가능한 출석 타입이 없어요.</p>
        )}

        {!isLoading && !error && attendanceTypes.length > 0 && (
          <Dropdown
            items={dropdownItems}
            value={selectedAttendanceTypeId}
            onSelectedItemChange={item => {
              setSelectedAttendanceTypeId(item.value);
            }}
            customStyle={{
              width: "100%",
              boxSizing: "border-box",
              border: "1px solid #e5e7eb",
            }}
          />
        )}
        <div className="flex gap-3">
          <Button variant="danger" onClick={onClose}>
            취소
          </Button>
          <Button variant="primary" disabled={!hasValidSelection} onClick={handleAttendance}>
            출석
          </Button>
        </div>
      </div>
    </Modal>
  );
};
