import { Button } from "src/components/atoms/button/button";
import { Card } from "src/components/atoms/card/card";
import css from "./payment-methods.module.scss";
import { PaymentMethodsProps } from "./payment-methods.types";

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  payement_methods,
  containerClassName = "",
}) => {
  return (
    <Card className={`${css["connect"]} ${containerClassName}`}>
      {payement_methods.map((method) =>
        !method.connected_address ? (
          <Button
            key={method.connected_address}
            {...method.button}
            className={`${css["connect__btn"]} ${method.button.className}`}
          />
        ) : (
          <div
            key={method.connected_address}
            className={css["connect__address"]}
          >
            {method.connected_address}
          </div>
        )
      )}
      <div className={css["connect__text"]}>
        All payments in Socious are done with cryptocurrencies or credit card.
        By connecting a wallet, you agree to Socious’
        <a className={css["connect__link"]} href="/terms-conditions">
          {" "}
          terms & conditions.
        </a>
      </div>
      <div className={css["connect__text"]}>
        To learn more about payments,{" "}
        <a className={css["connect__link"]} href="">
          visit our FAQ.
        </a>
      </div>
    </Card>
  );
};
