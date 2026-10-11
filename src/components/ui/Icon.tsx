export type IconName =
  | "search"
  | "user"
  | "heart"
  | "bag"
  | "menu"
  | "close"
  | "chevron-left"
  | "chevron-right"
  | "chevron-down"
  | "chevron-up"
  | "plus"
  | "minus"
  | "check"
  | "info"
  | "zoom"
  | "truck"
  | "shield-check"
  | "box"
  | "headset"
  | "medal"
  | "credit-card"
  | "smartphone"
  | "cash"
  | "facebook"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "phone"
  | "home"
  | "download"
  | "logout"
  | "grid"
  | "clock"
  | "mail"
  | "map-pin";

function normalize(color: string) {
  return color.startsWith("#") ? color : `#${color}`;
}

export default function Icon({
  name,
  size = 20,
  color = "currentColor",
  filled = false,
  strokeWidth = 1.8,
  className = "",
}: {
  name: IconName;
  size?: number;
  color?: string;
  filled?: boolean;
  strokeWidth?: number;
  className?: string;
}) {
  const stroke = color === "currentColor" ? "currentColor" : normalize(color);
  const common = { width: size, height: size, viewBox: "0 0 24 24", className };

  switch (name) {
    case "search":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <line x1="20" y1="20" x2="15.3" y2="15.3" />
        </svg>
      );
    case "user":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="7.5" r="3.5" />
          <path d="M4.5 20.5c1-4 4-6 7.5-6s6.5 2 7.5 6" />
        </svg>
      );
    case "heart":
      return filled ? (
        <svg {...common} fill={stroke} stroke="none">
          <path d="M12 20.5s-7.5-4.6-10-9.3C.4 8 1.8 4.5 5.2 3.6c2-.5 4 .3 5.3 2 1.3-1.7 3.3-2.5 5.3-2 3.4.9 4.8 4.4 3.2 7.6-2.5 4.7-10 9.3-10 9.3z" />
        </svg>
      ) : (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20.5s-7.5-4.6-10-9.3C.4 8 1.8 4.5 5.2 3.6c2-.5 4 .3 5.3 2 1.3-1.7 3.3-2.5 5.3-2 3.4.9 4.8 4.4 3.2 7.6-2.5 4.7-10 9.3-10 9.3z" />
        </svg>
      );
    case "bag":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 8h12l1 12.5a1 1 0 0 1-1 1.5H6a1 1 0 0 1-1-1.5L6 8Z" />
          <path d="M9 8V6a3 3 0 0 1 6 0v2" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round">
          <line x1="3.5" y1="6.5" x2="20.5" y2="6.5" />
          <line x1="3.5" y1="12" x2="20.5" y2="12" />
          <line x1="3.5" y1="17.5" x2="20.5" y2="17.5" />
        </svg>
      );
    case "close":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round">
          <line x1="5" y1="5" x2="19" y2="19" />
          <line x1="19" y1="5" x2="5" y2="19" />
        </svg>
      );
    case "chevron-left":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="14.5,5 7.5,12 14.5,19" />
        </svg>
      );
    case "chevron-right":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9.5,5 16.5,12 9.5,19" />
        </svg>
      );
    case "chevron-down":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="5,9.5 12,16.5 19,9.5" />
        </svg>
      );
    case "chevron-up":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="5,14.5 12,7.5 19,14.5" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      );
    case "minus":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round">
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      );
    case "check":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="5,12.5 9.5,17 19,6" />
        </svg>
      );
    case "info":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="8.5" />
          <line x1="12" y1="11" x2="12" y2="16.5" />
          <circle cx="12" cy="7.8" r="0.9" fill={stroke} stroke="none" />
        </svg>
      );
    case "zoom":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round">
          <circle cx="10.5" cy="10.5" r="6.5" />
          <line x1="20" y1="20" x2="15.3" y2="15.3" />
          <line x1="10.5" y1="7.8" x2="10.5" y2="13.2" />
          <line x1="7.8" y1="10.5" x2="13.2" y2="10.5" />
        </svg>
      );
    case "truck":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <rect x="1.5" y="7" width="12" height="9" rx="1" />
          <path d="M13.5 10h4l3.5 3v3h-7.5z" />
          <circle cx="6" cy="18.5" r="1.8" />
          <circle cx="16.5" cy="18.5" r="1.8" />
        </svg>
      );
    case "shield-check":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2.5 19.5 5.5V11c0 5-3.2 8.5-7.5 10.5C7.7 19.5 4.5 16 4.5 11V5.5Z" />
          <polyline points="8.8,12 11,14.3 15.3,9.5" />
        </svg>
      );
    case "box":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8 12 4l9 4-9 4-9-4Z" />
          <path d="M3 8v8l9 4 9-4V8" />
          <line x1="12" y1="12" x2="12" y2="20" />
        </svg>
      );
    case "headset":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
          <rect x="2.5" y="13" width="4" height="6" rx="1.3" />
          <rect x="17.5" y="13" width="4" height="6" rx="1.3" />
          <path d="M19.5 19.5v1a2.5 2.5 0 0 1-2.5 2.5h-2.5" />
        </svg>
      );
    case "medal":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 2.5 5 9l4 2" />
          <path d="M16 2.5 19 9l-4 2" />
          <circle cx="12" cy="14.5" r="7" />
          <path d="M12 10.8 13 13.6 16 13.8 13.6 15.7 14.4 18.6 12 16.9 9.6 18.6 10.4 15.7 8 13.8 11 13.6Z" />
        </svg>
      );
    case "credit-card":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="9.5" x2="22" y2="9.5" />
          <line x1="5" y1="15" x2="9" y2="15" />
        </svg>
      );
    case "smartphone":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="2.5" width="12" height="19" rx="2.2" />
          <line x1="10.5" y1="18.2" x2="13.5" y2="18.2" />
        </svg>
      );
    case "cash":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <rect x="1.5" y="6" width="21" height="12" rx="1.5" />
          <circle cx="12" cy="12" r="3" />
          <line x1="5" y1="9" x2="5" y2="9.01" />
          <line x1="19" y1="15" x2="19" y2="15.01" />
        </svg>
      );
    case "phone":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5.5 3.5h3L10 8l-2 1.5a12 12 0 0 0 6.5 6.5L16 14l4.5 1.5v3a1.5 1.5 0 0 1-1.6 1.5A17 17 0 0 1 4 5.1a1.5 1.5 0 0 1 1.5-1.6Z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9.5" />
          <path d="M14 8.5h-1.5A1.5 1.5 0 0 0 11 10v1.5H9V14h2v7h2.5v-7h2l.3-2.5H13.5V10c0-.3.2-.5.5-.5H14Z" fill={stroke} stroke="none" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1" fill={stroke} stroke="none" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 3v10.8a3.2 3.2 0 1 1-3.2-3.2c.3 0 .5 0 .8.1" />
          <path d="M14 3c.3 2.3 2 4 4.3 4.2" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="5.5" width="20" height="13" rx="3.5" />
          <path d="M10.5 9.5v5l4.5-2.5Z" fill={stroke} stroke="none" />
        </svg>
      );
    case "home":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 10.5 12 4l8 6.5" />
          <path d="M5.5 9.5V20h13V9.5" />
          <path d="M9.5 20v-6h5v6" />
        </svg>
      );
    case "download":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3.5v11" />
          <polyline points="7.5,10.5 12,15 16.5,10.5" />
          <path d="M4.5 16.5v2a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-2" />
        </svg>
      );
    case "logout":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 4.5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h3" />
          <polyline points="14,8 18,12 14,16" />
          <line x1="18" y1="12" x2="8.5" y2="12" />
        </svg>
      );
    case "grid":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="round">
          <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
          <rect x="13.5" y="13.5" width="7" height="7" rx="1" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <polyline points="12,7 12,12 16,14.5" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <rect x="2.5" y="5" width="19" height="14" rx="2" />
          <polyline points="3,6.5 12,13 21,6.5" />
        </svg>
      );
    case "map-pin":
      return (
        <svg {...common} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21.5s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12Z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
      );
    default:
      return null;
  }
}
