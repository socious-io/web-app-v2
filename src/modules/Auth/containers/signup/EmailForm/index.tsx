import { Google } from 'public/icons/nowruz/google';
import { Button } from 'src/modules/general/components/Button';
import { Input } from 'src/modules/general/components/input/input';

import { useEmailForm } from './useEmailForm';

interface EmailFormProps {
  eventId: string;
}

export const EmailForm: React.FC<EmailFormProps> = ({ eventId }) => {
  const { register, errors, onSubmit, handleSubmit, navigate, translate } = useEmailForm(eventId);

  const type = localStorage.getItem('registerFor');
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="email"
          autoComplete="Email"
          label={type === 'user' ? translate('sign-up-user-email') : translate('sign-up-org-email')}
          name="email"
          register={register}
          placeholder={translate('sign-up-email-placeholder')}
          errors={errors['email']?.message ? [errors['email']?.message.toString()] : undefined}
        />
        <div className="mt-8 flex flex-col gap-4">
          <Button color="primary" block onClick={handleSubmit(onSubmit)}>
            {translate('sign-up-continue')}
          </Button>
          {/* <Button
            color="primary"
            variant="outlined"
            onClick={() => navigate('/oauth/google')}
            style={{ display: 'flex', gap: '12px' }}
          >
            <Google />
            Continue with Google
          </Button> */}
        </div>
      </form>
    </>
  );
};
