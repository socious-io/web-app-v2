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
    operations: { setOpenModal, handleAdd, onAddExperience, handleEdit, handleDelete, onNextStep },
  } = useExperiences();

  return (
    <>
      <div className={styles['main']}>
        <div className={styles['main__content']}>
          <div className={styles['main__header']}>
            <span className={styles['main__title']}>{translate('onboarding-user-experiences-title')}</span>
            {translate('onboarding-user-experiences-subtitle')}
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
                  img={experience.org?.image?.url || ''}
                  title={experience.title}
                  subtitle={experience.org?.name || ''}
                  supprtingText={`${getStringDate(experience.start_at)} - ${
                    experience.end_at ? getStringDate(experience.end_at) : translate('experiences.now')
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
        <Button type="button" variant="contained" color="primary" fullWidth onClick={onNextStep}>
          {translate('onboarding-user-next-educations')}
        </Button>
      </div>
      <CreateUpdateExperience
        open={openModal}
        handleClose={() => setOpenModal(false)}
        experience={experienceDetail}
        hasDeleteButton={false}
        onAddExperience={onAddExperience}
      />
    </>
  );
};

export default Experiences;
