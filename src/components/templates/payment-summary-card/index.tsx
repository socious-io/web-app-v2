import { Card } from "src/components/atoms/card/card";
import { PaymentDetail } from "src/components/molecules/payment-detail";
import css from "./payment-summary-card.module.scss";
import { PaymentSummaryCardProps } from "./payment-summary-card.types";

export const PaymentSummaryCard: React.FC<PaymentSummaryCardProps> = ({
  title,
  total_price,
  unit = "$",
  containerClassName = "",
  ...rest
}) => {
  return (
    <Card className={`${css["payment"]} ${containerClassName}`}>
      <div className={css["payment__title"]}>{title}</div>
      <div className={css["payment__detail"]}>
        <PaymentDetail unit={unit} {...rest} />
      </div>
      <div className={css["payment__total"]}>
        Total
        <span>
          {unit}
          {total_price.toLocaleString()}
        </span>
      </div>
    </Card>
  );
};
