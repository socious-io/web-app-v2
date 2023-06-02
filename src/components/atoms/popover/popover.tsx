import { ClickAwayListener, Menu, MenuItem, Typography } from '@mui/material';
import { PopoverProps } from './popover.types';

export const Popover = (props: PopoverProps) => (
  <Menu anchorEl={props.anchor} keepMounted open={props.open}>
    {props.menuList.map((item) => (
      <MenuItem key={item.id} onClick={item.cb}>
        <Typography textAlign="center">{item.label}</Typography>
      </MenuItem>
    ))}
  </Menu>
);
