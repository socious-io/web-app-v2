import { Tooltip as MUITooltip, TooltipProps, styled, tooltipClasses } from '@mui/material';
import React from 'react';
import variables from 'src/components/_exports.module.scss';

import { CustomTooltipProps } from './Tooltip.types';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <MUITooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: variables.color_sail_100,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: variables.color_white,
    color: variables.color_grey_900,
    fontSize: theme.typography.pxToRem(12),
    border: `1px solid ${variables.color_grey_50}`,
    borderRadius: `0.5rem`,
    boxShadow: `0px 4px 6px -2px rgba(16, 24, 40, 0.03), 0px 12px 16px -4px rgba(16, 24, 40, 0.08);`,
    padding: '.75rem',
  },
}));

const DarkTooltip = styled(({ className, ...props }: TooltipProps) => (
  <MUITooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: variables.color_grey_900,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: variables.color_grey_900,
    fontSize: theme.typography.pxToRem(12),
    border: `1px solid ${variables.color_grey_900}`,
    borderRadius: `0.5rem`,
    padding: '.75rem',
  },
}));

export const Tooltip = ({
  children,
  title,
  content,
  theme = 'dark',
  tipPosition = 'none',
}: CustomTooltipProps): React.JSX.Element => {
  const copyColor = () => (theme === 'dark' ? variables.color_white : variables.color_grey_900);

  const contentFragment = () => (
    <React.Fragment>
      <div>
        <div
          style={{
            marginBottom: '0.25rem',
            color: copyColor(),
            fontWeight: 700,
          }}
        >
          {title}
        </div>
        {!!content?.length && <p style={{ color: copyColor() }}>{content}</p>}
      </div>
    </React.Fragment>
  );

  return theme === 'light' ? (
    <LightTooltip
      title={contentFragment()}
      placement={tipPosition === 'none' ? 'bottom' : tipPosition}
      arrow={tipPosition === 'none' ? false : true}
    >
      <div>{children}</div>
    </LightTooltip>
  ) : (
    <DarkTooltip
      title={contentFragment()}
      placement={tipPosition === 'none' ? 'bottom' : tipPosition}
      arrow={tipPosition === 'none' ? false : true}
    >
      <div>{children}</div>
    </DarkTooltip>
  );
};
