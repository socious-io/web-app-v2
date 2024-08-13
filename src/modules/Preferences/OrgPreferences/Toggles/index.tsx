import { Divider } from '@mui/material';
import { Button } from 'src/modules/general/components/Button';
import { ToggleButton } from 'src/modules/general/components/toggleButton';

import css from './index.module.scss';
import { TogglesProps } from './index.types';
import { useToggles } from './useToggles';

const Toggles: React.FC<TogglesProps> = ({ preferences }) => {
  const {
    data: { currentTogglePreferences },
    operations: { handleCheckToggles, onSubmit },
  } = useToggles(preferences);

  return (
    <form className="pb-2" onSubmit={onSubmit}>
      {currentTogglePreferences.map((toggle, index) => (
        <>
          <div key={toggle.key} className={css['toggle']}>
            <div className={css['toggle__header']}>
              {toggle.title}
              <span className={css['toggle__subheader']}>{toggle.subtitle}</span>
            </div>
            <ToggleButton
              name={toggle.key}
              checked={toggle.value === 'ON'}
              size="small"
              onChange={e => handleCheckToggles(toggle.key, e.target.checked)}
            />
          </div>
          {index === 0 && <Divider />}
        </>
      ))}
      <div className="flex justify-end">
        <Button variant="contained" color="primary" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default Toggles;
