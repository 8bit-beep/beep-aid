import { BannerRow } from "@/shared/ui/banner-row";
import { ChevronRightIcon } from "@/shared/ui/chevron-right-icon";
import { Modal } from "@/shared/ui/modal";
import { useState } from "react";

export const HelpFriendAttendanceBanner = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <BannerRow
        label="친구 출석 도와주기"
        onClick={() => setIsOpen(true)}
        trailing={<ChevronRightIcon />}
      />
      {isOpen && (
        <Modal title="친구 출석 도와주기" onClose={() => setIsOpen(false)}>
          친구 출석 도와주기 패널
        </Modal>
      )}
    </div>
  );
};
