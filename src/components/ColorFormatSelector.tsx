import React from "react";
import { ColorFormat, ColorFormatSelectorProps } from "../types/color";
import { IconTickCircle } from "./IconTickCircle";

export const ColorFormatSelector: React.FC<ColorFormatSelectorProps> = ({
  selectedFormat,
  onChange,
}) => {
  const formats: {
    value: ColorFormat;
    label: string;
    notification?: number;
  }[] = [
    { value: "hex", label: "HEX" },
    { value: "rgb", label: "RGB" },
    { value: "oklch", label: "OKLCH" },
  ];

  return (
    <div className="container">
      <div className="tabs flex relative justify-center gap-4">
        {formats.map(({ value, label }, index) => (
          <React.Fragment key={value}>
            <input
              type="radio"
              id={`radio-${value}`}
              name="tabs"
              checked={selectedFormat === value}
              onChange={() => onChange(value)}
              className="hidden peer"
            />
            <label
              htmlFor={`radio-${value}`}
              id={"radio-" + (index + 1)}
              className={`bg-slate-100 hover:bg-slate-300 px-10 py-2 select-none rounded-xl cursor-pointer flex grow justify-center font-semibold relative border border-transparent !transition-color !duration-500 ${
                selectedFormat === value
                  ? "!bg-blue-500 !border-blue-500 text-white"
                  : ""
              }`}
            >
              {label}
              <IconTickCircle
                className={`absolute top-1/2 right-2 transform -translate-y-1/2 !transition-opacity !duration-500 bg-white/40 text-white rounded-full p-1 size-5 opacity-0 ${
                  selectedFormat === value ? "opacity-100" : ""
                }`}
                width={5}
              />
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
