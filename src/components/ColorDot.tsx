import React from 'react';

interface ColorDotProps {
  color: string;
}

export const ColorDot: React.FC<ColorDotProps> = ({ color }) => (
  <div
    className="w-8 h-8 rounded-full mr-2"
    style={{ backgroundColor: color }}
  />
);