import { AttendanceCard } from "@/widgets/attendance/attendance-card";
import { DutyTeacherTable } from "@/entities/duty-teacher";
import { isAttendanceCompleted } from "@/entities/user";
import { HelpFriendAttendanceBanner } from "@/features/attendance/help-friend-attendance";
import { useAuth } from "@/features/auth";
import { HomeHeader } from "./home-header";

export const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-full flex-col gap-4 bg-gray-50 px-4 pb-6">
      <HomeHeader />
      <DutyTeacherTable />
      <AttendanceCard />
      {isAttendanceCompleted(user) && <HelpFriendAttendanceBanner />}
    </div>
  );
};
