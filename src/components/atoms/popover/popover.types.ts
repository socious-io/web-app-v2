import { PopoverProps as MUIPopoverProps } from '@mui/material';

export type PopoverProps = {
  anchor: MUIPopoverProps['anchorEl'];
  open: boolean;
  onClose: () => void;
  menuList: { id: string | number; label: string; cb: () => void }[];
};
