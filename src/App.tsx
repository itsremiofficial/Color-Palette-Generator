import { useState } from "react";
import ColorVariants from "./components/ColorVariants";

function App() {
  const [colorVariantCount, setColorVariantCount] = useState(1);
  return (
    <div className="!min-h-screen overflow-hidden !w-full !max-w-screen bg-slate-100">
      <div className="flex flex-col items-center py-8 px-4">
        <div className="homepage pt-32 pb-8 w-full flex justify-center">
          <button
            className="mt-4 py-3 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            onClick={() => setColorVariantCount(colorVariantCount + 1)}
          >
            Add Another Color Variant
          </button>
        </div>
        <div className="flex justify-center w-full gap-4 flex-wrap">
          {Array.from({ length: colorVariantCount }).map((_, index) => (
            <ColorVariants
              key={index}
              baseColor="#5865F2"
              colorName="Enter Color Name"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
