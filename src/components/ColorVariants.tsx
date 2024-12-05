import React, { useState, useCallback } from "react";
import { ColorPickerComponent } from "./ColorPicker";
import { ColorVariantButton } from "./ColorVariantButton";
import { ColorFormatSelector } from "./ColorFormatSelector";
import { ColorVariant, ColorVariantsProps, ColorFormat } from "../types/color";
import {
  hexToRgb,
  rgbToHex,
  rgbToString,
  hexToOklch,
  adjustRGB,
  adjustOklch,
} from "../utils/colorUtils";
import IconCopy from "./IconCopy";

const ColorVariants: React.FC<ColorVariantsProps> = ({
  baseColor: initBaseColor,
  colorName: initColorName,
}) => {
  const [baseColor, setBaseColor] = useState<string>(initBaseColor);
  const [colorName, setColorName] = useState<string>(initColorName);
  const [copiedColors, setCopiedColors] = useState<Set<string>>(new Set());
  const [isPickerVisible, setPickerVisible] = useState<boolean>(false);
  const [colorFormat, setColorFormat] = useState<ColorFormat>("hex");

  const generateColorVariants = useCallback(
    (color: string): ColorVariant[] => {
      const rgb = hexToRgb(color);
      if (!rgb) return [];
      const [r, g, b] = rgb;

      const variants: ColorVariant[] = [];

      // Generate lighter variants
      for (let i = 10; i >= 1; i--) {
        const percentage = i / 10;
        const [adjustedR, adjustedG, adjustedB] = adjustRGB(
          r,
          g,
          b,
          "light",
          percentage
        );
        const hexValue = rgbToHex(adjustedR, adjustedG, adjustedB);
        variants.push({
          value: hexValue,
          label: `--${colorName}-${500 - i * 50}`,
          hex: hexValue,
          rgb: rgbToString(adjustedR, adjustedG, adjustedB),
          oklch: adjustOklch(color, "light", percentage),
        });
      }

      // Add base color
      variants.push({
        value: color,
        label: `--${colorName}-500`,
        hex: color,
        rgb: rgbToString(r, g, b),
        oklch: hexToOklch(color),
      });

      // Generate darker variants
      for (let i = 1; i <= 10; i++) {
        const percentage = i / 10;
        const [adjustedR, adjustedG, adjustedB] = adjustRGB(
          r,
          g,
          b,
          "dark",
          percentage
        );
        const hexValue = rgbToHex(adjustedR, adjustedG, adjustedB);
        variants.push({
          value: hexValue,
          label: `--${colorName}-${500 + i * 50}`,
          hex: hexValue,
          rgb: rgbToString(adjustedR, adjustedG, adjustedB),
          oklch: adjustOklch(color, "dark", percentage),
        });
      }

      return variants;
    },
    [colorName]
  );

  const colorVariants = generateColorVariants(baseColor);

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

  const handleColorChange = useCallback((color: any) => {
    setBaseColor(color.hex);
  }, []);

  return (
    <div className="bg-white w-max flex flex-col items-center p-5 rounded-3xl ">
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
              placeholder="Enter a hex color code"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="bg-slate-100 shrink text-secondary rounded-xl py-3 px-2 border border-slate-300 w-max"
            />
            <input
              type="text"
              placeholder="Enter a hex color code"
              value={colorName}
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

      <div className="flex gap-4 w-full">
        <ul className="w-full space-y-2">
          {colorVariants.slice(0, 10).map((variant, index) => (
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
          {colorVariants.slice(10, 20).map((variant, index) => (
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
        className="flex justify-center items-center gap-4 w-full mt-4 py-3 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
      >
        Copy All <IconCopy className="size-6" />
      </button>
    </div>
  );
};

export default ColorVariants;
