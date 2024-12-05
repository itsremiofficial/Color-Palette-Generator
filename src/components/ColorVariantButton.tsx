import React from "react";
import { ColorDot } from "./ColorDot";
import { CopyNotification } from "./CopyNotification";
import { ColorVariant } from "../types/color";
import IconCopy from "./IconCopy";

interface ColorVariantButtonProps {
  variant: ColorVariant;
  isCopied: boolean;
  onClick: () => void;
  displayValue: string;
}

export const ColorVariantButton: React.FC<ColorVariantButtonProps> = ({
  variant,
  isCopied,
  onClick,
  displayValue,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center py-3 pl-3 pr-12 bg-slate-100 hover:bg-slate-200 transition-colors duration-500 rounded-xl w-full relative text-secondary group"
    >
      <ColorDot color={variant.hex} />
      <div className="flex flex-col items-start">
        <span className="whitespace-nowrap text-sm font-medium">
          {variant.label.toLowerCase().replace(/\s+/g, "-")}
        </span>
        <IconCopy className="absolute top-1/2 right-2 transform -translate-y-1/2 text-slate-400 size-5" />
        <span className="text-xs text-slate-400 font-mono whitespace-nowrap">
          {displayValue}
        </span>
      </div>
      <CopyNotification show={isCopied} />
    </button>
  );
};
