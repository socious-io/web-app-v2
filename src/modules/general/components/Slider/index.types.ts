import { SlideProps as MUISlideProps } from '@mui/material';

export interface SliderProps extends MUISlideProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  headerDivider?: boolean;
  containerClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
}
