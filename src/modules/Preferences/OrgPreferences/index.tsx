import { Divider } from '@mui/material';
import CultureAccordions from 'src/modules/Preferences/OrgPreferences/CultureAccordions';

import css from './index.module.scss';
import Toggles from './Toggles';
import { useOrgPreferences } from './useOrgPreferences';

const OrgPreferences = () => {
  const { preferences } = useOrgPreferences();

  return (
    <>
      <div className={css['header']}>
        <h1 className={css['header__title']}>Preferences</h1>
        <h2 className={css['header__subtitle']}>Add your details to help us match you with the perfect talent</h2>
      </div>
      <Divider />
      <Toggles preferences={preferences} />
      <CultureAccordions preferences={preferences} />
    </>
  );
};

export default OrgPreferences;
