export interface StepperCardProps {
  iconName?: string;
  img?: string;
  title?: string;
  subtitle?: string;
  supprtingText?: string;
  editable?: boolean;
  editFunc?: () => void;
  deletable?: boolean;
  deleteFunc?: () => void;
  description?: string;
  handleEdit?: () => void;
  handleDelete?: () => void;
  verified?: boolean;
}
