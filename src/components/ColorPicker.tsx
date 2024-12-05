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
        className="w-10 h-10 rounded-full cursor-pointer border-2 border-slate-300 hover:border-slate-400 transition-colors"
        style={{ backgroundColor: color }}
        onClick={onToggle}
      />
      {isVisible && (
        <div className="absolute z-10 mt-2" style={{ top: "48px", left: "0" }}>
          <ReactColorPicker color={colorState} onChange={handleChange} />
        </div>
      )}
    </div>
  );
};
