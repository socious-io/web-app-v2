import { Card } from 'src/components/atoms/card/card';
import { Link } from 'src/components/atoms/link/link';
import { SelectCard } from 'src/components/molecules/select-card';
import { printWhen } from 'src/core/utils';

import css from './payment-methods.module.scss';
import { PaymentMethodsProps } from './payment-methods.types';

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  crypto_method,
  fiat_method,
  added_cards = [],
  selectedCard,
  onSelectCard,
  onEditCard,
  onRemoveCard,
  containerClassName = '',
}) => {
  return (
    <Card className={`${css['connect']} ${containerClassName}`}>
      <div className={css['connect__crypto']}>{crypto_method}</div>
      {fiat_method}
      {printWhen(
        <div className={css['connect__cards']}>
          {added_cards.map((card) => (
            <div className={css['connect__card']} key={card.id}>
              <SelectCard
                name={card.meta.brand}
                id={card.id}
                value={card.id}
                text={`**** ${card.meta.last4}`}
                checked={card.id === selectedCard}
                imageProps={{ src: '/icons/debit.svg', width: 18, height: 18 }}
                onChange={(value) => onSelectCard?.(value as string)}
                cardClass={css['connect__card--select']}
              />
              <div className={css['connect__actions']}>
                {onEditCard && <Link onClick={() => onEditCard?.(card.id)}>Edit</Link>}
                {onRemoveCard && <Link onClick={() => onRemoveCard?.(card.id)}>Remove</Link>}
              </div>
            </div>
          ))}
        </div>,
        !!added_cards.length,
      )}
      <div className={css['connect__text']}>
        All payments in Socious are done with cryptocurrencies or credit card. By connecting a wallet, you agree to
        Socious’
        <a className={css['connect__link']} href="/terms-conditions">
          {' '}
          terms & conditions.
        </a>
      </div>
      <div className={css['connect__text']}>
        To learn more about payments,{' '}
        <a className={css['connect__link']} href="">
          visit our FAQ.
        </a>
      </div>
    </Card>
  );
};
