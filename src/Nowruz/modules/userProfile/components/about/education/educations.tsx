import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { getStringDate } from 'src/core/time';
import { verificationStatus } from 'src/core/utils';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { StepperCard } from 'src/Nowruz/modules/general/components/stepperCard';
import { CreateUpdateEducation } from 'src/Nowruz/modules/userProfile/containers/createUpdateEducation';
import { VerifyEducationModal } from 'src/Nowruz/modules/userProfile/containers/verifyEducationModal';

import { useEducation } from './useEducation';
import css from '../about.module.scss';
import { ClaimCertificateModal } from '../claimCertificateModal';

interface ExperienceProps {
  handleOpenVerifyModal: () => void;
}
export const Educations: React.FC<ExperienceProps> = ({ handleOpenVerifyModal }) => {
  const {
    openModal,
    myProfile,
    user,
    handleClose,
    handleDelete,
    handleAdd,
    handleEdit,
    education,
    getDegree,
    isVerified,
    onOpenVerifyModal,
    handleRequestVerify,
    org,
    onOpenClaimModal,
    disabledClaims,
    handleClaimVC,
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
                img={item.org.image?.url || ''}
                key={item.id}
                iconName="graduation-hat-01"
                title={item.org.name}
                subtitle={getDegree(item)}
                supprtingText={`${getStringDate(item.start_at)} - ${item.end_at ? getStringDate(item.end_at) : 'Now'}`}
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
                  action: isVerified ? () => onOpenVerifyModal(item) : handleOpenVerifyModal,
                }}
                claimButton={{
                  display: myProfile && item.credential?.status === 'APPROVED',
                  label: 'Claim certificate',
                  disabled: !!disabledClaims[item.credential?.id || ''],
                  action: isVerified ? () => onOpenClaimModal(item.credential?.id) : handleOpenVerifyModal,
                }}
              />
            ))}
          </div>
        )}
      </div>
      <ClaimCertificateModal
        open={openModal.name === 'claim' && openModal.open}
        handleClose={handleClose}
        handleClaimVC={handleClaimVC}
      />
      <CreateUpdateEducation
        open={(openModal.name === 'add' || openModal.name === 'edit') && openModal.open}
        handleClose={handleClose}
        education={education}
        readonly={education?.credential && ['APPROVED', 'SENT', 'CLAIMED'].includes(education.credential?.status || '')}
      />
      {!!education && !!org && (
        <VerifyEducationModal
          open={openModal.name === 'verify' && openModal.open}
          handleClose={handleClose}
          onVerifyEducation={handleRequestVerify}
          organization={org}
          education={education}
        />
      )}
    </>
  );
};
