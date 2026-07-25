import { useState } from "react";
import { CheckOutAttendanceButton } from "@/features/attendance/check-out-attendance";
import phone from "@/shared/ui/assets/phone.gif";
import phoneEnd from "@/shared/ui/assets/phone-end.png";
import { Button } from "@/shared/ui/button";
import { AttendanceModal } from "../../attendance-modal";

const DEFAULT_ACTIVITY = "교실자습";

export const AttendanceCard = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(DEFAULT_ACTIVITY);
  const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);

  const openAttendanceModal = () => {
    setIsAttendanceModalOpen(true);
  };

  const closeAttendanceModal = () => {
    setIsAttendanceModalOpen(false);
  };

  const confirmAttendance = (activity: string) => {
    setCurrentActivity(activity);
    setIsCheckedIn(true);
    closeAttendanceModal();
  };

  return (
    <>
      <section className="rounded-medium bg-white p-5 shadow-sm">
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
            <Button variant="primary" onClick={openAttendanceModal}>
              NFC 출석
            </Button>
            <Button variant="secondary" onClick={openAttendanceModal}>
              QR 출석
            </Button>
          </div>
        )}
      </section>

      {isAttendanceModalOpen && (
        <AttendanceModal onClose={closeAttendanceModal} onConfirm={confirmAttendance} />
      )}
    </>
  );
};
