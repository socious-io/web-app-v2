import { Divider } from '@mui/material';
import { Icon } from 'src/Nowruz/general/Icon';

export const Plan = () => {
  const link = 'https://billing.stripe.com/p/login/00gdTbcvn4MNaGY7ss';
  return (
    <div className="w-full flex flex-col ">
      <span className="mb-1 text-lg font-semibold text-Gray-light-mode-900">Plan</span>
      <span className="mb-5 text-sm font-normal text-Gray-light-mode-600">
        Manage your plan and payment details via Stripe.
      </span>
      <Divider />
      <div className="mt-6">
        <a target="_blank" href={link} rel="noreferrer" className="flex gap-2 text-sm font-semibold text-Brand-700">
          Manage my subscription
          <Icon name="arrow-up-right" fontSize={20} className="text-Brand-700" />
        </a>
      </div>
    </div>
  );
};
