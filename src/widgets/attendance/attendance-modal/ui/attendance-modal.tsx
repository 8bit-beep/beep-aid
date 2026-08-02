import { useState } from "react";
import { Dropdown } from "@b1nd/dodam-design-system/components";
import { Button } from "@/shared/ui/button";
import { Modal } from "@/shared/ui/modal";
import type { AttendanceModalProps } from "../type";
import { useNFCRead } from "../../../../shared/lib/aid-bridge";

const ATTENDANCE_TYPES = [
  { name: "교실자습", value: "교실자습" },
  { name: "동아리", value: "동아리" },
];

export const AttendanceModal = ({ onClose, onConfirm }: AttendanceModalProps) => {
  const [selectedActivity, setSelectedActivity] = useState(ATTENDANCE_TYPES[0].value);
  const { nfcCheck } = useNFCRead();
  

  return (
    <Modal title="어떤 출석체크인가요?" onClose={onClose}>
      <div className="flex flex-col gap-6">
        <Dropdown
          items={ATTENDANCE_TYPES}
          value={selectedActivity}
          onSelectedItemChange={item => {
            setSelectedActivity(item.value);
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
          <Button variant="primary" onClick={() => onConfirm(selectedActivity)}>
            출석
          </Button>
        </div>
      </div>
    </Modal>
  );
};
