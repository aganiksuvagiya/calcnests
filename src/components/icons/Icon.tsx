interface IconProps {
  icon: string;
  className?: string;
}

const paths: Record<string, React.ReactNode> = {
  banknote: (
    <>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="3" />
      <path d="M6 12h.01M18 12h.01" />
    </>
  ),
  calculator: (
    <>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </>
  ),
  "graduation-cap": (
    <>
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
    </>
  ),
  home: (
    <>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5 10v10h14V10" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />
    </>
  ),
  flag: (
    <>
      <path d="M5 3v18" />
      <path d="M5 4h13l-2.5 4L18 12H5" />
    </>
  ),
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5" />
    </>
  ),
  zap: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  search: (
    <>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </>
  ),
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  percent: (
    <>
      <path d="M5 19 19 5" />
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </>
  ),
  "hand-coins": (
    <>
      <circle cx="9" cy="9" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18.09" />
      <path d="M9 6.8v4.4" />
      <path d="M7.2 9.3h3.6" />
    </>
  ),
  tag: (
    <>
      <path d="M12.59 2.59 20 10a2 2 0 0 1 0 2.83L13.83 19A2 2 0 0 1 11 19L3.59 11.59A2 2 0 0 1 3 10.17V4a1 1 0 0 1 1-1h6.17a2 2 0 0 1 1.42.59Z" />
      <path d="M7.5 6.5h.01" />
    </>
  ),
  "refresh-ccw": (
    <>
      <path d="M3 12a9 9 0 0 1 15.4-6.4L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15.4 6.4L3 16" />
      <path d="M3 21v-5h5" />
    </>
  ),
  copy: (
    <>
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1" />
    </>
  ),
  check: <path d="M20 6 9 17l-5-5" />,
  key: (
    <>
      <circle cx="7" cy="15" r="3.5" />
      <path d="m9.5 12.5 8-8" />
      <path d="M15 7l2.5 2.5M17.5 4.5 20 7" />
    </>
  ),
  landmark: (
    <>
      <path d="M3 21h18" />
      <path d="M5 21v-9M9.5 21v-9M14.5 21v-9M19 21v-9" />
      <path d="M2 10 12 4l10 6Z" />
    </>
  ),
  "trending-up": (
    <>
      <path d="M3 17 9 11l4 4 8-8" />
      <path d="M15 7h6v6" />
    </>
  ),
  wallet: (
    <>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <path d="M17 14.5h.01" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 2h12v20l-3-2-3 2-3-2-3 2Z" />
      <path d="M9 7h6M9 11h6M9 15h4" />
    </>
  ),
  "file-text": (
    <>
      <path d="M6 2h9l5 5v15H6Z" />
      <path d="M14 2v6h6" />
      <path d="M9 13h6M9 17h6" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.25" />
      <path d="M3.5 20c.5-3.5 2.7-6 5.5-6s5 2.5 5.5 6" />
      <circle cx="17.5" cy="9.5" r="2.25" />
      <path d="M15.3 20c.3-2.3 1.4-4.2 3-5" />
    </>
  ),
  sigma: <path d="M18 4H6l6 8-6 8h12" />,
  divide: (
    <>
      <circle cx="12" cy="6" r="1.5" fill="currentColor" stroke="none" />
      <path d="M5 12h14" />
      <circle cx="12" cy="18" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  pi: <path d="M4 6h16M7 6v13a3 3 0 0 0 3-3V6M17 6l-2 10.5c-.2 1-.9 2.5.5 2.5" />,
  cake: (
    <>
      <path d="M4 21v-6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6" />
      <path d="M2 21h20" />
      <path d="M8 12V9M12 12V9M16 12V9" />
      <path d="M8 9c0-1 1-1 1-2s-1-1-1-2M12 9c0-1 1-1 1-2s-1-1-1-2M16 9c0-1 1-1 1-2s-1-1-1-2" />
    </>
  ),
  "calendar-plus": (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="M12 14v6M9 17h6" />
    </>
  ),
  "clock-3": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5h4" />
    </>
  ),
  "calendar-range": (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="M8 14h2M14 14h2M8 18h2" />
    </>
  ),
  hourglass: (
    <>
      <path d="M6 2h12M6 22h12" />
      <path d="M6 2c0 6 5 6.5 5 10s-5 4-5 10M18 2c0 6-5 6.5-5 10s5 4 5 10" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="m9 13.5-2 7 5-3 5 3-2-7" />
    </>
  ),
  "book-open": (
    <>
      <path d="M12 6c-2-1.5-5-2-8-1.5v13c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5v-13c-3-.5-6 0-8 1.5Z" />
      <path d="M12 6v13" />
    </>
  ),
  paintbrush: (
    <>
      <path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4Z" />
      <path d="M9 12 3 18c-1 1-1 3 0 3s3-1 3-2" />
    </>
  ),
  "layout-grid": (
    <>
      <rect x="3" y="3" width="8" height="8" rx="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1.5" />
    </>
  ),
  ruler: (
    <>
      <path d="M3 17 17 3l4 4L7 21Z" />
      <path d="m14 6 2 2M11 9l2 2M8 12l2 2M5 15l2 2" />
    </>
  ),
  activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
  fuel: (
    <>
      <path d="M4 22V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v15" />
      <path d="M3 22h12" />
      <path d="M14 9h2l3 3v6a1.5 1.5 0 0 1-3 0v-2a1.5 1.5 0 0 0-1.5-1.5H14" />
      <path d="M6 6h4" />
    </>
  ),
  "arrow-left-right": <path d="m8 3-5 5 5 5M3 8h18M16 13l5 5-5 5M21 18H3" />,
  thermometer: (
    <>
      <path d="M14 4a2 2 0 0 0-4 0v10.5a4 4 0 1 0 4 0Z" />
      <path d="M12 9v5" />
    </>
  ),
  weight: (
    <>
      <circle cx="12" cy="6" r="3" />
      <path d="M6.5 9h11l2 12h-15Z" />
    </>
  ),
};

export function Icon({ icon, className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[icon] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}
