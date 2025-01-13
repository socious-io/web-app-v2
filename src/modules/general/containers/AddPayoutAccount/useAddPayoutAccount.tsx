import { useEffect, useState } from 'react';
import { getStripeLink, PaymentCurrency } from 'src/core/api';

export const useAddPayoutAccount = (currency?: PaymentCurrency) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [stripeLink, setStripeLink] = useState('');
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (selectedCountry) generateStripeLink(selectedCountry);
  }, [selectedCountry]);

  const onSelectCountry = option => {
    if (option.value !== selectedCountry) setStripeLink('');
    setSelectedCountry(option.value);
  };

  const generateStripeLink = async (country: string) => {
    try {
      const result = await getStripeLink({
        country: country,
        is_jp: currency === 'JPY',
        redirect_url: window.location.href,
      });
      const {
        link: { url },
      } = result;
      setStripeLink(url);
    } catch (err: any) {
      setErrorMsg(err?.response?.data.error || err?.message);
      setOpenErrorModal(true);
    }
  };

  return {
    data: {
      stripeLink,
      errorMsg,
      openErrorModal,
    },
    operations: { onSelectCountry, setOpenErrorModal },
  };
};
