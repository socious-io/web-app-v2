export const translatePaymentRange = (
  lower: string,
  higher: string,
  type: string,
  scheme: string
): {
  value: string;
  label: string;
} => {
  const label = `${type}-${scheme}`;
  const rangeLabelValue: Record<string, { value: string; label: string }> = {
    'PAID-FIXED': {
      label: 'Payment range',
      value: `$${lower} ~ $${higher}`,
    },
    'PAID-HOURLY': {
      label: 'Payment range',
      value: `$${lower} ~ $${higher} / hr`,
    },
    'VOLUNTEER-FIXED': {
      label: 'Commitment',
      value: `${lower} ~ ${higher} hrs`,
    },
    'VOLUNTEER-HOURLY': {
      label: 'Weekly hours',
      value: `${lower} ~ ${higher} hrs / week`,
    },
  };
  return rangeLabelValue[label];
};
