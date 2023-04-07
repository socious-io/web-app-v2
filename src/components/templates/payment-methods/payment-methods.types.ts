import { ButtonProps } from "src/components/atoms/button/button.types";

export interface PaymentMethodsProps {
  crypto_method: React.ReactNode;
  fiat_method?: React.ReactNode;
  containerClassName?: string;
}
