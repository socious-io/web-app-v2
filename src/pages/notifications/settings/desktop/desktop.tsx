import { useState } from 'react';
import { useNavigate } from '@tanstack/react-location';
import { BackLink } from 'src/components/molecules/back-link';
import { Card } from 'src/components/atoms/card/card';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { Toggle } from 'src/components/atoms/toggle';
import { Accordion } from 'src/components/atoms/accordion/accordion';
import { Button } from 'src/components/atoms/button/button';
import { printWhen } from 'src/core/utils';
import translate from 'src/translations';
import { useSettingsShared } from '../settings.shared';
import css from './desktop.module.scss';

export const Desktop: React.FC = () => {
  const navigate = useNavigate();
  const {
    generateSettings: settings,
    payload,
    onChange,
    onConfirm,
    onAllowNotifications,
    allowedNotifications,
  } = useSettingsShared();
  const [closeAlert, setCloseAlert] = useState(false);

  const turnedOffMessageBoxJSX = (
    <div className={css.header}>
      <div className={css.turnedOffMessageBox}>
        <div className={css.turnOffInfo}>
          <img src="/icons/info.svg" height={18} width={18} />
          <div className={css.turnedOffMessage}>
            We recommend you turn on all notifications to stay up to date with the latest activity on Socious.
          </div>
        </div>
        <img src="/icons/close-white.svg" height={16} width={16} onClick={() => setCloseAlert(true)} />
      </div>
    </div>
  );

  return (
    <>
      {printWhen(turnedOffMessageBoxJSX, !allowedNotifications && !closeAlert)}
      <TwoColumnCursor>
        <BackLink title="Notifications" onBack={() => navigate({ to: '/notifications' })} />
        <Card>
          <div className={`${css.notification_all} ${!allowedNotifications && css['notification_all--noBorder']}`}>
            Allow notifications
            <Toggle name="all" checked={allowedNotifications} onChange={onAllowNotifications} />
          </div>
          {printWhen(
            <>
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
              <Button color="blue" onClick={() => onConfirm(payload)} className={css.btn}>
                Save settings
              </Button>
            </>,
            !!settings.length && allowedNotifications
          )}
        </Card>
      </TwoColumnCursor>
    </>
  );
};
