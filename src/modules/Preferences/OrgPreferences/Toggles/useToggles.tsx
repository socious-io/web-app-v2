import { ChangeEvent, useEffect, useState } from 'react';
import { PREFERENCES_TOGGLES } from 'src/constants/PREFERENCES';
import { Preference, PreferenceValue, updatePreferences } from 'src/core/api';

import { ToggleType } from './index.types';

export const useToggles = (preferences: Preference[]) => {
  const [currentTogglePreferences, setCurrentTogglePreferences] = useState<ToggleType[]>(PREFERENCES_TOGGLES);
  const mapToTogglePreferences = (newPreferences: Preference[]) => {
    return PREFERENCES_TOGGLES.map(toggle => {
      const hasTogglePreferences = newPreferences.find(preference => preference.title === toggle.key);
      return hasTogglePreferences ? { ...toggle, value: hasTogglePreferences.value } : toggle;
    });
  };

  useEffect(() => {
    setCurrentTogglePreferences(mapToTogglePreferences(preferences));
  }, [preferences]);

  const handleCheckToggles = (name: string, checked: boolean) => {
    const updatedTogglePreferences = currentTogglePreferences.map(toggle =>
      toggle.key === name ? { ...toggle, value: checked ? 'ON' : 'OFF' } : toggle,
    );
    setCurrentTogglePreferences(updatedTogglePreferences);
  };

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const preferences: Preference[] = currentTogglePreferences.map(toggle => ({
      title: toggle.key,
      value: toggle.value as PreferenceValue,
    }));

    try {
      await updatePreferences({ preferences });
    } catch (e) {
      console.log('error in updating toggle preferences', e);
    }
  };

  return {
    data: { currentTogglePreferences },
    operations: { handleCheckToggles, onSubmit },
  };
};
