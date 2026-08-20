import { useState } from "react";
import { CheckOutAttendanceButton } from "@/features/attendance/check-out-attendance";
import { useAuth } from "@/features/auth";
import { isAttendanceCompleted, type User } from "@/entities/user";
import phone from "@/shared/ui/assets/phone.gif";
import phoneEnd from "@/shared/ui/assets/phone-end.png";
import { Button } from "@/shared/ui/button";
import { AttendanceModal } from "../../attendance-modal";
import type { AttendanceMethod } from "../../attendance-modal/type";

export const AttendanceCard = () => {
  const { user, setCurrentStatus } = useAuth();
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
  const [attendanceMethod, setAttendanceMethod] = useState<AttendanceMethod>("NFC");
  const currentStatus = user.currentStatus;
  const isCheckedIn = isAttendanceCompleted(user);

  const openAttendanceModal = (method: AttendanceMethod) => {
    setAttendanceMethod(method);
    setIsAttendanceModalOpen(true);
  };

  const handleAttendanceSuccess = (attendanceType: NonNullable<User["currentStatus"]>) => {
    setCurrentStatus(attendanceType);
    setIsAttendanceModalOpen(false);
  };

  const handleCheckOutSuccess = () => {
    setCurrentStatus(null);
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
            onSuccess={handleCheckOutSuccess}
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
