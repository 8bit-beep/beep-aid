import { TopNavBar } from "@b1nd/dodam-design-system/components";
import { UserProfileCard } from "@/entities/user";
import { WeeklySchedule } from "@/widgets/weekly-schedule";

export const ProfilePage = () => {
  return (
    <div className="flex min-h-full flex-col bg-gray-50 pb-6">
      <TopNavBar customStyle={{ background: "#f9fafb" }}>
        <TopNavBar.Title>프로필</TopNavBar.Title>
      </TopNavBar>

      <div className="flex flex-col gap-4 px-4 pt-4">
        <UserProfileCard />
        <WeeklySchedule />
      </div>
    </div>
  );
};
