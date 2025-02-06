import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Language } from 'src/core/api';
import { StepsContext } from 'src/modules/Auth/containers/onboarding/Stepper';
import { LanguageProps } from 'src/modules/userProfile/containers/editInfo/editInfo.types';
import { RootState } from 'src/store';
import { setLinkedIn } from 'src/store/reducers/linkedin.reducer';

const mapLanguageToItems = (languages: Language[]) => {
  const mappedObj = languages.map(item => {
    return { id: item.id, name: item.name, level: item.level, isNew: false } as LanguageProps;
  });
  return mappedObj;
};

export const useLanguages = () => {
  const dispatch = useDispatch();
  const { updateSelectedStep } = useContext(StepsContext);
  const linkedin = useSelector((state: RootState) => state.linkedin);
  const [currentLanguages, setCurrentLanguages] = useState<LanguageProps[]>(
    mapLanguageToItems(linkedin.languages || []),
  );

  const onNextStep = () => {
    dispatch(setLinkedIn({ ...linkedin, languages: currentLanguages }));
    updateSelectedStep(5);
  };

  return {
    data: {
      languages: currentLanguages,
    },
    operations: {
      setLanguages: setCurrentLanguages,
      onNextStep,
    },
  };
};
