import { useState } from "react";
import { CheckOutAttendanceButton } from "@/features/attendance/check-out-attendance";
import { useAuth } from "@/features/auth";
import phone from "@/shared/ui/assets/phone.gif";
import phoneEnd from "@/shared/ui/assets/phone-end.png";
import { Button } from "@/shared/ui/button";
import { useToast } from "@/shared/ui/toast";
import { AttendanceModal } from "../../attendance-modal";
import type { AttendanceMethod } from "../../attendance-modal/type";

export const AttendanceCard = () => {
  const { user, refreshUser } = useAuth();
  const toast = useToast();
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [attendanceMethod, setAttendanceMethod] = useState<AttendanceMethod>("NFC");
  const currentStatus = user.currentStatus;
  const isCheckedIn = currentStatus != null && currentStatus.name !== "미출석";

  const openAttendanceModal = (method: AttendanceMethod) => {
    setAttendanceMethod(method);
    setIsAttendanceModalOpen(true);
  };

  const refreshAttendanceState = async () => {
    try {
      await refreshUser();
    } catch {
      toast.warning("서버 상태를 새로고침하지 못했어요. 화면을 다시 열어 확인해 주세요.");
    }
  };

  const handleAttendanceSuccess = async () => {
    await refreshAttendanceState();
    setIsAttendanceModalOpen(false);
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

        {isCheckedIn && currentStatus ? (
          <CheckOutAttendanceButton
            currentActivity={currentStatus.name}
            onSuccess={refreshAttendanceState}
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
          onSuccess={handleAttendanceSuccess}
          method={attendanceMethod}
        />
      )}
    </>
  );
};
