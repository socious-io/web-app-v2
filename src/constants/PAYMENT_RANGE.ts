import { translate } from 'src/core/utils'; // Assuming translate function is available

export const translatePaymentRange = (
  lower: string,
  higher: string,
  type: string,
  scheme: string,
): {
  value: string;
  label: string;
} => {
  const label = `${type}-${scheme}`;
  const rangeLabelValue: Record<string, { value: string; label: string }> = {
    'PAID-FIXED': {
      label: translate('payment_range.label'),
      value: `$${lower} ~ $${higher}`,
    },
    'PAID-HOURLY': {
      label: translate('payment_range.label'),
      value: `$${lower} ~ $${higher} / hr`,
    },
    'VOLUNTEER-FIXED': {
      label: translate('commitment.label'),
      value: `${lower} ~ ${higher} hrs`,
    },
    'VOLUNTEER-HOURLY': {
      label: translate('weekly_hours.label'),
      value: `${lower} ~ ${higher} hrs / week`,
    },
  };
  return rangeLabelValue[label];
};
