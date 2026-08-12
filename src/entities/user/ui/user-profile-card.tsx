import defaultProfile from "@/shared/ui/assets/default-profile.svg";
import { formatStudentNumber, type User } from "../model/user.schema";

type UserProfileCardProps = {
  user: User;
};

export const UserProfileCard = ({ user }: UserProfileCardProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <img src={user.profileImage || defaultProfile} alt="" className="h-20 w-20" />
      <p className="text-lg font-bold text-gray-900">{user.name}</p>

      <div className="w-full rounded-medium bg-white p-5">
        {user.studentInfo && (
          <div className="flex items-center justify-between py-2">
            <span className="text-gray-700">학번</span>
            <span className="font-medium text-gray-900">
              {formatStudentNumber(user.studentInfo)}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between py-2">
          <span className="text-gray-700">아이디</span>
          <span className="font-medium text-gray-900">{user.username}</span>
        </div>
      </div>
    </div>
  );
};
