import React, { useState } from "react";
import { ColorVariant } from "../types/color";
import { IconTickCircle } from "./IconTickCircle";
import IconCopy from "./IconCopy";

interface ColorCodeBlockProps {
  variants: ColorVariant[];
  colorFormat: "hex" | "rgb" | "oklch";
  colorName: string;
}

export const ColorCodeBlock: React.FC<ColorCodeBlockProps> = ({
  variants,
  colorFormat,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const getFormattedVariables = (): string => {
    return variants
      .map(
        (variant) =>
          `${variant.label.toLowerCase().replace(/\s+/g, "-")}: ${
            variant[colorFormat]
          };`
      )
      .join("\n");
  };

  // Function to handle copying to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(getFormattedVariables());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Get the formatted variables and split into lines
  const formattedVariables = getFormattedVariables();
  const lines = formattedVariables.split("\n");

  // Build the desired code block
  const codeBlock = lines
    .map(
      (line, index) => `
<pre data-prefix="${index + 1}" className="">
  <code>${line}</code>
</pre>
`
    )
    .join("");

  return (
    <div className="mockup-code relative mt-10 mb-5 w-full">
      <div dangerouslySetInnerHTML={{ __html: codeBlock }} />
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
