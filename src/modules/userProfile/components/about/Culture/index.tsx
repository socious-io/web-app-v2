import { translate } from 'src/core/utils';
import { IconButton } from 'src/modules/general/components/iconButton';
import variables from 'src/styles/constants/_exports.module.scss';

import { CultureProps } from './index.types';

const Culture: React.FC<CultureProps> = ({ items, onOpenPreferences }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center text-lg text-Gray-light-mode-900 font-semibold">
        {translate('culture.title')}
        <IconButton
          iconName="pencil-01"
          iconColor={variables.color_grey_600}
          iconSize={20}
          size="medium"
          customStyle="flex items-center justify-center mr-0 ml-auto"
          onClick={onOpenPreferences}
        />
      </div>
      <div className="flex flex-col gap-4">
        {items.map(item => (
          <div key={item.title} className="flex gap-3">
            <img src="/icons/circle-tick-white.svg" width={24} height={24} alt="culture" />
            <div>
              <div className="leading-6 text-Gray-light-mode-600">
                <span className="font-medium text-Gray-light-mode-900">{item.title}: </span>
                {item.value}
              </div>
              {item?.description && (
                <span className="leading-6 text-Gray-light-mode-600 break-all">{item.description}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Culture;
