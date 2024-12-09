/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback } from "react";
import { ColorPickerComponent } from "./ColorPicker";
import { ColorVariantButton } from "./ColorVariantButton";
import { ColorFormatSelector } from "./ColorFormatSelector";
import { ColorVariant, ColorVariantsProps, ColorFormat } from "../types/color";
import IconCopy from "./IconCopy";
import { ColorCodeBlock } from "./ColorCodeBlock";
import { generateColorVariants } from "../utils/colorVarientsGenerator";

const ColorVariants: React.FC<ColorVariantsProps> = ({
  baseColor: initBaseColor,
  colorName: initColorName,
}) => {
  const [baseColor, setBaseColor] = useState<string>(initBaseColor);
  const [colorName, setColorName] = useState<string>(initColorName);
  const [variableName, setVariableName] = useState<string>("color");
  const [copiedColors, setCopiedColors] = useState<Set<string>>(new Set());
  const [isPickerVisible, setPickerVisible] = useState<boolean>(false);
  const [colorFormat, setColorFormat] = useState<ColorFormat>("hex");

  const colorVariants = generateColorVariants(baseColor, colorName);

  const getColorValue = useCallback(
    (variant: ColorVariant) => {
      switch (colorFormat) {
        case "rgb":
          return variant.rgb;
        case "oklch":
          return variant.oklch;
        default:
          return variant.hex;
      }
    },
    [colorFormat]
  );

  const handleSingleCopy = useCallback(
    (variant: ColorVariant) => {
      const colorValue = getColorValue(variant);
      navigator.clipboard.writeText(
        `${variant.label.toLowerCase().replace(/\s+/g, "-")}: ${colorValue};`
      );
      setCopiedColors(new Set([variant.value]));
      setTimeout(() => setCopiedColors(new Set()), 3000);
    },
    [getColorValue]
  );

  const handleCopyAll = useCallback(() => {
    const allColors = colorVariants.map((variant) => variant.value);
    const colorString = colorVariants
      .map(
        (variant) =>
          `${variant.label.toLowerCase().replace(/\s+/g, "-")}: ${getColorValue(
            variant
          )};`
      )
      .join("\n");

    navigator.clipboard.writeText(colorString);
    setCopiedColors(new Set(allColors));
    setTimeout(() => setCopiedColors(new Set()), 3000);
  }, [colorVariants, getColorValue]);

  const handleColorChange = useCallback((color: { hex: string }) => {
    setBaseColor(color.hex);
  }, []);

  return (
    <div className="bg-white w-fit flex p-5 gap-4 rounded-3xl flex-wrap lg:flex-nowrap lg:justify-center">
      <div className="w-full">
        <div className="py-4 flex gap-4 w-full flex-col">
          <label className="space-y-4 flex flex-col justify-center w-full">
            <div className="flex gap-2 items-center justify-center relative">
              <ColorPickerComponent
                color={baseColor}
                onChange={handleColorChange}
                isVisible={isPickerVisible}
                onToggle={() => setPickerVisible(!isPickerVisible)}
              />
              <input
                type="text"
                placeholder="Colors hex code"
                // value={baseColor}
                onChange={(e) => setBaseColor(e.target.value)}
                className="bg-slate-100 shrink text-secondary rounded-xl py-3 px-2 border border-slate-300 w-max"
              />
              <input
                type="text"
                placeholder="Color Name eg: red or yellow"
                // value={colorName}
                onChange={(e) => setColorName(e.target.value)}
                className="bg-slate-100 grow text-secondary rounded-xl py-3 px-2 border border-slate-300 w-max"
              />
            </div>
          </label>
          <ColorFormatSelector
            selectedFormat={colorFormat}
            onChange={setColorFormat}
          />
        </div>

        <ul className="w-full mb-2">
          <label htmlFor="Given Color" className="pb-2">
            Given Color
          </label>
          <li key="9">
            <ColorVariantButton
              variant={colorVariants[8]}
              isCopied={copiedColors.has(colorVariants[8].value)}
              onClick={() => handleSingleCopy(colorVariants[8])}
              displayValue={getColorValue(colorVariants[8])}
            />
          </li>
        </ul>

        <label htmlFor="Color Variants" className="pb-2 w-full">
          Color Variants
        </label>
        <div className="flex gap-4 w-full">
          <ul className="w-full space-y-2">
            {colorVariants.slice(0, 7).map((variant, index) => (
              <li key={index}>
                <ColorVariantButton
                  variant={variant}
                  isCopied={copiedColors.has(variant.value)}
                  onClick={() => handleSingleCopy(variant)}
                  displayValue={getColorValue(variant)}
                />
              </li>
            ))}
          </ul>

          <ul className="w-full space-y-2">
            {colorVariants.slice(8, 15).map((variant, index) => (
              <li key={index + 10}>
                <ColorVariantButton
                  variant={variant}
                  isCopied={copiedColors.has(variant.value)}
                  onClick={() => handleSingleCopy(variant)}
                  displayValue={getColorValue(variant)}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleCopyAll}
          className="flex justify-center items-center gap-4 w-full mt-4 py-4 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
        >
          Copy All <IconCopy className="size-6" />
        </button>
      </div>
      <div className="w-full h-full py-4">
        <input
          type="text"
          placeholder="Change Variable Name eg: color or primary"
          // value={variableName}
          onChange={(e) => setVariableName(e.target.value)}
          className="bg-slate-100 grow text-secondary rounded-xl py-3 px-2 border border-slate-300 w-full mb-4"
        />
        <ColorCodeBlock
          variants={colorVariants}
          colorFormat={colorFormat}
          colorName={colorName}
          className={`lg:min-w-max lg:w-full`}
          variableName={variableName}
        />
      </div>
    </div>
  );
};

export default ColorVariants;
