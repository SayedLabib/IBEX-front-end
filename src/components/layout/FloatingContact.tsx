"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "8801712345678";

export default function FloatingContact() {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {showTooltip && (
        <div className="relative bg-white border border-gray-200 shadow-lg rounded-lg px-4 py-3 pr-7 max-w-56 text-sm text-ink">
          <button
            onClick={() => setShowTooltip(false)}
            aria-label="Dismiss"
            className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 text-xs leading-none flex items-center justify-center transition-colors"
          >
            ×
          </button>
          Have a question? Ask us anything.
        </div>
      )}

      <div className="flex flex-col gap-3">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="h-14 w-14 rounded-full bg-[#25D366] shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="#ffffff" aria-hidden>
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.82L2 22l5.44-1.37c1.37.73 2.93 1.15 4.6 1.15h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm5.6 14.1c-.24.67-1.4 1.3-1.93 1.38-.5.08-1.12.11-1.8-.11-.42-.14-.96-.3-1.65-.6-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.26-.28.56-.35.75-.35.19 0 .38 0 .54.01.17.01.4-.07.63.48.24.57.81 1.98.88 2.12.07.14.12.3.02.49-.09.19-.14.3-.28.46-.14.16-.29.36-.42.48-.14.14-.28.29-.12.56.16.28.71 1.17 1.53 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.6-.07.17-.19.71-.83.9-1.11.19-.28.38-.23.63-.14.26.09 1.64.77 1.92.91.28.14.47.21.54.33.07.12.07.68-.17 1.35z" />
          </svg>
        </a>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          aria-label="Chat on Messenger"
          className="h-14 w-14 rounded-full bg-[#0084FF] shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="#ffffff" aria-hidden>
            <path d="M13 2L3 14h7l-1 8 11-14h-7l1-6z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
