import { RecommendationMeta } from 'src/core/api/additional/additional.types';
import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';
import { StepperCard } from 'src/modules/general/components/stepperCard';
import variables from 'src/styles/constants/_exports.module.scss';

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
            <Icon name="plus" fontSize={20} color={variables.color_primary_700} />
            Ask for recommendation
          </Button>
        )}
        {user?.educations && (
          <div className="md:pr-48 flex flex-col gap-5">
            {user?.recommendations?.map(item => (
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
