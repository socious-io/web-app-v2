export type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  onClick?: () => void;
  onClickCapture?: React.MouseEventHandler<any>;
  color?: 'blue' | 'red' | 'white' | 'primary';
  size?: 's' | 'm' | 'l';
  icon?: string;
  type?: 'submit' | 'reset' | 'button' | undefined;
  weight?: "normal" | "medium" | "bold" | "heavy";
  removeBorder?: boolean;
};
