import { RecommendationMeta } from 'src/core/api/additionals/additionals.types';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { StepperCard } from 'src/Nowruz/modules/general/components/stepperCard';

import { useRecommedation } from './useRecommendation';
import css from '../about.module.scss';

export const Recommendation = () => {
  const { myProfile, user } = useRecommedation();
  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className={css.title}>Recommendations</div>
        {myProfile && (
          <Button
            variant="text"
            color="primary"
            className={css.addBtn}
            // onClick={handleAdd}
          >
            <Icon name="plus" fontSize={20} />
            Ask for recommendation
          </Button>
        )}
        {user?.educations && (
          <div className="md:pr-48 flex flex-col gap-5">
            {user?.recommendations?.map((item) => (
              <StepperCard
                img={(item.meta as RecommendationMeta).recommeder.avatar?.url || ''}
                key={item.id}
                iconName="user-01"
                title=""
                subtitle=""
                supprtingText=""
                editable={myProfile && (item.meta as RecommendationMeta).status === 'pending'}
                deletable={myProfile}
                description={item.description}
                //  handleEdit={() => handleEdit(item)}
                //  handleDelete={() => handleDelete(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
