import { ColorVariant } from "../types/color";
import {
  hexToRgb,
  rgbToHex,
  rgbToString,
  hexToOklch,
  adjustRGB,
  adjustOklch,
} from "./colorUtils";

export const generateColorVariants = (
  color: string,
  colorName: string
): ColorVariant[] => {
  const rgb = hexToRgb(color);
  if (!rgb) return [];
  const [r, g, b] = rgb;

  const variants: ColorVariant[] = [];

  // Generate lighter variants
  const lightVariantSteps = [100, 200, 300, 400, 500, 600, 700];
  lightVariantSteps.forEach((step, index) => {
    const percentage =
      (lightVariantSteps.length - index) / lightVariantSteps.length;
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
      label: `--${colorName}-${step}`,
      hex: hexValue,
      rgb: rgbToString(adjustedR, adjustedG, adjustedB),
      oklch: adjustOklch(hexValue, "light", percentage),
    });
  });

  // Add base color variant without number
  variants.push({
    value: color,
    label: `--${colorName}`,
    hex: color,
    rgb: rgbToString(r, g, b),
    oklch: hexToOklch(color),
  });

  // Generate darker variants
  const darkVariantSteps = [900, 1000, 1100, 1200, 1300, 1400, 1500];
  darkVariantSteps.forEach((step, index) => {
    const percentage = (index + 1) / darkVariantSteps.length;
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
      label: `--${colorName}-${step}`,
      hex: hexValue,
      rgb: rgbToString(adjustedR, adjustedG, adjustedB),
      oklch: adjustOklch(hexValue, "dark", percentage),
    });
  });

  return variants;
};
