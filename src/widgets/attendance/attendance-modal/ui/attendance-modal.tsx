import { useState } from "react";
import { Dropdown } from "@b1nd/dodam-design-system/components";
import { Button } from "@/shared/ui/button";
import { Modal } from "@/shared/ui/modal";
import type { AttendanceModalProps } from "../type";

type AttendanceType = {
  readonly id: number;
  readonly name: string;
};

export const AttendanceModal = ({ onClose, method }: AttendanceModalProps) => {
  // TODO: 출석 타입 조회 훅의 서버 응답으로 교체
  const attendanceTypes: AttendanceType[] = [];
  const dropdownItems = attendanceTypes.map(item => ({
    value: String(item.id),
    name: item.name,
  }));
  const [selectedAttendanceTypeId, setSelectedAttendanceTypeId] = useState("");

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
        <div className="flex gap-3">
          <Button variant="danger" onClick={onClose}>
            취소
          </Button>
          <Button
            variant="primary"
            disabled={!selectedAttendanceTypeId}
            onClick={handleAttendance}
          >
            출석
          </Button>
        </div>
      </div>
    </Modal>
  );
};
