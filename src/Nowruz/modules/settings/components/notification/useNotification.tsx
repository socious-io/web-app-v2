import { useEffect, useState } from 'react';
import { NotificationSetting, NotificationType, notificationSettings, updateNotificationSettings } from 'src/core/api';
import translate from 'src/translations';

import { SettingsItem, ToggleButtonItem } from './payload.type';

export const useNotification = () => {
  const [settings, setSettings] = useState<NotificationSetting[]>([]);
  const [mappedSettings, setmappedSettings] = useState<SettingsItem[]>([]);
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    notificationSettings().then((e) => {
      setSettings(e.settings);
    });
  }, []);

  const changeSetting = async (type: string, toggleButtonLabel: 'email' | 'in_app' | 'push') => {
    const settingVal = [...settings];
    const idx = settingVal.findIndex((item) => item.type === type);
    settingVal[idx][toggleButtonLabel] = !settingVal[idx][toggleButtonLabel];
    setSettings(settingVal);
    await updateNotificationSettings({ settings: settingVal });
  };

  const getToggleButtons = (type: NotificationType) => {
    return [
      {
        text: 'Push',
        checked: settings.find((s) => s.type === type)?.push || false,
        onChange: () => changeSetting(type, 'push'),
      },
      {
        text: 'In-app',
        checked: settings.find((s) => s.type === type)?.in_app || false,
        onChange: () => changeSetting(type, 'in_app'),
      },
      {
        text: 'Email',
        checked: settings.find((s) => s.type === type)?.email || false,
        onChange: () => changeSetting(type, 'email'),
      },
    ];
  };

  const mapSetting = () => {
    const isAllChecked = settings.every((s) => s.in_app && s.email && s.push);
    setAllChecked(isAllChecked);
    let mapped: SettingsItem[] = [];

    let label = 'Allow notifications';
    let description = '';
    let list: ToggleButtonItem[] = [
      {
        text: 'Allow all',
        checked: isAllChecked,
        onChange: onAllowNotifications,
      },
    ];

    mapped.push({ label, description, toggleButtons: list });

    label = 'Likes';
    description = 'These are notifications for when someone likes your post.';
    list = getToggleButtons('POST_LIKE');
    mapped.push({ label, description, toggleButtons: list });

    label = 'Comments';
    description = 'These are notifications for comments on your posts and replies to your comments.';
    list = getToggleButtons('COMMENT');
    mapped.push({ label, description, toggleButtons: list });

    const rest = settings
      .filter((s) => s.type !== 'POST_LIKE' && s.type !== 'COMMENT')
      .map((item) => {
        return { label: translate(item.type), description: '', toggleButtons: getToggleButtons(item.type) };
      });
    mapped = mapped.concat(rest);
    setmappedSettings(mapped);
  };

  useEffect(() => {
    if (settings.length) mapSetting();
  }, [settings]);

  function onAllowNotifications() {
    setAllChecked(!allChecked);
    const t = settings.map((x) => {
      x.in_app = !allChecked;
      x.email = !allChecked;
      x.push = !allChecked;
      return x;
    });
    setSettings(t);
  }

  return {
    settings,
    onAllowNotifications,
    mappedSettings,
  };
};
