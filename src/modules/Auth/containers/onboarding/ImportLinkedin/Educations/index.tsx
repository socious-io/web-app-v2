import { getStringDate } from 'src/core/time';
import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';
import { StepperCard } from 'src/modules/general/components/stepperCard';
import { CreateUpdateEducation } from 'src/modules/userProfile/containers/createUpdateEducation';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { useEducations } from './useEducations';

const Educations = () => {
  const {
    data: { educations, openModal, educationDetail },
    operations: { setOpenModal, handleAdd, onAddEducation, handleEdit, handleDelete, onNextStep },
  } = useEducations();

  return (
    <>
      <div className={styles['main']}>
        <div className={styles['main__content']}>
          <div className={styles['main__header']}>
            <span className={styles['main__title']}>{translate('onboarding-user-educations-title')}</span>
            {translate('onboarding-user-educations-subtitle')}
          </div>
          <div className={styles['main__body']}>
            <Button variant="text" color="primary" className={styles['main__btn']} onClick={handleAdd}>
              <Icon name="plus" fontSize={20} color={variables.color_primary_700} />
              {translate('educations.addEducation')}
            </Button>
            <div className="flex flex-col gap-5">
              {educations.map((education, index) => (
                <StepperCard
                  key={index}
                  iconName="building-05"
                  img={education.org?.image?.url || ''}
                  title={education.org?.name || ''}
                  subtitle={`${education.degree}, ${education.title}`}
                  supprtingText={`${getStringDate(education.start_at)} - ${
                    education.end_at ? getStringDate(education.end_at) : translate('experiences.now')
                  }`}
                  editable
                  deletable
                  handleEdit={() => handleEdit(education)}
                  handleDelete={() => handleDelete(education.id)}
                />
              ))}
            </div>
          </div>
        </div>
        <Button type="button" variant="contained" color="primary" fullWidth onClick={onNextStep}>
          {translate('onboarding-user-next-languages')}
        </Button>
      </div>
      <CreateUpdateEducation
        open={openModal}
        handleClose={() => setOpenModal(false)}
        education={educationDetail}
        hasDeleteButton={false}
        onAddEducation={onAddEducation}
      />
    </>
  );
};

export default Educations;
