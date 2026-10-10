"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type ToastTone = "success" | "info" | "warning";

export type ToastItem = {
  id: number;
  message: string;
  tone: ToastTone;
};

/** Tiny toast queue – replaces the old blocking `alert()` calls. */
export function useToasts(lifetime = 2800) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((toast) => toast.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const push = useCallback(
    (message: string, tone: ToastTone = "success") => {
      const id = nextId.current++;
      setToasts((list) => [...list.slice(-2), { id, message, tone }]);
      timers.current.set(
        id,
        setTimeout(() => dismiss(id), lifetime)
      );
      return id;
    },
    [dismiss, lifetime]
  );

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
      timers.current.clear();
    },
    []
  );

  return { toasts, push, dismiss };
}

const ICONS: Record<ToastTone, string> = {
  success: "M20 6 9 17l-5-5",
  info: "M12 16v-5m0-3h.01",
  warning: "M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z",
};

export function ToastStack({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: number) => void;
}) {
  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <button
          key={toast.id}
          type="button"
          className={`toast toast-${toast.tone}`}
          onClick={() => onDismiss(toast.id)}
        >
          <span className="toast-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path
                d={ICONS[toast.tone]}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="toast-message">{toast.message}</span>
          <span className="toast-progress" aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
