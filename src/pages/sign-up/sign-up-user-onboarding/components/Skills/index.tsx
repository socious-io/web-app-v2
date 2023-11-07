import React, { useContext, useEffect, useState } from 'react';
import { Button } from 'src/components/atoms/button/button';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { Search } from 'src/components/atoms/search/search';
import { skillsToCategoryAdaptor } from 'src/core/adaptors';
import { StepsContext } from 'src/pages/sign-up/sign-up-user-onboarding/components/steper';
import StepHeader from 'src/pages/sign-up/sign-up-user-onboarding/components/stepHeader';
import { useUser } from 'src/pages/sign-up/sign-up-user-onboarding/sign-up-user-onboarding.context';
import { isValidArrayRange } from 'src/pages/sign-up/sign-up-user-onboarding/sign-up-user-onboarding.service';

import css from './skills.module.scss';

const Skills: React.FC = () => {
  const { updateSelectedStep } = useContext(StepsContext);
  const { state, updateUser } = useUser();
  const [list, setList] = useState<{ value: string; label: string }[]>([]);
  useEffect(() => {
    skillsToCategoryAdaptor().then((data) => setList(data));
  }, []);

  const updateSocialCauses = (skills: Array<string>) => {
    console.log(skills);

    updateUser({ ...state, skills });
  };
  function onSearch(value: string) {
    const filtered = list.filter((item) => item.label.toLowerCase().includes(value.toLowerCase()));
    setList(filtered);
  }

  return (
    <>
      <div className={css['container']}>
        <StepHeader
          title="What skills do you have?"
          subTitle="Showcase up to 10 skills you can contribute to help social impact initiatives and organizations"
        />
      </div>
      <div className={css['search']}>
        <Search width="100%" placeholder="Search" onValueChange={onSearch} />
      </div>
      <div className={css['tags']}>
        <div className={css['tags__title']}>Popular</div>
        <CategoriesClickable clickable onChange={updateSocialCauses} list={list} selected={state?.skills || []} />
      </div>
      <div className={css['buttons']}>
        <Button disabled={!isValidArrayRange(state.skills, 0, 10)} onClick={() => updateSelectedStep(3)}>
          Continue
        </Button>
      </div>
    </>
  );
};

export default Skills;
