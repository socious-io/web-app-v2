import React from 'react';

interface DotProps {
  size: 'small' | 'medium' | 'large';
  color: string;
  shadow: boolean;
  shadowColor: string;
}
export const Dot: React.FC<DotProps> = (props) => {
  const { size, color, shadow, shadowColor } = props;
  let divSize = 0;
  switch (size) {
    case 'small':
      divSize = 2;
      break;
    case 'medium':
      divSize = 2.5;
      break;
    case 'large':
      divSize = 3;
      break;
  }
  return (
    <div
      className={`w-${divSize} h-${divSize} rounded-xl`}
      style={{ backgroundColor: color, boxShadow: shadow ? `0px 0px 0px 4px ${shadowColor}` : '' }}
    />
  );
};
