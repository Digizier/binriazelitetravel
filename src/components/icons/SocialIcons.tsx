import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

/**
 * Official Facebook "f" Vector Icon
 */
export function FacebookIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

/**
 * Official Instagram Vector Icon
 */
export function InstagramIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

/**
 * Official TikTok Vector Icon
 */
export function TikTokIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .59.05.86.13V9.42a6.33 6.33 0 0 0-.86-.06A6.33 6.33 0 0 0 3 15.69a6.34 6.34 0 0 0 10.82 4.48c.03-.03.06-.06.09-.09.34-.36.63-.78.85-1.24.23-.46.35-.97.35-1.49V8.62a8.28 8.28 0 0 0 4.48 1.3v-3.23z" />
    </svg>
  );
}

/**
 * Official Authentic WhatsApp Vector Icon (Iconic Speech Bubble with Phone Handset)
 * Uses compound path fillRule="evenodd" so the telephone handset cutout renders cleanly
 * across any size, background or fill color.
 */
export function WhatsAppIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.95.55 3.77 1.5 5.32L2 22l4.82-1.46c1.5.84 3.23 1.33 5.08 1.33 5.52 0 10.004-4.48 10.004-10.004C21.904 6.48 17.524 2 12.004 2zm-4.32 4.151c-.24 0-.625.09-.95.445-.325.355-1.24 1.213-1.24 2.958s1.27 3.43 1.445 3.666c.176.237 2.457 3.937 6.064 5.362 2.99 1.18 3.597.945 4.246.885.648-.06 2.086-.853 2.38-1.677.295-.824.295-1.53.207-1.677-.088-.148-.324-.237-.678-.414s-2.086-1.03-2.41-1.148c-.324-.118-.56-.178-.796.177-.236.355-.915 1.148-1.121 1.385-.207.236-.413.266-.767.089-.354-.178-1.496-.552-2.85-1.76-1.054-.94-1.765-2.102-1.971-2.456-.207-.355-.022-.547.155-.724.16-.16.354-.414.53-.621.178-.207.236-.355.355-.592.118-.236.059-.444-.03-.621-.088-.178-.795-1.916-1.09-2.625-.286-.69-.577-.597-.795-.608-.206-.01-.442-.012-.678-.012z"
      />
    </svg>
  );
}

/**
 * Official Filled WhatsApp Icon Alias
 */
export const WhatsAppSolidIcon = WhatsAppIcon;
