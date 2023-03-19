import { ButtonProps } from "src/components/atoms/button/button.types";

export interface PaymentMethodsProps {
  payement_methods: { button: ButtonProps; connected_address?: string, wallet_icon?: string }[];
  containerClassName?: string;
}
