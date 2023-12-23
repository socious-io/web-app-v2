import { useEffect, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
import { config } from 'src/config';
import { nonPermanentStorage } from 'src/core/storage/non-permanent';

const STORAGE_KEY = 'TRY_COUNTER';
const TRY_LIMIT = 6;

export const useCaptcha = () => {
  const [verified, setVerified] = useState<boolean | null>(null);
  const [counter, setCounter] = useState(0);
  const [required, setRequired] = useState(false);

  useEffect(() => {
    nonPermanentStorage.get(STORAGE_KEY).then((c: any) => {
      if (c) {
        const current = parseInt(c);
        setCounter(current);
        if (current > TRY_LIMIT) setRequired(true);
      }
    });
    
  }, [counter, verified]);

  const tried = async () => {
    const current = counter + 1;
    setCounter(current);
    await nonPermanentStorage.set({key: STORAGE_KEY, value: `${current}`}, 1);
    if (current > TRY_LIMIT) setRequired(true);
  };

  const change = async (value: string | null) => {
    // TODO: send value to BE and verify it
    if (value) {
      setVerified(true);
      setCounter(0);
      await nonPermanentStorage.set({key: STORAGE_KEY, value: `0`}, 1);
      setRequired(false);
    }
  };

  return { verified, setVerified, required, tried, change };
};

export const Captcha = () => {
  const navigate = useNavigate();
  const { verified, change } = useCaptcha();

  useEffect(() => {
    if (verified) {
      navigate(-1);
    }
  }, [verified]);

  return (
    <div>
      <ReCAPTCHA sitekey={config.googleRecaptchaSiteKey} onChange={change} />
    </div>
  );
};
