import React from "react";
import { Check } from "lucide-react";

interface IconProps {
  className?: string;
  width?: number;
}

export const IconTickCircle: React.FC<IconProps> = ({ className, width }) => {
  return <Check className={className} strokeWidth={width} />;
};
