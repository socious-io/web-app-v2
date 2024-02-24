import { useState, useRef, useEffect } from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Dot } from 'src/Nowruz/modules/general/components/dot';
import { ToggleButton } from 'src/Nowruz/modules/general/components/toggleButton';

import css from './statusDropDown.module.scss';
import { event } from 'cypress/types/jquery';

interface StatusDropDownProps {
  type: 'users' | 'organizations';
  openToWork: boolean;
  openToVolunteer: boolean;
  hiring: boolean;
  handleOpenToWork: () => void;
  handleOpenToVolunteer: () => void;
  handleHiring: () => void;
}
export const StatusDropDown: React.FC<StatusDropDownProps> = (props) => {
  const [open, setOpen] = useState(false);
  const { type, openToWork, openToVolunteer, hiring, handleHiring, handleOpenToVolunteer, handleOpenToWork } = props;

  return (
    <div className="w-full h-full flex flex-col items-end relative group">
      <Button variant="outlined" className={css.statusButton} color="primary" 
        onMouseLeave={()=> setOpen(false)} onMouseOver={()=> setOpen(true)}
        onClick={() => setOpen(!open)}>
        <Dot size="small" color={variables.color_success_500} shadow shadowColor={variables.color_success_100} />
        Status
        <Icon name="chevron-down" fontSize={20} color={variables.color_grey_700} className="!cursor-pointer" />
      </Button>

      {open && (
        <div  className={css.parentMenu} onMouseLeave={()=> setOpen(false)} onMouseOver={()=> setOpen(true)}>
          <div className={css.menu}
          >
            {type === 'users' && (
              <>
                <div className={css.item}>
                  <ToggleButton checked={openToWork} onChange={handleOpenToWork} size="small" />
                  <div className="flex flex-col">
                    <p className={css.title}>Open to work</p>
                    <p className={css.subtitle}>You are available for paid jobs. You will be able to receive offers.</p>
                  </div>
                </div>
                <div className={css.item}>
                  <ToggleButton checked={openToVolunteer} onChange={handleOpenToVolunteer} size="small" />
                  <div className="flex flex-col">
                    <p className={css.title}>Open to volunteer</p>
                    <p className={css.subtitle}>You are available for volunteer jobs.</p>
                  </div>
                </div>
              </>
            )}
            {type === 'organizations' && (
              <div className={css.item}>
                <ToggleButton checked={hiring} onChange={handleHiring} size="small" />
                <div className="flex flex-col">
                  <p className={css.title}>Hiring</p>
                  <p className={css.subtitle}>You are currently actively hiring professionals.</p>
                </div>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};
