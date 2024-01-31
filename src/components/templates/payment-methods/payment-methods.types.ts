import { Card } from 'src/core/api';

export interface PaymentMethodsProps {
  crypto_method: React.ReactNode;
  fiat_method?: React.ReactNode;
  added_cards?: Card[];
  selectedCard?: string;
  onSelectCard?: (value: string) => void;
  onEditCard?: (value: string) => void;
  onRemoveCard?: (value: string) => void;
  containerClassName?: string;
}
