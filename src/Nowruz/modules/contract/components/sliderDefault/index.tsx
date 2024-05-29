import React from 'react';
import { AlertMessage } from 'src/Nowruz/modules/general/components/alertMessage';
import { Button } from 'src/Nowruz/modules/general/components/Button';

interface SliderCanceledProps {
  alertMessage: string;
  disableMessage: boolean;
  redirectToChat: () => void;
}

export const SliderDefault: React.FC<SliderCanceledProps> = ({ alertMessage, disableMessage, redirectToChat }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        {!disableMessage && (
          <Button variant="outlined" color="secondary" fullWidth onClick={redirectToChat} disabled={disableMessage}>
            Message
          </Button>
        )}
      </div>
      <AlertMessage theme="gray" iconName="alert-circle" title={alertMessage} subtitle="" />
    </div>
  );
};
