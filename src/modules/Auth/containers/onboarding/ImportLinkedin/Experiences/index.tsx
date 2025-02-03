import { getStringDate } from 'src/core/time';
import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';
import { StepperCard } from 'src/modules/general/components/stepperCard';
import { CreateUpdateExperience } from 'src/modules/userProfile/containers/createUpdateExperience';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { useExperiences } from './useExperiences';

const Experiences = () => {
  const {
    data: { experiences, openModal, experienceDetail },
    operations: { updateSelectedStep, setOpenModal, handleAdd, handleEdit, handleDelete },
  } = useExperiences();

  return (
    <>
      <div className={styles['main']}>
        <div className={styles['main__content']}>
          <div className={styles['main__header']}>
            <span className={styles['main__title']}>Career milestones matter</span>
            Ensure all roles and key achievements are included. A complete career profile boosts your job prospects.
          </div>
          <div className={styles['main__body']}>
            <Button variant="text" color="primary" className={styles['main__btn']} onClick={handleAdd}>
              <Icon name="plus" fontSize={20} color={variables.color_primary_700} />
              {translate('experiences.addExperience')}
            </Button>
            <div className="flex flex-col gap-5">
              {experiences.map((experience, index) => (
                <StepperCard
                  key={index}
                  iconName="building-05"
                  img={experience.company?.image?.url || ''}
                  title={experience.job}
                  subtitle={experience.company.name}
                  supprtingText={`${getStringDate(experience.start_date.toString())} - ${
                    experience.end_date ? getStringDate(experience.end_date.toString()) : translate('experiences.now')
                  }`}
                  editable
                  deletable
                  handleEdit={() => handleEdit(experience)}
                  handleDelete={() => handleDelete(experience.id)}
                />
              ))}
            </div>
          </div>
        </div>
        <Button type="button" variant="contained" color="primary" fullWidth onClick={() => updateSelectedStep(3)}>
          Next: Education
        </Button>
      </div>
      <CreateUpdateExperience open={openModal} handleClose={() => setOpenModal(false)} experience={experienceDetail} />
    </>
  );
};

export default Experiences;
