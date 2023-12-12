import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { StepperCard } from 'src/Nowruz/modules/general/components/stepperCard';
import { CreateUpdateExperience } from 'src/Nowruz/modules/userProfile/containers/createUpdateExperience';

import { useExperience } from './useExperience';
import css from '../about.module.scss';

export const Experiences = () => {
  const { user, myProfile, openModal, experience, handleEdit, handleAdd, handleDelete, getStringDate, handleClose } =
    useExperience();
  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className={css.title}>Experience</div>
        {myProfile && (
          <Button variant="text" color="primary" className={css.addBtn} onClick={handleAdd}>
            <Icon name="plus" fontSize={20} color={variables.color_primary_700} />
            Add experience
          </Button>
        )}
        {user?.experiences && (
          <div className="md:pr-48 flex flex-col gap-5">
            {user?.experiences.map((item) => (
              <StepperCard
                key={item.id}
                iconName="building-05"
                title={item.title}
                subtitle={item.org.name}
                supprtingText={`${getStringDate(item.start_at)} - ${item.end_at ? getStringDate(item.end_at) : 'Now'}`}
                description={item.description}
                editable={myProfile}
                deletable={myProfile}
                handleEdit={() => handleEdit(item)}
                handleDelete={() => handleDelete(item.id)}
              />
            ))}
          </div>
        )}
      </div>
      <CreateUpdateExperience open={openModal} handleClose={handleClose} experience={experience} />
    </>
  );
};
