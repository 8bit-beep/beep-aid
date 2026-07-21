import { AttendanceCard } from "@/widgets/attendance-card";
import { DutyTeacherBanner } from "@/features/check-duty-teacher";
import { RoomMoveBanner } from "@/features/request-room-move";
import { HomeHeader } from "./home-header";

export const HomePage = () => {
  return (
    <div className="flex flex-col gap-4 bg-gray-50 px-4 pb-6">
      <HomeHeader />
      <DutyTeacherBanner />
      <AttendanceCard />
      <RoomMoveBanner />
    </div>
  );
};
