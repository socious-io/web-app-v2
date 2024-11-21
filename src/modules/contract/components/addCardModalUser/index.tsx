import React from 'react';
import { Link } from 'react-router-dom';
import { COUNTRIES } from 'src/constants/COUNTRIES';
import { translate } from 'src/core/utils';
import { AlertModal } from 'src/modules/general/components/AlertModal';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Modal } from 'src/modules/general/components/modal';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';

import { AddCardModalUserProps } from './addCardModalUser.types';
import { useAddCardModalUser } from './useAddCardModalUser';

const AddCardModalUser: React.FC<AddCardModalUserProps> = ({ open, handleClose, offer }) => {
  const { onSelectCountry, errorMsg, openErrorModal, setOpenErrorModal, stripeLink } = useAddCardModalUser(offer);
  return (
    <>
      <Modal
        open={open}
        handleClose={handleClose}
        icon={<FeaturedIcon iconName="credit-card-down" size="lg" type="modern" theme="gray" />}
        mobileFullHeight={false}
        headerDivider={false}
      >
        <div className="flex flex-col p-4 md:p-6 gap-6">
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-lg  leading-7 text-Gray-light-mode-900">
              {translate('wallet-add-card-title')}
            </div>
            <div className="font-normal text-sm leading-5 text-Gray-light-mode-600">
              {translate('wallet-add-card-subtitle')}
            </div>
          </div>
          <SearchDropdown
            placeholder="Search a country"
            icon="search-lg"
            options={COUNTRIES}
            isSearchable
            onChange={onSelectCountry}
            //
          />
          <div className="flex flex-col md:flex-row-reverse gap-3 md:mt-2">
            <Button
              variant="contained"
              color="primary"
              disabled={!stripeLink}
              fullWidth
              component={Link}
              to={stripeLink}
              target="_blank"
            >
              {translate('wallet-continue')}
            </Button>
            <Button variant="outlined" color="secondary" fullWidth onClick={handleClose}>
              {translate('wallet-cancel')}
            </Button>
          </div>
        </div>
      </Modal>
      <AlertModal
        open={openErrorModal}
        onClose={() => setOpenErrorModal(false)}
        message={errorMsg}
        title={translate('wallet-failed')}
        customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="error" type="light-circle-outlined" />}
        closeButtn={false}
        submitButton={false}
      />
    </>
  );
};

export default AddCardModalUser;
