import { useState } from "react";
import { CheckOutAttendanceButton } from "@/features/attendance/check-out-attendance";
import phone from "@/shared/ui/assets/phone.gif";
import phoneEnd from "@/shared/ui/assets/phone-end.png";
import { Button } from "@/shared/ui/button";
import { AttendanceModal } from "../../attendance-modal";
import type { AttendanceMethod } from "../../attendance-modal/type";

const DEFAULT_ACTIVITY = "교실자습";

export const AttendanceCard = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false); // 출석 여부
  const [currentActivity] = useState(DEFAULT_ACTIVITY); // 출석 등록 타입
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false); // 모달 표시 여부
  const [attendanceMethod, setAttendanceMethod] = useState<AttendanceMethod>("NFC");

  const openAttendanceModal = (method: AttendanceMethod) => {
    setAttendanceMethod(method);
    setIsAttendanceModalOpen(true);
  };

  return (
    <>
      <section className="rounded-xl bg-white p-5">
        <h2 className="text-lg font-bold text-gray-900">출석 체크</h2>

        <div className="my-6 flex justify-center">
          <img
            src={isCheckedIn ? phoneEnd : phone}
            alt=""
            className="aspect-square w-3/5 max-w-56 object-contain"
          />
        </div>

        {isCheckedIn ? (
          <CheckOutAttendanceButton
            currentActivity={currentActivity}
            onSuccess={() => setIsCheckedIn(false)}
          />
        ) : (
          <div className="flex gap-3">
            <Button variant="primary" onClick={() => openAttendanceModal("NFC")}>
              NFC 출석
            </Button>
            <Button variant="secondary" onClick={() => openAttendanceModal("QR")}>
              QR 출석
            </Button>
          </div>
        )}
      </section>

      {isAttendanceModalOpen && (
        <AttendanceModal
          onClose={() => setIsAttendanceModalOpen(false)}
          method={attendanceMethod}
        />
      )}
    </>
  );
};
