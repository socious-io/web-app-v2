import { CertificateMeta } from 'src/core/api/additional/additional.types';
import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';
import { StepperCard } from 'src/modules/general/components/stepperCard';
import CreateUpdateCertificate from 'src/modules/userProfile/containers/createUpdateCertificate';
import variables from 'src/styles/constants/_exports.module.scss';

import { useCertificate } from './useCertificates.types';
import css from '../about.module.scss';

export const Certificates = () => {
  const {
    myProfile,
    handleAdd,
    certificate,
    openModal,
    handleClose,
    userCertificates,
    hasMoreCertificates,
    getDateText,
    handleEdit,
    handleDelete,
    setCertificate,
    showAll,
    setShowAll,
  } = useCertificate();

  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className={css.title}>{translate('certificates.title')}</div>
        {myProfile && (
          <Button variant="text" color="primary" className={css.addBtn} onClick={handleAdd}>
            <Icon name="plus" fontSize={20} color={variables.color_primary_700} />
            {translate('certificates.addCertificate')}
          </Button>
        )}
        {userCertificates && (
          <div className="md:pr-48 flex flex-col gap-5">
            {userCertificates.map(item => (
              <StepperCard
                key={item.id}
                iconName="building-05"
                img={(item.meta as CertificateMeta).organization_image || ''}
                title={item.title}
                subtitle={(item.meta as CertificateMeta).organization_name}
                supprtingText={getDateText(item)}
                editable={myProfile}
                deletable={myProfile}
                description={item.description}
                handleEdit={() => handleEdit(item)}
                handleDelete={() => handleDelete(item.id)}
              />
            ))}
            {!showAll && hasMoreCertificates && (
              <span className={css.more} onClick={() => setShowAll(true)}>
                {translate('certificates.showAll')}
              </span>
            )}
          </div>
        )}
      </div>
      <CreateUpdateCertificate
        open={openModal}
        handleClose={handleClose}
        certificate={certificate}
        setCertificate={setCertificate}
      />
    </>
  );
};
