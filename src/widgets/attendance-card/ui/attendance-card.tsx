import { useState } from "react";
import { MarkAttendanceButton } from "@/features/mark-attendance";
import { ScanAttendanceQrButton } from "@/features/scan-attendance-qr";
import { CheckOutAttendanceButton } from "@/features/check-out-attendance";
import phone from "@/shared/ui/assets/phone.gif";
import phoneEnd from "@/shared/ui/assets/phone-end.png";

const DEFAULT_ACTIVITY = "교실자습";

export const AttendanceCard = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  return (
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
          currentActivity={DEFAULT_ACTIVITY}
          onSuccess={() => setIsCheckedIn(false)}
        />
      ) : (
        <div className="flex gap-3">
          <MarkAttendanceButton onSuccess={() => setIsCheckedIn(true)} />
          <ScanAttendanceQrButton onSuccess={() => setIsCheckedIn(true)} />
        </div>
      )}
    </section>
  );
};
