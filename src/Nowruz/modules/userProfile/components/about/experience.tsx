import { useSelector } from 'react-redux';
import { CurrentIdentity, User } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { StepperCard } from 'src/Nowruz/modules/general/components/stepperCard';
import { RootState } from 'src/store';

import css from './about.module.scss';

export const Experiences = () => {
  const user = useSelector<RootState, User | undefined>((state) => {
    return state.profile.user;
  });
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const myProfile = currentIdentity?.id === user?.id;

  return (
    <div className="w-full flex flex-col gap-5">
      <div className={css.title}>Experience</div>

      <Button variant="text" color="primary" className={css.addBtn}>
        <Icon name="plus" fontSize={20} />
        Add experience
      </Button>

      {user?.experiences && (
        <div className="md:pr-48 flex flex-col gap-5">
          {user?.experiences.map((item) => (
            <StepperCard
              key={item.id}
              iconName="building-05"
              title={item.title}
              subtitle={item.org.name}
              supprtingText={`${item.start_at}-${item.end_at || 'Now'}`}
              editable={myProfile}
              deletable={myProfile}
              description={item.description}
              seeMore
            />
          ))}
        </div>
      )}
    </div>
  );
};
