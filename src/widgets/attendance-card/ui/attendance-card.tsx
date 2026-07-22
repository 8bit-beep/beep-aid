import { MarkAttendanceButton } from "@/features/mark-attendance";
import { ScanAttendanceQrButton } from "@/features/scan-attendance-qr";
import attendanceIllustration from "@/shared/ui/assets/attendance-illustration.gif";

export const AttendanceCard = () => {
  return (
    <section className="rounded-medium bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-gray-900">출석 체크</h2>

      <div className="my-6 flex justify-center">
        <img
          src={attendanceIllustration}
          alt=""
          className="aspect-square w-3/5 max-w-56 object-contain"
        />
      </div>

      <div className="flex gap-3">
        <MarkAttendanceButton />
        <ScanAttendanceQrButton />
      </div>
    </section>
  );
};
