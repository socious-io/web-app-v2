import { useState } from 'react';
import { useMatch } from '@tanstack/react-location';
import { Accordion } from 'src/components/atoms/accordion/accordion';
import { Header } from 'src/components/atoms/header-v2/header';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { Toggle } from 'src/components/atoms/toggle';
import { Button } from 'src/components/atoms/button/button';
import { NotificationSettings } from 'src/constants/constants';
import { endpoint } from 'src/core/endpoints';
import { Payload } from '../settings.types';
import { NotificationSettingsRes } from 'src/core/types';
import { printWhen } from 'src/core/utils';
import css from './mobile.module.scss';

export const Mobile: React.FC = () => {
  const { settings } = useMatch().data as NotificationSettingsRes;
  const [payload, setPayload] = useState<Payload>({});
  const settingsList = settings.length ? settings : NotificationSettings;
  const [generateSettings, setGenerateSettings] = useState(settingsList);
  const notAllow = generateSettings.every((setting) => !setting.in_app && !setting.email && !setting.push);
  const [allChecked, setAllChekced] = useState(!notAllow);
  const [closeAlert, setCloseAlert] = useState(false);

  function manageAllNotifications(checked: boolean) {
    setAllChekced(checked);
    const result = generateSettings.map((setting) => ({
      ...setting,
      in_app: checked,
      email: checked,
      push: checked,
    }));
    setGenerateSettings(result);
    endpoint.post.notifications['settings_confirm']({ settings: result });
  }

  async function onConfirm() {
    const payloadRes =
      payload &&
      Object.entries(payload).map(([key, obj]) => {
        const defaultValueOfKey = generateSettings.find((setting) => setting.type === key);
        return {
          type: key,
          in_app: obj.in_app != undefined ? obj.in_app : (defaultValueOfKey?.in_app as boolean),
          email: obj.email != undefined ? obj.email : (defaultValueOfKey?.email as boolean),
          push: obj.push != undefined ? obj.push : (defaultValueOfKey?.push as boolean),
        };
      });
    const keys = new Set(payloadRes.map((d) => d.type));
    const merged = [...payloadRes, ...generateSettings.filter((setting) => !keys.has(setting.type))];
    endpoint.post.notifications['settings_confirm']({ settings: merged });
  }

  const turnedOffMessageBoxJSX = (
    <div className={css.turnedOffMessageBox}>
      <img src="/icons/info.svg" height={18} width={18} />
      <div className={css.turnedOffMessage}>
        We recommend you turn on all notifications to stay up to date with the latest activity on Socious.
      </div>
      <img src="/icons/close-white.svg" height={16} width={16} onClick={() => setCloseAlert(true)} />
    </div>
  );

  return (
    <TopFixedMobile>
      <Header title="Notification settings" onBack={() => history.back()} />
      <>
        {printWhen(turnedOffMessageBoxJSX, !allChecked && !closeAlert)}
        <div className={css.notification_all}>
          Allow to manage notifications
          <Toggle name="all" checked={allChecked} onChange={manageAllNotifications} />
        </div>
        {printWhen(
          <>
            <div className={css.container}>
              {generateSettings
                .sort((a, b) => a.type.localeCompare(b.type))
                .map((setting) => (
                  <Accordion key={setting.type} id={setting.type} title={setting.type.toLocaleLowerCase()}>
                    <div className={css.notifications}>
                      <div className={css.notification}>
                        App
                        <Toggle
                          name="app"
                          checked={
                            payload[setting.type]?.in_app != undefined ? payload[setting.type].in_app : setting.in_app
                          }
                          onChange={(checked) =>
                            setPayload({ ...payload, [setting.type]: { ...payload[setting.type], in_app: checked } })
                          }
                        />
                      </div>
                      <div className={css.notification}>
                        Email
                        <Toggle
                          name="email"
                          checked={
                            payload[setting.type]?.email != undefined ? payload[setting.type].email : setting.email
                          }
                          onChange={(checked) =>
                            setPayload({ ...payload, [setting.type]: { ...payload[setting.type], email: checked } })
                          }
                        />
                      </div>
                      <div className={css.notification}>
                        Push
                        <Toggle
                          name="push"
                          checked={payload[setting.type]?.push != undefined ? payload[setting.type].push : setting.push}
                          onChange={(checked) =>
                            setPayload({ ...payload, [setting.type]: { ...payload[setting.type], push: checked } })
                          }
                        />
                      </div>
                    </div>
                  </Accordion>
                ))}
            </div>
            <div className={css.btn}>
              <Button color="blue" onClick={onConfirm}>
                Confirm settings
              </Button>
            </div>
          </>,
          !!generateSettings.length && allChecked
        )}
      </>
    </TopFixedMobile>
  );
};
