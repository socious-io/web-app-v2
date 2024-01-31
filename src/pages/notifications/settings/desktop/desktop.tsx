import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion } from 'src/components/atoms/accordion/accordion';
import { Button } from 'src/components/atoms/button/button';
import { Card } from 'src/components/atoms/card/card';
import { Toggle } from 'src/components/atoms/toggle';
import { BackLink } from 'src/components/molecules/back-link';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { printWhen } from 'src/core/utils';
import { useAuth } from 'src/hooks/use-auth';
import { useSettingsShared } from 'src/pages/notifications/settings/settings.shared';
import translate from 'src/translations';

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
    settingsGuide,
  } = useSettingsShared();
  const [closeAlert, setCloseAlert] = useState(false);
  const { isLoggedIn } = useAuth();

  const turnedOffMessageBoxJSX = (
    <div className={css.header}>
      <div className={css.turnedOffMessageBox}>
        <div className={css.turnOffInfo}>
          <img src="/icons/info.svg" height={18} width={18} alt="" />
          <div className={css.turnedOffMessage}>
            We recommend you turn on all notifications to stay up to date with the latest activity on Socious.
          </div>
        </div>
        <img src="/icons/close-white.svg" height={16} width={16} onClick={() => setCloseAlert(true)} alt="" />
      </div>
    </div>
  );

  return (
    <>
      {printWhen(turnedOffMessageBoxJSX, !allowedNotifications && !closeAlert)}
      <TwoColumnCursor visibleSidebar={isLoggedIn}>
        <BackLink title="Notifications" onBack={() => navigate('/notifications')} />
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
                            payload[setting.type]?.in_app !== undefined ? payload[setting.type].in_app : setting.in_app
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
                              payload[setting.type]?.email !== undefined ? payload[setting.type].email : setting.email
                            }
                            onChange={(checked) => onChange(checked, setting.type, 'email')}
                          />
                        </div>
                        <span className={css.notification__subtitle}>
                          To manage your email notification settings, please{' '}
                          <a href={settingsGuide} className={css.notification__link} target="_blank" rel="noreferrer">
                            click here
                          </a>
                        </span>
                      </div>
                      <div className={css.notification}>
                        Push
                        <Toggle
                          name="push"
                          checked={
                            payload[setting.type]?.push !== undefined ? payload[setting.type].push : setting.push
                          }
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
            !!settings.length && allowedNotifications,
          )}
        </Card>
      </TwoColumnCursor>
    </>
  );
};
