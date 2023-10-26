import OtpInput from 'react-otp-input';

import css from './otp.module.scss';
import { OTPProps } from './otp.types';

const OTPInput = () => {
  return <input className={css.input} />;
};

export const OTP: React.FC<OTPProps> = ({ value, setValue }) => {
  return (
    <OtpInput value={value} onChange={setValue} numInputs={6} renderSeparator={<span>-</span>} renderInput={OTPInput} />
  );
};
