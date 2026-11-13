import { useEffect, useState } from "react";
import type { ImageStatus } from "../types";

/**
 * โหลดภาพล่วงหน้าและบอกสถานะ รองรับ Retry
 * เปลี่ยนภาพ (เปลี่ยน level) แล้วสถานะ/จำนวนครั้งที่ retry จะเริ่มใหม่เอง
 */
export function useImagePreload(baseSrc: string) {
  const [retryState, setRetryState] = useState({ base: baseSrc, attempt: 0 });
  const attempt = retryState.base === baseSrc ? retryState.attempt : 0;

  const src =
    attempt === 0
      ? baseSrc
      : `${baseSrc}${baseSrc.includes("?") ? "&" : "?"}retry=${attempt}`;

  const [loadState, setLoadState] = useState<{
    src: string;
    status: ImageStatus;
  }>({ src, status: "loading" });

  const status: ImageStatus =
    loadState.src === src ? loadState.status : "loading";

  useEffect(() => {
    let cancelled = false;
    const image = new Image();

    image.onload = () => {
      if (!cancelled) setLoadState({ src, status: "ready" });
    };
    image.onerror = () => {
      if (!cancelled) setLoadState({ src, status: "error" });
    };
    image.src = src;

    return () => {
      cancelled = true;
      image.onload = null;
      image.onerror = null;
    };
  }, [src]);

  function retry() {
    setRetryState({ base: baseSrc, attempt: attempt + 1 });
  }

  return { src, status, retry };
}