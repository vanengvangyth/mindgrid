import { useEffect } from "react";

/** กด Esc เพื่อปิด modal และล็อกการเลื่อนหน้าระหว่างที่เปิดอยู่ */
export function useModalEffects(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);
}