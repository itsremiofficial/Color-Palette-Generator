export type ColorFormat = "hex" | "rgb" | "oklch";

export type ColorVariant = {
  value: string;
  label: string;
  hex: string;
  rgb: string;
  oklch: string;
};

export interface ColorVariantsProps {
  baseColor: string;
  colorName: string;
}

export interface ColorFormatSelectorProps {
  selectedFormat: ColorFormat;
  onChange: (format: ColorFormat) => void;
}
