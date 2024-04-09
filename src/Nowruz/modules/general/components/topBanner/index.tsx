import React, { ReactNode } from 'react';
import variables from 'src/components/_exports.module.scss';
import { FeaturedIconOutlined } from '../featuredIconOutlined';
import { Button } from '../Button';

interface TopBannerProps {
  theme: 'success' | 'warning';
  primaryBtnLabel?: string;
  primaryBtnAction?: () => void;
  secondaryBtnLabel?: string;
  primaryBtnIcon?: ReactNode;
  secondaryBtnAction?: () => void;
  text: string;
  supportingText: string;
}
export const TopBanner: React.FC<TopBannerProps> = ({
  theme,
  primaryBtnAction,
  primaryBtnLabel,
  primaryBtnIcon,
  secondaryBtnLabel,
  secondaryBtnAction,
  text,
  supportingText,
}) => {
  const bgColor =
    theme === 'warning' ? variables.color_warning_25 : theme === 'success' ? variables.color_success_25 : '';
  const borderBottomColor =
    theme === 'warning' ? variables.color_warning_300 : theme === 'success' ? variables.color_success_300 : '';
  const textColor =
    theme === 'warning' ? variables.color_warning_700 : theme === 'success' ? variables.color_success_700 : '';
  return (
    <div
      className="w-full p-4 md:px-8 md:py-0  flex flex-col md:flex-row md:items-center"
      style={{ backgroundColor: bgColor, borderBottom: `1px solid ${borderBottomColor}` }}
    >
      <div className="w-fit h-fit mb-1 md:mb-0 md:mr-4">
        <FeaturedIconOutlined
          theme={theme}
          iconName={theme === 'warning' ? 'alert-circle' : 'check-circle'}
          size="md"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-[2px] md:gap-1.5">
        <span className="text-sm font-semibold leading-5" style={{ color: textColor }}>
          {text}
        </span>
        <span className="text-sm font-normal leading-5" style={{ color: textColor }}>
          {supportingText}
        </span>
      </div>
      <div className="md:mr-0 md:ml-auto flex gap-2">
        {!!secondaryBtnLabel && (
          <Button
            variant="text"
            color="error"
            customStyle={`${
              theme === 'warning' ? 'text-Warning-600' : theme === 'success' ? 'text-Success-600' : ''
            }  p-0`}
            onClick={secondaryBtnAction}
          >
            {secondaryBtnLabel}
          </Button>
        )}
        {!!primaryBtnLabel && (
          <Button
            variant="text"
            color="error"
            customStyle={`${
              theme === 'warning' ? 'text-Warning-700' : theme === 'success' ? 'text-Success-700' : ''
            }  flex gap-2 items-center`}
            onClick={primaryBtnAction}
          >
            {primaryBtnLabel}
            {!!primaryBtnIcon && primaryBtnIcon}
          </Button>
        )}
      </div>
    </div>
  );
};
