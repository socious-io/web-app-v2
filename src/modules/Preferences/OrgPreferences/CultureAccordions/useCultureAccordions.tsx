import { ChangeEvent, useEffect, useState } from 'react';
import { PREFERENCES_CULTURE_QUESTIONS } from 'src/constants/PREFERENCES';
import { Preference, PreferenceValue, updatePreferences } from 'src/core/api';
import { removedEmptyProps } from 'src/core/utils';

import { CultureType } from './index.types';

export const useCultureAccordions = (preferences: Preference[]) => {
  const limitDescription = 160;
  const [currentCulturePreferences, setCurrentCulturePreferences] =
    useState<CultureType[]>(PREFERENCES_CULTURE_QUESTIONS);
  const [letterCounts, setLetterCounts] = useState<Record<string, number> | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const mapToCulturePreferences = (newPreferences: Preference[]) => {
    return PREFERENCES_CULTURE_QUESTIONS.map(culture => {
      const hasCulturePreferences = newPreferences.find(preference => preference.title === culture.key);
      return hasCulturePreferences
        ? { ...culture, value: hasCulturePreferences.value, description: hasCulturePreferences.description }
        : culture;
    });
  };

  useEffect(() => {
    setCurrentCulturePreferences(mapToCulturePreferences(preferences));
  }, [preferences]);

  const onSelectCultureValues = (name: string, value: string) => {
    const updatedCulturePreferences = currentCulturePreferences.map(culture =>
      culture.key === name ? { ...culture, value: value as PreferenceValue } : culture,
    );
    setCurrentCulturePreferences(updatedCulturePreferences);
  };

  const handleCultureDescriptions = (name: string, value: string) => {
    const updatedCulturePreferences = currentCulturePreferences.map(culture =>
      culture.key === name ? { ...culture, description: value } : culture,
    );
    setCurrentCulturePreferences(updatedCulturePreferences);
    setLetterCounts({ ...letterCounts, [name]: value.length });
    if (value.length > limitDescription) setErrors({ ...errors, [name]: 'Too Long' });
    else setErrors(removedEmptyProps({ ...errors, [name]: '' }) as Record<string, string>);
  };

  const onSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const preferences: Preference[] = currentCulturePreferences
      .map(culture => {
        //FIXME: API issue
        const payload = removedEmptyProps({
          title: culture.key,
          value: culture.value as PreferenceValue,
          description: culture.description,
        });
        return payload as Preference;
      })
      .filter(culture => culture.value);

    try {
      await updatePreferences({ preferences });
    } catch (e) {
      console.log('error in updating culture preferences', e);
    }
  };

  return {
    data: { currentCulturePreferences, letterCounts, errors },
    operations: { onSelectCultureValues, handleCultureDescriptions, onSubmit },
  };
};
