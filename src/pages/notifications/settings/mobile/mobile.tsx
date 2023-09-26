import { useState } from 'react';

import { Accordion } from 'src/components/atoms/accordion/accordion';
import { Header } from 'src/components/atoms/header/header';
import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { Toggle } from 'src/components/atoms/toggle';
import { Button } from 'src/components/atoms/button/button';
import { printWhen } from 'src/core/utils';
import translate from 'src/translations';
import { useSettingsShared } from '../settings.shared';
import css from './mobile.module.scss';

export const Mobile: React.FC = () => {
  const navigate = {};
  const {
    generateSettings: settings,
    payload,
    onChange,
    onConfirm,
    onAllowNotifications,
    allowedNotifications,
    settingsGuide,
  } = useSettingsShared();
  const [closeAlert, setCloseAlert] = useState(false);

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
      <Header title="Notification settings" onBack={() => navigate({ to: '/notifications' })} />
      <>
        {printWhen(turnedOffMessageBoxJSX, !allowedNotifications && !closeAlert)}
        <div className={css.notification_all}>
          Allow notifications
          <Toggle name="all" checked={allowedNotifications} onChange={onAllowNotifications} />
        </div>
        {printWhen(
          <>
            <div className={css.container}>
              {settings
                .sort((a, b) => a.type.localeCompare(b.type))
                .map((setting) => (
                  <Accordion key={setting.type} id={setting.type} title={translate(setting.type)}>
                    <div className={css.notifications}>
                      <div className={css.notification}>
                        App
                        <Toggle
                          name="app"
                          checked={
                            payload[setting.type]?.in_app != undefined ? payload[setting.type].in_app : setting.in_app
                          }
                          onChange={(checked) => onChange(checked, setting.type, 'in_app')}
                        />
                      </div>
                      <div className={css.notification__col}>
                        <div className={css.notification}>
                          Email
                          <Toggle
                            name="email"
                            checked={
                              payload[setting.type]?.email != undefined ? payload[setting.type].email : setting.email
                            }
                            onChange={(checked) => onChange(checked, setting.type, 'email')}
                          />
                        </div>
                        <span className={css.notification__subtitle}>
                          To manage your email notification settings, please{' '}
                          <a href={settingsGuide} className={css.notification__link} target="_blank">
                            click here
                          </a>
                        </span>
                      </div>
                      <div className={css.notification}>
                        Push
                        <Toggle
                          name="push"
                          checked={payload[setting.type]?.push != undefined ? payload[setting.type].push : setting.push}
                          onChange={(checked) => onChange(checked, setting.type, 'push')}
                        />
                      </div>
                    </div>
                  </Accordion>
                ))}
            </div>
            <div className={css.btn}>
              <Button color="blue" onClick={() => onConfirm(payload)}>
                Save settings
              </Button>
            </div>
          </>,
          !!settings.length && allowedNotifications
        )}
      </>
    </TopFixedMobile>
  );
};
