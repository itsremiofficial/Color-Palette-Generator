import React from "react";
import { IconTickCircle } from "./IconTickCircle";

interface CopyNotificationProps {
  show: boolean;
}

export const CopyNotification: React.FC<CopyNotificationProps> = ({ show }) => {
  if (!show) return null;

  return (
    <span className="absolute bg-white text-[9px] leading-none uppercase font-bold py-1 px-2 right-2 flex w-max rounded-full text-green-600 items-center gap-1 shadow-sm">
      Copied <IconTickCircle className="size-3" />
    </span>
  );
};
