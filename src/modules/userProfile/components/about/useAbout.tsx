import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PREFERENCES_CULTURE_QUESTIONS } from 'src/constants/PREFERENCES';
import { Preference, preferences, PreferenceValue } from 'src/core/api';
import { verifyAction } from 'src/modules/refer/referUtils';
import { RootState } from 'src/store';

export const useAbout = () => {
  const identityType = useSelector<RootState, 'users' | 'organizations'>(state => {
    return state.profile.type;
  });
  const [currentPreference, setCurrentPreference] = useState<{ culture: Preference[]; value: Preference[] }>({
    culture: [],
    value: [],
  });

  const mapToCulturePreferences = (newPreferences: Preference[]) => {
    return newPreferences
      .filter(preference => PREFERENCES_CULTURE_QUESTIONS.some(culture => culture.key === preference.title))
      .map(preference => {
        const culture = PREFERENCES_CULTURE_QUESTIONS.find(culture => culture.key === preference.title);
        const answer = culture?.answers.find(answer => answer.value === preference.value);
        return {
          title: culture?.title || preference.title,
          value: (answer?.label || preference.value) as PreferenceValue,
          description: preference.description || '',
        };
      });
  };

  useEffect(() => {
    const getPreferences = async () => {
      const res = await preferences();
      //TODO: Marjan, please use this state for setting value on `about` section
      setCurrentPreference({ ...currentPreference, culture: mapToCulturePreferences(res) });
    };
    getPreferences();
  }, []);

  const [openVerifyModal, setOpenVerifyModal] = useState(false);
  const [connectUrl, setConnectUrl] = useState<string>('');

  const handleOpenVerifyModal = async () => {
    await verifyAction(setConnectUrl, setOpenVerifyModal);
    setOpenVerifyModal(true);
  };

  return {
    connectUrl,
    culturePreferences: currentPreference.culture,
    handleOpenVerifyModal,
    identityType,
    openVerifyModal,
    setOpenVerifyModal,
  };
};
