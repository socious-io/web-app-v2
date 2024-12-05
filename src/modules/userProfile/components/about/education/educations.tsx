import React from 'react';
import { getStringDate } from 'src/core/time';
import { verificationStatus } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';
import { StepperCard } from 'src/modules/general/components/stepperCard';
import { CreateUpdateEducation } from 'src/modules/userProfile/containers/createUpdateEducation';
import { VerifyEducationModal } from 'src/modules/userProfile/containers/verifyEducationModal';
import variables from 'src/styles/constants/_exports.module.scss';

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
    userEducations,
    hasMoreEducations,
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
    claimUrl,
    showAll,
    setShowAll,
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
        {userEducations && (
          <div className="md:pr-48 flex flex-col gap-5">
            {userEducations.map(item => (
              <>
                <StepperCard
                  img={item.org.image?.url || ''}
                  key={item.id}
                  iconName="graduation-hat-01"
                  title={item.org.name}
                  subtitle={getDegree(item)}
                  supprtingText={`${getStringDate(item.start_at)} - ${
                    item.end_at ? getStringDate(item.end_at) : 'Now'
                  }`}
                  editable={myProfile}
                  deletable={myProfile}
                  description={item.description}
                  handleEdit={() => handleEdit(item)}
                  handleDelete={() => handleDelete(item.id)}
                  DisplayVerificationStatus
                  verified={item.credential?.status ? verificationStatus[item.credential?.status] : 'unverified'}
                  verifyButton={{
                    display: myProfile && (!item.credential || item.credential?.status === 'PENDING'),
                    label: item.credential ? 'Credential request sent' : 'Request certificate',
                    disabled: !!item.credential,
                    action: isVerified ? () => onOpenVerifyModal(item) : handleOpenVerifyModal,
                  }}
                  claimButton={{
                    display:
                      myProfile && (item.credential?.status === 'APPROVED' || item.credential?.status === 'SENT'),
                    label: item.credential?.status === 'APPROVED' ? 'Claim certificate' : 'Certificate claimed',
                    disabled: !!disabledClaims[item.credential?.id || ''] || item.credential?.status === 'SENT',
                    action: isVerified ? () => onOpenClaimModal(item.credential?.id) : handleOpenVerifyModal,
                  }}
                />
                {myProfile && item.credential?.status === 'REJECTED' && (
                  <div
                    className={css.status}
                    style={{ borderColor: variables.color_error_500, color: variables.color_error_500 }}
                  >
                    <Icon name="x-close" color={variables.color_error_500} />
                    <span>Rejected from {item.org.name}</span>
                  </div>
                )}
              </>
            ))}
            {!showAll && hasMoreEducations && (
              <span className={css.more} onClick={() => setShowAll(true)}>
                Show all
              </span>
            )}
          </div>
        )}
      </div>
      {claimUrl && (
        <ClaimCertificateModal
          open={openModal.name === 'claim' && openModal.open}
          link={claimUrl}
          handleClose={handleClose}
          handleClaimVC={handleClaimVC}
        />
      )}
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
