import { BannerRow } from "@/shared/ui/banner-row";
import { ChevronRightIcon } from "@/shared/ui/chevron-right-icon";
import { generateHelpQr, toAttendanceError } from "@/entities/attendance";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import QRCode from "react-qr-code";
import { Button } from "@/shared/ui/button";

const HELP_QR_DURATION_SECONDS = 59;

export const HelpFriendAttendanceBanner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [qrToken, setQrToken] = useState<string | null>(null);
  const [qrError, setQrError] = useState<string | null>(null);
  const [isQrLoading, setIsQrLoading] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(HELP_QR_DURATION_SECONDS);

  const requestHelpQr = async () => {
    setQrToken(null);
    setQrError(null);
    setIsQrLoading(true);

    try {
      const { token } = await generateHelpQr();
      setQrToken(token);
    } catch (error) {
      setQrError(toAttendanceError(error).message);
    } finally {
      setIsQrLoading(false);
    }
  };

  const openHelpQr = () => {
    setIsOpen(true);
    setRemainingSeconds(HELP_QR_DURATION_SECONDS);
    void requestHelpQr();
  };

  useEffect(() => {
    if (!isOpen) return;

    const scrollContainer = document.querySelector<HTMLElement>(".app-shell__scroll");
    const previousScrollOverflow = scrollContainer?.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (scrollContainer) {
      scrollContainer.style.overflow = "hidden";
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      if (scrollContainer) {
        scrollContainer.style.overflow = previousScrollOverflow ?? "";
      }
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || remainingSeconds === 0) return;

    const timeoutId = window.setTimeout(() => {
      if (remainingSeconds === 1) {
        setRemainingSeconds(0);
        setIsOpen(false);
        return;
      }

      setRemainingSeconds(currentSeconds => currentSeconds - 1);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [isOpen, remainingSeconds]);

  return (
    <div>
      <BannerRow label="친구 출석 도와주기" onClick={openHelpQr} trailing={<ChevronRightIcon />} />
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 px-[30px] pb-10 backdrop-blur-[2px]"
            onClick={event => {
              if (event.target === event.currentTarget) {
                setIsOpen(false);
              }
            }}
          >
            <section
              role="dialog"
              aria-modal="true"
              aria-labelledby="help-friend-attendance-title"
              className="w-full max-w-[380px] rounded-lg bg-white p-5 shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
            >
              <div className="flex items-center justify-between gap-4">
                <h2
                  id="help-friend-attendance-title"
                  className="text-xl font-bold tracking-[-0.05em] text-[#303030]"
                >
                  친구 출석 도와주기
                </h2>
                <span className="text-sm tracking-[-0.05em] text-[#346287]">
                  0:{String(remainingSeconds).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-2 text-base font-medium tracking-[-0.05em] text-[#8E8E93]">
                친구는 QR 찍기를 통해 출석할 수 있어요!
              </p>
              <div className="mt-5 flex h-[275px] items-center justify-center">
                {isQrLoading && (
                  <p className="text-sm text-[#8E8E93]" role="status">
                    QR 코드를 생성하고 있어요.
                  </p>
                )}
                {qrToken && <QRCode value={qrToken} size={275} />}
                {qrError && (
                  <div className="flex flex-col items-center gap-3 text-center">
                    <p className="text-sm text-red-600" role="alert">
                      {qrError}
                    </p>
                    <button
                      type="button"
                      className="text-sm font-semibold text-[#346287]"
                      onClick={() => void requestHelpQr()}
                    >
                      다시 시도
                    </button>
                  </div>
                )}
              </div>
              <Button
                variant="danger"
                className="mt-5 h-[45px] w-full py-0 text-base tracking-[-0.05em] shadow-[0_2px_2px_rgba(0,0,0,0.05)]"
                onClick={() => setIsOpen(false)}
              >
                닫기
              </Button>
            </section>
          </div>,
          document.body
        )}
    </div>
  );
};
