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
    operations: { updateSelectedStep, setOpenModal, handleAdd, handleEdit, handleDelete },
  } = useEducations();

  return (
    <>
      <div className={styles['main']}>
        <div className={styles['main__content']}>
          <div className={styles['main__header']}>
            <span className={styles['main__title']}>Education shapes futures</span>
            Ensure accuracy and add specializations or major projects to enrich your profile.
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
                  img={education.organization?.image?.url || ''}
                  title={education.degree}
                  subtitle={education.organization.name}
                  supprtingText={`${getStringDate(education.start_at.toString())} - ${
                    education.end_at ? getStringDate(education.end_at.toString()) : translate('experiences.now')
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
        <Button type="button" variant="contained" color="primary" fullWidth onClick={() => updateSelectedStep(4)}>
          Next: Languages
        </Button>
      </div>
      <CreateUpdateEducation open={openModal} handleClose={() => setOpenModal(false)} education={educationDetail} />
    </>
  );
};

export default Educations;
