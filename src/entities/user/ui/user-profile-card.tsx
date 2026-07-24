import defaultProfile from "@/shared/ui/assets/default-profile.svg";
import { MOCK_USER } from "../model/mock-user";

export const UserProfileCard = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <img src={defaultProfile} alt="" className="h-20 w-20" />
      <p className="text-lg font-bold text-gray-900">{MOCK_USER.name}</p>

      <div className="w-full rounded-medium bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between py-2">
          <span className="text-gray-700">학번</span>
          <span className="font-medium text-gray-900">{MOCK_USER.studentInfo}</span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="text-gray-700">아이디</span>
          <span className="font-medium text-gray-900">{MOCK_USER.username}</span>
        </div>
      </div>
    </div>
  );
};
