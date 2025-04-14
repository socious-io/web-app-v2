import React from 'react';
import { Link } from 'react-router-dom';
import { COUNTRIES } from 'src/constants/COUNTRIES';
import { translate } from 'src/core/utils';
import { AlertModal } from 'src/modules/general/components/AlertModal';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Modal } from 'src/modules/general/components/modal';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';

import { AddPayoutAccountProps } from './index.types';
import { useAddPayoutAccount } from './useAddPayoutAccount';

const AddPayoutAccount: React.FC<AddPayoutAccountProps> = ({ open, handleClose, currency }) => {
  const {
    data: { stripeLink, errorMsg, openErrorModal },
    operations: { onSelectCountry, setOpenErrorModal },
  } = useAddPayoutAccount(currency);

  return (
    <>
      <Modal
        open={open}
        handleClose={handleClose}
        icon={<FeaturedIcon iconName="credit-card-down" size="lg" type="modern" theme="gray" />}
        mobileFullHeight={false}
        headerDivider={false}
        customStyle="md:max-w-[480px]"
      >
        <div className="flex flex-col p-4 md:p-6 gap-6">
          <div className="flex flex-col gap-1">
            <div className="font-semibold text-lg  leading-7 text-Gray-light-mode-900">
              {translate('general-payout-account.title')}
            </div>
            <div className="font-normal text-sm leading-5 text-Gray-light-mode-600">
              {translate('general-payout-account.subtitle')}
            </div>
          </div>
          <SearchDropdown
            data-testid="search-country"
            placeholder={translate('general-payout-account.country-placeholder')}
            icon="search-lg"
            options={COUNTRIES}
            isSearchable
            onChange={onSelectCountry}
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
              {translate('general-payout-account.continue')}
            </Button>
            <Button variant="outlined" color="info" fullWidth onClick={handleClose}>
              {translate('general-payout-account.cancel')}
            </Button>
          </div>
        </div>
      </Modal>
      <AlertModal
        open={openErrorModal}
        onClose={() => setOpenErrorModal(false)}
        message={errorMsg}
        title={translate('general-payout-account.failed')}
        customIcon={<FeaturedIcon iconName="alert-circle" size="md" theme="error" type="light-circle-outlined" />}
        closeButtn={false}
        submitButton={false}
      />
    </>
  );
};

export default AddPayoutAccount;
