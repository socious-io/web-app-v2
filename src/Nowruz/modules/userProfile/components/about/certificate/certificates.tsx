import variables from 'src/components/_exports.module.scss';
import { CertificateMeta } from 'src/core/api/additionals/additionals.types';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { StepperCard } from 'src/Nowruz/modules/general/components/stepperCard';
import CreateUpdateCertificate from 'src/Nowruz/modules/userProfile/containers/createUpdateCertificate';

import { useCertificate } from './useCertificates.types';
import css from '../about.module.scss';

export const Certificates = () => {
  const {
    myProfile,
    handleAdd,
    certificate,
    openModal,
    handleClose,
    user,
    getDateText,
    handleEdit,
    handleDelete,
    setCertificate,
  } = useCertificate();
  return (
    <>
      <div className="w-full flex flex-col gap-5">
        <div className={css.title}>Certificates</div>
        {myProfile && (
          <Button variant="text" color="primary" className={css.addBtn} onClick={handleAdd}>
            <Icon name="plus" fontSize={20} color={variables.color_primary_700} />
            Add certificate
          </Button>
        )}
        {user?.certificates && (
          <div className="md:pr-48 flex flex-col gap-5">
            {user?.certificates.map((item) => (
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
