import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { useEmailInvitation } from './useEmailInvitation';
import { ModalCentered } from '../../general/components/modalCentered';
import { Input } from '../../general/components/input/input';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from '../../general/components/Button';
import { IconButton } from '../../general/components/iconButton';

interface EmailInvitationProps {
  open: boolean;
  handleClose: () => void;
  handleSend: () => void;
  emails: string[];
  setEmails: (val: string[]) => void;
}
export const EmailInvitation: React.FC<EmailInvitationProps> = ({
  open,
  handleClose,
  handleSend,
  emails,
  setEmails,
}) => {
  const { error, handleChangeInput, email, handleAddEmail, handleDeleteEmail } = useEmailInvitation(emails, setEmails);
  return (
    <ModalCentered
      open={open}
      onClose={handleClose}
      onSubmit={handleSend}
      title="Invite by email"
      closeButtn={false}
      submitButton={true}
      submitButtonLabel="Send invite"
      disableSubmitButton={!emails.length}
    >
      <div className="py-6 md:pb-8 flex flex-col gap-5">
        <div className="flex flex-col">
          <Input
            label="Add emails"
            id="email"
            value={email}
            onChange={(e) => handleChangeInput(e.target.value)}
            placeholder="Enter an email"
            errors={error ? [error] : undefined}
            startIcon={<Icon name="mail-01" fontSize={20} className="text-Gray-light-mode-500" />}
          />
          <Button variant="text" color="primary" onClick={handleAddEmail}>
            Add email
          </Button>
        </div>
        {!!emails.length && (
          <div className="w-full max-h-[250px] overflow-y-auto">
            <div className="py-3 px-6 bg-Gray-light-mode-50 border border-solid border-t-0 border-x-0 border-b border-b-Gray-light-mode-200 ">
              <span className="text-xs font-medium text-Gray-light-mode-600">Added emails</span>
            </div>
            {emails.map((item) => (
              <div
                key={item}
                className="py-1 px-6 border border-solid border-t-0 border-x-0 border-b border-b-Gray-light-mode-200 flex justify-between items-center"
              >
                <span className="text-sm font-medium text-Gray-light-mode-600">{item}</span>
                <IconButton
                  iconName="trash-01"
                  iconColor={variables.color_grey_600}
                  iconSize={20}
                  size="medium"
                  handleClick={() => handleDeleteEmail(item)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </ModalCentered>
  );
};

export default EmailInvitation;
