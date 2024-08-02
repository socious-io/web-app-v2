import { useEffect, useState } from 'react';
import { Preference, preferences as getPreferencesApi, updatePreferences } from 'src/core/api';

import { PREFERENCES_VALUES } from './contants';
import { ValueGroup } from './valueContainer.types';
import { ValueAccordionItem } from '../valueAccordion/valueAccordion.types';

export const useValueContainer = () => {
  const mapToValueAccardionItem = (preferenceArray: Preference[]): ValueAccordionItem[] => {
    return PREFERENCES_VALUES.map(item => {
      const preferenceValue = preferenceArray.find(p => p.title === item.key);
      if (preferenceValue)
        return {
          valueGroup: item.group as ValueGroup,
          key: preferenceValue.title,
          title: item.title,
          subtitle: item.subtitle,
          value: preferenceValue.value as 'ON' | 'OFF',
          description: preferenceValue.description,
        };
      return {
        valueGroup: item.group as ValueGroup,
        key: item.key,
        title: item.title,
        subtitle: item.subtitle,
        value: 'OFF',
      };
    });
  };
  const [preferences, setPreferences] = useState<ValueAccordionItem[]>([]);

  useEffect(() => {
    const getPreferences = async () => {
      const res = await getPreferencesApi();
      setPreferences(mapToValueAccardionItem(res));
    };
    getPreferences();
  }, []);

  const onSave = async () => {
    try {
      const payload = preferences.map(item => {
        return { title: item.key, value: item.value };
      });
      await updatePreferences({ preferences: payload });
    } catch (error) {
      console.log('error in saving preferences');
    }
  };

  return {
    preferences,
    setPreferences,
    onSave,
  };
};
