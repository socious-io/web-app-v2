export interface StepperCardProps {
  iconName?: string;
  title?: string;
  subtitle?: string;
  supprtingText?: string;
  editable?: boolean;
  editFunc?: () => void;
  deletable?: boolean;
  deleteFunc?: () => void;
  description?: string;
  seeMore?: boolean;
}
