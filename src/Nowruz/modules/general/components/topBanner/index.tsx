import React, { ReactNode } from 'react';
import variables from 'src/components/_exports.module.scss';

import { Button } from '../Button';
import { FeaturedIconOutlined } from '../featuredIconOutlined';
import { Link } from '../link';

interface TopBannerProps {
  theme: 'success' | 'warning';
  primaryBtnLabel?: string;
  primaryBtnAction?: () => void;
  secondaryBtnLabel?: string;
  secondaryBtnLink?: string;
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
  secondaryBtnLink,
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
      className="w-full pb-2 p-4  xl:px-6 xl:py-1 flex flex-col xl:flex-row xl:items-center justify-between gap-2"
      style={{ backgroundColor: bgColor, borderBottom: `1px solid ${borderBottomColor}` }}
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
          <span className="text-sm font-semibold leading-5" style={{ color: textColor }}>
            {text}
          </span>
          <span className="text-sm font-normal leading-5" style={{ color: textColor }}>
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
              color="error"
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
            color="error"
            customStyle={`!font-semibold !text-sm leading-5 ${
              theme === 'warning' ? 'text-Warning-700' : theme === 'success' ? 'text-Success-700' : ''
            }  flex gap-2 items-center p-0`}
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
