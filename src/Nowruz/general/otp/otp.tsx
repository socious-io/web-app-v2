import { useState } from 'react';
import OtpInput from 'react-otp-input';

import css from './otp.module.scss';

const handlePaste: React.ClipboardEventHandler = (event) => {
  const data = event.clipboardData.getData('text');
  console.log(data);
};

export const OTP: React.FC = () => {
  const [value, setValue] = useState('');
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
