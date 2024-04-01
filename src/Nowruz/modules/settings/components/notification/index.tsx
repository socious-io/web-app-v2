import { Divider } from '@mui/material';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { ToggleButton } from 'src/Nowruz/modules/general/components/toggleButton';

import css from './notification.module.scss';
import { SettingsItem } from './payload.type';
import { useNotification } from './useNotification';

const Notification = () => {
  const { mappedSettings, onSave } = useNotification();

  const renderItems = (item: SettingsItem) => {
    return (
      <div className="w-full  flex flex-col">
        <Divider />

        <div
          key={item.label}
          className="w-full md:w-[856px] flex flex-col md:flex-row gap-5 md:gap-16 items-center py-6"
        >
          <div className="flex flex-col w-full md:w-[512px]">
            <span className="font-semibold text-sm text-Gray-light-mode-700">{item.label}</span>
            <span className="font-normal text-sm text-Gray-light-mode-600">{item.description}</span>
          </div>
          <div className="flex flex-col gap-4 w-full md:[w-280px]">
            {item.toggleButtons.map((btn, index) => (
              <div key={`label-toggle-${index}`} className={css.item}>
                <ToggleButton checked={btn.checked} size="small" onChange={btn.onChange} />
                <div className="flex flex-col">
                  <p className={css.title}>{btn.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div>
        <div className="w-full pb-8 items-center">
          <h2 className="grow css.title text-lg font-semibold">Notification settings</h2>
          <p className="text-sm font-normal text-Gray-light-mode-600 pt-1">
            We may still send you important notifications about your account outside of your notification settings.
          </p>
        </div>
      </div>

      {!!mappedSettings.length && mappedSettings.map((item) => renderItems(item))}
      <Button variant="contained" color="primary" customStyle="w-full md:w-fit mr-0 ml-auto" onClick={onSave}>
        Save
      </Button>
    </>
  );
};

export default Notification;
