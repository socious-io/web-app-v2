import OtpInput from 'react-otp-input';

import css from './otp.module.scss';
import { OTPProps } from './otp.types';

const handlePaste: React.ClipboardEventHandler = (event) => {
  const data = event.clipboardData.getData('text');
  console.log(data);
};

export const OTP: React.FC<OTPProps> = ({ value, setValue }) => {
  return (
    <OtpInput
      value={value}
      onChange={setValue}
      onPaste={handlePaste}
      numInputs={6}
      placeholder="______"
      inputStyle={css.input}
      inputType="tel"
      renderInput={(props) => <input {...props} />}
    />
  );
};
