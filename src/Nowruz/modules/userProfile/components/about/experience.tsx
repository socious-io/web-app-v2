import { Experience } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { StepperCard } from 'src/Nowruz/modules/general/components/stepperCard';

import css from './about.module.scss';

interface ExperienceProps {
  items?: Experience[] | null;
}

export const Experiences: React.FC<ExperienceProps> = (props) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className={css.title}>Experience</div>

      <Button variant="text" color="primary" className={css.addBtn}>
        <Icon name="plus" fontSize={20} />
        Add experience
      </Button>

      {props.items && (
        <div className="md:pr-48 flex flex-col gap-5">
          {props.items.map((item) => (
            <StepperCard
              key={item.id}
              iconName="building-05"
              title={item.title}
              subtitle={item.org.name}
              supprtingText={`${item.start_at}-${item.end_at || 'Now'}`}
              editable
              deletable
              description={item.description}
              seeMore
            />
          ))}
        </div>
      )}
    </div>
  );
};
