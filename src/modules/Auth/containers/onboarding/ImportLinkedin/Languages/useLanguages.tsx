import { User } from 'cypress/e2e/authentication/utilities';
import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Language } from 'src/core/api';
import { StepsContext } from 'src/modules/Auth/containers/onboarding/Stepper';
import { LanguageProps } from 'src/modules/userProfile/containers/editInfo/editInfo.types';
import { RootState } from 'src/store';
import { setNormalOnboarding } from 'src/store/reducers/linkedin.reducer';

const mapLanguageToItems = (languages: Language[]) => {
  const mappedObj = languages.map(item => {
    return { id: item.id, name: item.name, level: item.level, isNew: false } as LanguageProps;
  });
  return mappedObj;
};

export const useLanguages = () => {
  const dispatch = useDispatch();
  const { updateSelectedStep } = useContext(StepsContext);
  const user = useSelector((state: RootState) => {
    return state.profile.identity;
  }) as unknown as User;
  const { languages } = useSelector((state: RootState) => state.linkedin);
  const [currentLanguages, setCurrentLanguages] = useState<LanguageProps[]>(mapLanguageToItems(languages || []));

  const onNextStep = () => {
    dispatch(setNormalOnboarding());
    updateSelectedStep(3);
  };

  return {
    data: {
      languages: currentLanguages,
    },
    operations: {
      onNextStep,
      setLanguages: setCurrentLanguages,
    },
  };
};
