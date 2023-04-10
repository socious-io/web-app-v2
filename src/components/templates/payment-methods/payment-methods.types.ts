import { CardItems } from 'src/core/types';

export interface PaymentMethodsProps {
  crypto_method: React.ReactNode;
  fiat_method?: React.ReactNode;
  added_cards?: CardItems[];
  selectedCard?: string;
  onSelectCard?: (value: string) => void;
  onEditCard?: (value: string) => void;
  onRemoveCard?: (value: string) => void;
  containerClassName?: string;
}
