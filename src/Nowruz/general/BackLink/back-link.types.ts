import { TypographyProps } from '@mui/material';

export interface BackLinkProps extends TypographyProps {
  title: string;
  onBack?: () => void;
  textStyle?: string;
}
