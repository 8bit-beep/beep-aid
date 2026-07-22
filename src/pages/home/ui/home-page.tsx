import { AttendanceCard } from "@/widgets/attendance-card";
import { DutyTeacherTable } from "@/entities/duty-teacher";
import { RoomMoveBanner } from "@/features/request-room-move";
import { HomeHeader } from "./home-header";

export const HomePage = () => {
  return (
    <div className="flex min-h-full flex-col gap-4 bg-gray-50 px-4 pb-6">
      <HomeHeader />
      <DutyTeacherTable />
      <AttendanceCard />
      <RoomMoveBanner />
    </div>
  );
};
