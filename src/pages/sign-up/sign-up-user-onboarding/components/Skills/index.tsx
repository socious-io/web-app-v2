import React, { useContext, useState } from 'react';
import { skillsToCategoryAdaptor } from 'src/core/adaptors';

import css from './skills.module.scss';
import { useUser } from '../../sign-up-user-onboarding.context';
import { isValidArrayRange } from '../../sign-up-user-onboarding.service';
import { Button } from 'src/components/atoms/button/button';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { Search } from 'src/components/atoms/search/search';
import { StepsContext } from '../steper';
import StepHeader from '../stepHeader';

const Skills: React.FC = () => {
  const { updateSelectedStep } = useContext(StepsContext);
  const { state, updateUser } = useUser();
  const [list, setList] = useState(skillsToCategoryAdaptor());
  const updateSocialCauses = (skills: Array<string>) => {
    updateUser({ ...state, skills });
  };
  function onSearch(value: string) {
    const filtered = skillsToCategoryAdaptor().filter((item) => item.label.toLowerCase().includes(value.toLowerCase()));
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
