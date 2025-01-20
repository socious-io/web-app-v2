import { translate } from 'src/core/utils';
import AlertMessage from 'src/modules/general/components/AlertMessage';
import { Button } from 'src/modules/general/components/Button';

import { ContractSliderProps } from '../ContractDetailsSlider/index.types';

const SliderCanceled: React.FC<ContractSliderProps> = ({ alertMessage, disableMessage, redirectToChat }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <Button variant="outlined" color="secondary" fullWidth onClick={redirectToChat} disabled={disableMessage}>
          {translate('cont-message')}
        </Button>
      </div>
      {alertMessage && (
        <AlertMessage theme="gray" iconName="alert-circle" title={alertMessage} containerClassName="!items-center" />
      )}
    </div>
  );
};

export default SliderCanceled;
