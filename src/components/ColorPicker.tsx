/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { ColorPicker as ReactColorPicker, useColor } from "react-color-palette";

interface ColorPickerProps {
  color: string;
  onChange: (color: any) => void;
  isVisible: boolean;
  onToggle: () => void;
}

export const ColorPickerComponent: React.FC<ColorPickerProps> = ({
  color,
  onChange,
  isVisible,
  onToggle,
}) => {
  const [colorState, setColorState] = useColor(color);

  const handleChange = (newColor: any) => {
    setColorState(newColor);
    onChange(newColor);
  };

  return (
    <div className="relative">
      <div
        className="size-14 rounded-full cursor-pointer border-2 border-slate-200 hover:border-slate-300 transition-colors"
        style={{ backgroundColor: color }}
        onClick={onToggle}
      />
      {isVisible && (
        <div
          className="absolute z-10 mt-2 w-72 custom-picker"
          style={{ top: "48px", left: "0" }}
        >
          <ReactColorPicker
            color={colorState}
            onChange={handleChange}
            hideInput={["hex", "hsv"]}
          />
        </div>
      )}
    </div>
  );
};
