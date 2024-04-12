import variables from 'src/components/_exports.module.scss';
import { EducationMeta } from 'src/core/api/additionals/additionals.types';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { StepperCard } from 'src/Nowruz/modules/general/components/stepperCard';

import { useEducation } from './useEducation';
import { CreateUpdateEducation } from '../../../containers/createUpdateEducation';
import css from '../about.module.scss';

export const Educations = () => {
  const {
    openModal,
    myProfile,
    user,
    getDateText,
    handleClose,
    handleDelete,
    handleAdd,
    handleEdit,
    education,
    setEducation,
    getDegree,
    getSchool,
  } = useEducation();
  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className={css.title}>Educations</div>
        {myProfile && (
          <Button variant="text" color="primary" className={css.addBtn} onClick={handleAdd}>
            <Icon name="plus" fontSize={20} color={variables.color_primary_700} />
            Add education
          </Button>
        )}
        {user?.educations && (
          <div className="md:pr-48 flex flex-col gap-5">
            {user?.educations.map(item => (
              <StepperCard
                img={item.meta ? (item.meta as EducationMeta).school_image : ''}
                key={item.id}
                iconName="graduation-hat-01"
                title={getSchool(item)}
                subtitle={getDegree(item)}
                supprtingText={getDateText(item)}
                editable={myProfile}
                deletable={myProfile}
                description={item.description}
                handleEdit={() => handleEdit(item)}
                handleDelete={() => handleDelete(item.id)}
              />
            ))}
          </div>
        )}
      </div>
      <CreateUpdateEducation
        open={openModal}
        handleClose={handleClose}
        education={education}
        setEducation={setEducation}
      />
    </>
  );
};
