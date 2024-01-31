import { SvgProps } from './svg.types';

export const Plus: React.FC<SvgProps> = ({ stroke, fill, width, height }) => {
  return (
    <svg
      width={`${width || 24}`}
      height={`${height || 24}`}
      viewBox="0 0 24 24"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5V19M5 12H19"
        stroke={stroke || 'black'}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
