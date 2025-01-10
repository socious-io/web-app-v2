import { event } from 'cypress/types/jquery';
import { useState, useRef, useEffect } from 'react';
import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import { Dot } from 'src/modules/general/components/dot';
import { Icon } from 'src/modules/general/components/Icon';
import { ToggleButton } from 'src/modules/general/components/toggleButton';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './statusDropDown.module.scss';

interface StatusDropDownProps {
  type: 'users' | 'organizations';
  openToWork: boolean;
  openToVolunteer: boolean;
  hiring: boolean;
  handleOpenToWork: () => void;
  handleOpenToVolunteer: () => void;
  handleHiring: () => void;
}
export const StatusDropDown: React.FC<StatusDropDownProps> = props => {
  const [open, setOpen] = useState(false);
  const { type, openToWork, openToVolunteer, hiring, handleHiring, handleOpenToVolunteer, handleOpenToWork } = props;
  const newRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });
  const handleOutsideClick = e => {
    if (newRef.current && !newRef.current.contains(e.target)) {
      if (open) {
        setOpen(!open);
      }
    }
  };
  return (
    <div className="w-full h-full flex flex-col items-end relative group" ref={newRef}>
      <Button variant="outlined" className={css.statusButton} color="primary" onClick={() => setOpen(!open)}>
        <Dot size="small" color={variables.color_success_500} shadow shadowColor={variables.color_success_100} />
        {translate('header-status')}
        <Icon name="chevron-down" fontSize={20} color={variables.color_grey_700} className="!cursor-pointer" />
      </Button>

      {open && (
        <div className={css.parentMenu}>
          <div className={css.menu}>
            {type === 'users' && (
              <>
                <div className={css.item}>
                  <ToggleButton checked={openToWork} onChange={handleOpenToWork} size="small" />
                  <div className="flex flex-col">
                    <p className={css.title}>{translate('header-open-to-work')}</p>
                    <p className={css.subtitle}>{translate('header-open-to-work-desc')}</p>
                  </div>
                </div>
                <div className={css.item}>
                  <ToggleButton checked={openToVolunteer} onChange={handleOpenToVolunteer} size="small" />
                  <div className="flex flex-col">
                    <p className={css.title}>{translate('header-volunteer')}</p>
                    <p className={css.subtitle}>{translate('header-volunteer-desc')}</p>
                  </div>
                </div>
              </>
            )}
            {type === 'organizations' && (
              <div className={css.item}>
                <ToggleButton checked={hiring} onChange={handleHiring} size="small" />
                <div className="flex flex-col">
                  <p className={css.title}>{translate('header-hiring')}</p>
                  <p className={css.subtitle}>{translate('header-hiring-desc')}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
