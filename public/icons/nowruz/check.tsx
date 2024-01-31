import { SvgProps } from './svg.types';

export const Check: React.FC<SvgProps> = ({ stroke, fill, width, height }) => {
  return (
    <svg
      width={`${width || 24}`}
      height={`${height || 24}`}
      viewBox="0 0 24 24"
      fill={fill || 'none'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 6L9 17L4 12"
        stroke={stroke || 'black'}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
