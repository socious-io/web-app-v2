import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { EducationMeta } from 'src/core/api/additionals/additionals.types';
import { verificationStatus } from 'src/core/utils';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { StepperCard } from 'src/Nowruz/modules/general/components/stepperCard';
import { CreateUpdateEducation } from 'src/Nowruz/modules/userProfile/containers/createUpdateEducation';
import { VerifyEducationModal } from 'src/Nowruz/modules/userProfile/containers/verifyEducationModal';

import { useEducation } from './useEducation';
import css from '../about.module.scss';

interface ExperienceProps {
  handleOpenVerifyModal: () => void;
}
export const Educations: React.FC<ExperienceProps> = ({ handleOpenVerifyModal }) => {
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
    isVerified,
    handleOpenRequestCertificate,
    openCertificate,
    setOpenCertificate,
    org,
    handleSendRequestCertificate,
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
                DisplayVerificationStatus
                verified={item.credential?.status ? verificationStatus[item.credential?.status] : 'unverified'}
                verifyButton={{
                  display: myProfile && (!item.credential || item.credential?.status === 'PENDING'),
                  label: 'Request certificate',
                  disabled: !!item.credential,
                  action: isVerified ? () => handleOpenRequestCertificate(item) : handleOpenVerifyModal,
                }}
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
      {!!education && !!org && (
        <VerifyEducationModal
          education={education}
          organization={org}
          open={openCertificate}
          handleClose={() => setOpenCertificate(false)}
          onSendRequest={handleSendRequestCertificate}
        />
      )}
    </>
  );
};
