import { translate } from 'src/core/utils';
import { AlertModal } from 'src/modules/general/components/AlertModal';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Modal } from 'src/modules/general/components/modal';

import { AddCardModalProps } from './index.types';
import { useAddCardModal } from './useAddCardModal';

const AddCardModal: React.FC<AddCardModalProps> = ({ open, handleClose, setCardsList, currency }) => {
  const {
    data: { openErrorModal, errorMessage },
    operations: { onSubmit, setOpenErrorModal },
  } = useAddCardModal(open, handleClose, setCardsList, currency);

  const footerJSX = (
    <div className="w-full p-4 md:p-6">
      <Button color="primary" variant="contained" onClick={onSubmit} fullWidth>
        {translate('cont-add-btn')}
      </Button>
    </div>
  );

  return (
    <>
      <Modal
        open={open}
        handleClose={handleClose}
        title={translate('cont-add-credit-card')}
        mobileFullHeight={false}
        footer={footerJSX}
      >
        <div className="p-4 md:p-6">
          <div id="card-element" />
        </div>
      </Modal>
      <AlertModal
        open={openErrorModal}
        onClose={() => setOpenErrorModal(false)}
        customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="error" type="light-circle-outlined" />}
        title={translate('cont-failed')}
        message={errorMessage}
        closeButtn={false}
        submitButton={false}
      />
    </>
  );
};

export default AddCardModal;
