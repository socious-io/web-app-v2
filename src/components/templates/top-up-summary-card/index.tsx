import { Card } from 'src/components/atoms/card/card';
import { PaymentDetail } from 'src/components/molecules/payment-detail';
import css from './top-up-summary-card.module.scss';
import { TopUpSummaryCardProps } from './top-up-summary-card.types';
import { InputModal } from 'src/components/molecules/input-modal';
import { useOfferShared } from 'src/pages/job-offer-reject/offer/offer.shared';
import { Item } from 'src/components/molecules/input-modal/input-modal.types';
import { useState } from 'react';
import { COMMISSIONS } from 'src/constants/PAYMENT_COMMISSIONS';

export const TopUpSummaryCard: React.FC<TopUpSummaryCardProps> = ({
  title,
  offer_rate,
  weekly_limit,
  isPaidCrypto,
  unit,
  containerClassName = '',
  verified_impact,
  ...rest
}) => {
  const {
    tokens,
    openModal,
    setOpenModal,
    selectedToken,
    selectedCurrency,
    onSelectTokens,
    onSelectCurrency,
    equivalentUSD,
    web3,
  } = useOfferShared();

  const [inputAmount, setInputAmount] = useState('');
  const [isIncorrectInput, setIncorrectInput] = useState(false);
  const minTopUp = weekly_limit * offer_rate;
  const verificationStatus = verified_impact ? 'VERIFIED' : 'NOT_VERIFIED';
  const feesList = [
    {
      title: `${COMMISSIONS[verificationStatus].SOCIOUS.label} (${COMMISSIONS[verificationStatus].SOCIOUS.value}%)`,
      price: parseFloat(
        (((inputAmount ? parseFloat(inputAmount) : 0) * COMMISSIONS[verificationStatus].SOCIOUS.value) / 100).toFixed(2)
      ),
    },
  ];

  if (!isPaidCrypto) {
    feesList.push({
      title: `${COMMISSIONS[verificationStatus].STRIPE.label} (${COMMISSIONS[verificationStatus].STRIPE.value}%)`,
      price: parseFloat(
        (((inputAmount ? parseFloat(inputAmount) : 0) * COMMISSIONS[verificationStatus].STRIPE.value) / 100).toFixed(2)
      ),
    });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(Number(event.target.value))) {
      setInputAmount(event.target.value);
    }
    setIncorrectInput(parseFloat(event.target.value) >= minTopUp);
  };

  const totalFees = function (list: { title: string; price: number }[]) {
    let total = 0;
    for (var item of list) {
      total += item.price;
    }
    return total;
  };

  return (
    <Card className={`${css.payment}`}>
      <div className={css.payment__title}>{title}</div>
      <div className={css.payment__input}>
        <div className={css.payment__input__name}>{isPaidCrypto ? 'Top up amount' : 'Payment amount'}</div>
        <InputModal
          name="assignmentTotal"
          placeholder="amount"
          modalHeader="Select a token"
          items={tokens as Item[]}
          open={openModal}
          onOpen={() => setOpenModal(true)}
          onClose={() => setOpenModal(false)}
          selectedItem={isPaidCrypto ? ((selectedToken?.symbol || tokens[0]?.subtitle) as string) : selectedCurrency}
          onSelectItem={isPaidCrypto ? onSelectTokens : onSelectCurrency}
          onChange={handleChange}
          value={inputAmount}
        />
        <div className={`${css.payment__input__instruction} ${!isIncorrectInput && css.payment__input__incorrect}`}>
          Please enter at least {minTopUp.toFixed(2)} {unit} for 1 week of work.
        </div>
      </div>
      <div className={css.payment__detail}>
        <PaymentDetail unit={unit} list={feesList} {...rest} />
      </div>
      <div className={css.payment__total}>
        Total payment
        <div className={css.payment__price}>
          {unit} {(totalFees(feesList) + (inputAmount ? parseFloat(inputAmount) : 0)).toFixed(2).toLocaleString()}
        </div>
      </div>
      <div className={css.payment__detail}>
        <PaymentDetail
          unit={unit}
          list={[{ title: 'Socious balance after top-up', price: inputAmount ? parseFloat(inputAmount) : 0 }]}
          {...rest}
        />
      </div>
    </Card>
  );
};
