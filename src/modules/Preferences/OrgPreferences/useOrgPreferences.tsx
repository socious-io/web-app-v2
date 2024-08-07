import { useEffect, useState } from 'react';
import { Preference, preferences } from 'src/core/api';

export const useOrgPreferences = () => {
  const [currentPreferences, setCurrentPreferences] = useState<Preference[]>([]);

  useEffect(() => {
    const getPreferences = async () => {
      const res = await preferences();
      setCurrentPreferences(res);
    };
    getPreferences();
  }, []);

  return { preferences: currentPreferences };
};
