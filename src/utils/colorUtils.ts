// Color space conversion utilities
const sRGBToLinear = (value: number): number => {
  const v = value / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
};

const linearToOKLab = (
  r: number,
  g: number,
  b: number
): [number, number, number] => {
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;

  const l_ = Math.cbrt(l);
  const m_ = Math.cbrt(m);
  const s_ = Math.cbrt(s);

  return [
    0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
    1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
    0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_,
  ];
};

export const hexToRgb = (hex: string): [number, number, number] | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
};

export const rgbToHex = (r: number, g: number, b: number): string =>
  `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;

export const rgbToString = (r: number, g: number, b: number): string =>
  `rgb(${r}, ${g}, ${b})`;

export const hexToOklch = (hex: string): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return "";
  const [r, g, b] = rgb;

  // Convert sRGB to linear RGB
  const linearR = sRGBToLinear(r);
  const linearG = sRGBToLinear(g);
  const linearB = sRGBToLinear(b);

  // Convert to OKLab
  const [L, a, b_] = linearToOKLab(linearR, linearG, linearB);

  // Convert to LCH
  const C = Math.sqrt(a * a + b_ * b_);
  let H = (Math.atan2(b_, a) * 180) / Math.PI;
  if (H < 0) H += 360;

  // Scale values with appropriate chroma
  const scaledL = L * 100;
  const scaledC = C * 0.8; // Increased chroma scaling for better color matching

  return `oklch(${scaledL.toFixed(1)}% ${scaledC.toFixed(2)} ${H.toFixed(0)})`;
};

export const adjustOklch = (
  hex: string,
  target: "light" | "dark",
  percentage: number
): string => {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;

  const [r, g, b] = rgb;
  const linearR = sRGBToLinear(r);
  const linearG = sRGBToLinear(g);
  const linearB = sRGBToLinear(b);

  const [L, a, b_] = linearToOKLab(linearR, linearG, linearB);
  const C = Math.sqrt(a * a + b_ * b_);
  let H = (Math.atan2(b_, a) * 180) / Math.PI;
  if (H < 0) H += 360;

  let newL: number;
  let newC: number;
  const baseC = C * 0.8; // Match the base chroma scaling

  if (target === "light") {
    // Adjust lightness and chroma for lighter shades
    newL = L + (1 - L) * percentage;
    // Progressive chroma adjustment for lighter shades
    const chromaScale = Math.pow(1 - percentage, 0.5); // Slower chroma reduction
    newC = baseC * chromaScale;
  } else {
    // Adjust lightness and chroma for darker shades
    newL = L * (1 - percentage);
    // Maintain stronger chroma in darker shades
    const chromaScale = Math.pow(1 - percentage, 0.3); // Slower chroma reduction for darks
    newC = baseC * chromaScale;
  }

  // Scale values
  const scaledL = newL * 100;

  if (scaledL >= 99.9) return `oklch(100% 0 0)`; // Pure white
  if (scaledL <= 0.1) return `oklch(0% 0 0)`; // Pure black

  return `oklch(${scaledL.toFixed(1)}% ${newC.toFixed(2)} ${H.toFixed(0)})`;
};

export const adjustRGB = (
  r: number,
  g: number,
  b: number,
  target: "light" | "dark",
  percentage: number
): [number, number, number] => {
  if (target === "light") {
    return [
      Math.round(r + (255 - r) * percentage),
      Math.round(g + (255 - g) * percentage),
      Math.round(b + (255 - b) * percentage),
    ];
  }
  return [
    Math.round(r * (1 - percentage)),
    Math.round(g * (1 - percentage)),
    Math.round(b * (1 - percentage)),
  ];
};
