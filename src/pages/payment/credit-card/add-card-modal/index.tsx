import { Modal } from 'src/components/templates/modal/modal';
import { Button } from 'src/components/atoms/button/button';
import { Input } from 'src/components/atoms/input/input';
import { printWhen } from 'src/core/utils';
import { endpoint } from 'src/core/endpoints';
import { AddCardModalProps } from './add-card-modal.types';
import { getCreditCardInfo } from '../../payment.service';
import { useCreditCardShared } from '../credit-card.shared';
import css from './add-card-modal.module.scss';

export const AddCardModal: React.FC<AddCardModalProps> = ({ open, onClose, setCardsList }) => {
  const { form, formIsInvalid, isDirtyYearOrMonth: isDirty, errors } = useCreditCardShared();

  const errorsJSX = (
    <div style={{ height: '`${errors.length}rem`' }} className={css.errorsContainer}>
      {errors.map((error, i) => (
        <div className={css.errorItem} key={i}>
          <>- {error}</>
        </div>
      ))}
    </div>
  );

  function onSubmit() {
    const payload = {
      holder_name: form.controls.cardholderName.value,
      numbers: form.controls.cardNumber.value,
      exp_month: form.controls.month.value,
      exp_year: +('20' + form.controls.year.value),
      cvc: form.controls.cvc.value,
    };
    endpoint.post.payments['add-card'](payload).then(async () => {
      onClose();
      const result = await getCreditCardInfo();
      setCardsList(result);
    });
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className={css.container}>
        <div className={css.header}>
          <span></span>
          Add a credit card
          <div onClick={onClose}>
            <img src="/icons/close-black.svg" />
          </div>
        </div>
        <form className={css.form}>
          <Input register={form} name="cardholderName" label="Cardholder’s name" placeholder="Name" />

          <Input register={form} name="cardNumber" label="Card number" inputMode="numeric" maxLength={16} />

          <div className={css.card__details}>
            <div className={css.detail}>
              <div className={css.detail__label}>Expiry Date</div>
              <div className={css.date}>
                <Input
                  register={form}
                  name="month"
                  placeholder="MM"
                  maxLength={2}
                  inputMode="numeric"
                  inputClassName={css.date__input}
                />
                /
                <Input
                  register={form}
                  name="year"
                  placeholder="YY"
                  maxLength={2}
                  inputMode="numeric"
                  inputClassName={css.date__input}
                />
              </div>
              {printWhen(errorsJSX, isDirty)}
            </div>
            <div className={css.detail}>
              <Input register={form} name="cvc" label="CVC" placeholder="***" type="password" />
            </div>
          </div>
        </form>
        <div className={css.btn}>
          <Button color="blue" disabled={formIsInvalid} onClick={onSubmit}>
            Add
          </Button>
        </div>
      </div>
    </Modal>
  );
};
