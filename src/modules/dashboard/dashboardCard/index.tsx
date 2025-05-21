import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';

import css from './dashboardCard.module.scss';

interface DashboardCardProps {
  title: string;
  description: string;
  bgColor: string;
  redirectUrl: string;
  buttonLabel: string;
  buttonIcon?: string;
  supportingText1?: string;
  supportingText2?: string;
  customRedirectTitle?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  bgColor,
  redirectUrl,
  buttonLabel,
  buttonIcon,
  supportingText1,
  supportingText2,
  customRedirectTitle
}) => {
  const navigate = useNavigate();
  return (
    <div className={css.card} style={{ backgroundColor: bgColor }}>
      <div className="flex flex-col gap-1">
        <span className="text-lg font-semibold leading-7 text-Gray-light-mode-900">{title}</span>
        <span className="text-sm font-normal leading-5 text-Gray-light-mode-600">{description}</span>
      </div>
      <div className="flex flex-col gap-1">
        {!!supportingText1 && <span className="text-sm font-semibold text-Gray-light-mode-900">{supportingText1}</span>}
        {!!supportingText2 && <span className="text-sm font-semibold text-Gray-light-mode-900">{supportingText2}</span>}
      </div>
      <div className="mr-0 ml-auto">
        <Button data-testid="card-button" variant="outlined" color="primary" onClick={() =>
          navigate(redirectUrl, {
            state: {
              customTitle: customRedirectTitle,
            },
          })
        } customStyle="flex gap-2">
          {!!buttonIcon && <Icon name={buttonIcon} fontSize={20} className="text-Gray-light-mode-500" />}
          {buttonLabel}
        </Button>
      </div>
    </div>
  );
};
