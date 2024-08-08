import { useEffect, useState } from 'react';
import { Preference, updatePreferences } from 'src/core/api';
import { ValueAccordionItem } from 'src/modules/Preferences/OrgPreferences/valueAccordion/valueAccordion.types';

import { PREFERENCES_VALUES } from './constants';
import { ValueGroup } from './valueContainer.types';

export const useValueContainer = (preferences: Preference[]) => {
  const mapToValueAccordionItem = (preferenceArray: Preference[]): ValueAccordionItem[] => {
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
        ...item,
        valueGroup: item.group,
        value: 'OFF',
      };
    });
  };
  const [accordionItems, setAccordionItems] = useState<ValueAccordionItem[]>([]);
  const [errors, setErrors] = useState<Record<ValueGroup, string>>({} as Record<ValueGroup, string>);
  const accardionGroups: { group: ValueGroup; title: string }[] = [
    { group: 'workLifeBalance', title: 'Work-life-balance-title' },
    { group: 'benefits', title: 'benefits-title' },
    { group: 'diversity', title: 'diversity-title' },
    { group: 'environmentalImpacts', title: 'environmental-impact-title' },
    { group: 'growth', title: 'growth-title' },
    { group: 'socialImpacts', title: 'social-impact-title' },
    { group: 'transparency', title: 'transparency-title' },
  ];

  useEffect(() => {
    setAccordionItems(mapToValueAccordionItem(preferences));
  }, [preferences]);

  const onSave = async () => {
    try {
      const hasErrors = Object.keys(errors).some(item => !!errors[item]);
      if (hasErrors) return;

      const payload = accordionItems.map(item => {
        const mappedItem: Preference = { title: item.key, value: item.value };
        if (item.description) mappedItem.description = item.description;
        return mappedItem;
      });
      await updatePreferences({ preferences: payload });
    } catch (error) {
      console.log('error in saving value preferences');
    }
  };

  const handleSetError = (valueGroup: ValueGroup, error: string) => {
    setErrors({ ...errors, [valueGroup]: error });
  };

  return {
    accordionItems,
    setAccordionItems,
    accardionGroups,
    onSave,
    errors,
    handleSetError,
  };
};
