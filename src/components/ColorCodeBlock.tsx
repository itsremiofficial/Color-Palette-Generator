import React, { useMemo, useState } from "react";
import { ColorVariant } from "../types/color";
import { IconTickCircle } from "./IconTickCircle";
import IconCopy from "./IconCopy";

interface ColorCodeBlockProps {
  variants: ColorVariant[];
  colorFormat: "hex" | "rgb" | "oklch";
  colorName: string;
  className: string;
  variableName: string;
}

export const ColorCodeBlock: React.FC<ColorCodeBlockProps> = ({
  variants,
  colorName,
  className,
  variableName
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const formattedVariables = useMemo(() => {
    return variants
      .map((variant, index) => {
        // Dynamically assign --color1, --color2, ... and use colorName in the format var(--colorName-100)
        const colorSuffix = (index + 1) * 100; // For example: 100, 200, 300, etc.
        return `--${variableName}${index + 1}: var(--${colorName
          .toLowerCase()
          .replace(/\s+/g, "-")}-${colorSuffix});`; // Using colorName dynamically
      })
      .join("\n");
  }, [variants, colorName]); // Including colorName in the dependency array

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedVariables);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  const threecircle = variants[9].hex;
  const lines = formattedVariables.split("\n");
  const codeBlock = lines
    .map((line, i) => {
      const variant = variants[i];
      return `<pre><span style="background-color: ${variant.hex};"></span><code>${line}</code></pre>`;
    })
    .join("");

  return (
    <div className={`mockup-code relative w-full ${className}`}>
      <div className="relative flex gap-2 px-5 pb-6">
        {Array(3)
          .fill(null)
          .map((_, index) => (
            <span
              key={index}
              className="size-3 rounded-full"
              style={{ backgroundColor: threecircle }}
            ></span>
          ))}
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: codeBlock }}
        className="pr-16 pt-5"
      />
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-xl text-sm flex items-center gap-2 transition-colors uppercase text-[12px] font-bold"
      >
        {isCopied ? (
          <>
            Copied <IconTickCircle className="size-4" />
          </>
        ) : (
          <>
            Copy <IconCopy className="size-4" />
          </>
        )}
      </button>
    </div>
  );
};
