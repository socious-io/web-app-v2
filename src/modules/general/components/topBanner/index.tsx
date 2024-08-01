import React, { ReactNode } from 'react';
import variables from 'src/styles/constants/_exports.module.scss';

import { Button } from '../Button';
import { FeaturedIconOutlined } from '../featuredIconOutlined';
import { Link } from '../link';

interface TopBannerProps {
  theme: 'success' | 'warning' | 'purple';
  primaryBtnLabel?: string;
  primaryBtnAction?: () => void;
  secondaryBtnLabel?: string;
  secondaryBtnLink?: string;
  primaryBtnIcon?: ReactNode;
  primaryButtonStyle?: string;
  secondaryBtnAction?: () => void;
  text: string;
  supportingText: string;
}
const colors = [
  {
    theme: 'warning',
    bgColor: variables.color_warning_25,
    borderColor: variables.color_warning_300,
    textColor: variables.color_warning_700,
  },
  {
    theme: 'success',
    bgColor: variables.color_success_25,
    borderColor: variables.color_success_300,
    textColor: variables.color_success_700,
  },
  {
    theme: 'purple',
    bgColor: variables.color_purple_50,
    borderColor: variables.color_purple_200,
    textColor: variables.color_purple_700,
  },
];

export const TopBanner: React.FC<TopBannerProps> = ({
  theme,
  primaryBtnAction,
  primaryBtnLabel,
  primaryBtnIcon,
  primaryButtonStyle,
  secondaryBtnLabel,
  secondaryBtnAction,
  secondaryBtnLink,
  text,
  supportingText,
}) => {
  const color = colors.find(c => c.theme === theme);
  return (
    <div
      className={`w-full pb-2 p-4 xl:px-6 ${theme === 'purple' ? 'xl:py-3' : 'xl:py-1'} flex flex-col xl:flex-row xl:items-center justify-between gap-2`}
      style={{ backgroundColor: color?.bgColor, borderBottom: `1px solid ${color?.borderColor}` }}
    >
      <div className="flex flex-col xl:flex-row  xl:items-center gap-4">
        <div className="w-fit h-fit">
          <FeaturedIconOutlined
            theme={theme}
            iconName={theme === 'warning' ? 'alert-circle' : 'check-circle'}
            size="md"
          />
        </div>
        <div className="flex flex-col xl:flex-row gap-[2px] xl:gap-1.5">
          <span className="text-sm font-semibold leading-5" style={{ color: color?.textColor }}>
            {text}
          </span>
          <span className="text-sm font-normal leading-5" style={{ color: color?.textColor }}>
            {supportingText}
          </span>
        </div>
      </div>
      <div className="flex gap-3 items-center">
        {!!secondaryBtnLabel &&
          (secondaryBtnLink ? (
            <Link
              label={secondaryBtnLabel}
              href={secondaryBtnLink}
              target="_blank"
              customStyle={`!text-sm !font-semibold !leading-5 ${
                theme === 'warning' ? '!text-Warning-600' : theme === 'success' ? '!text-Success-600' : ''
              }  p-0`}
            />
          ) : (
            <Button
              variant="text"
              color="inherit"
              customStyle={`font-semibold text-sm leading-5 ${
                theme === 'warning' ? 'text-Warning-600' : theme === 'success' ? 'text-Success-600' : ''
              }  p-0`}
              onClick={secondaryBtnAction}
            >
              {secondaryBtnLabel}
            </Button>
          ))}
        {!!primaryBtnLabel && (
          <Button
            variant="text"
            color="inherit"
            customStyle={`!font-semibold !text-sm leading-5 ${
              theme === 'warning' ? 'text-Warning-700' : theme === 'success' ? 'text-Success-700' : ''
            }  flex gap-2 items-center p-0 ${primaryButtonStyle}`}
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
