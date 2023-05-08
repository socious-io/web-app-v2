import { useState } from 'react';
import { useMatch } from '@tanstack/react-location';
import { NotificationSettings } from 'src/constants/constants';
import { endpoint } from 'src/core/endpoints';
import { Payload } from './settings.types';
import { NotificationSettingsRes } from 'src/core/types';

export const useSettingsShared = () => {
  const { settings } = useMatch().data as NotificationSettingsRes;
  const settingsList = settings.length ? settings : NotificationSettings;
  const [generateSettings, setGenerateSettings] = useState(settingsList);
  const [payload, setPayload] = useState<Payload>({});
  const notAllow = generateSettings.every((setting) => !setting.in_app && !setting.email && !setting.push);
  const [allChecked, setAllChekced] = useState(!notAllow);

  function onChange(checked: boolean, type: string, key: string) {
    setPayload({ ...payload, [type]: { ...payload[type], [key]: checked } });
  }

  async function onConfirm(payload: Payload) {
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

  function onAllowNotifications(checked: boolean) {
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

  return {
    settings,
    payload,
    onChange,
    onConfirm,
    onAllowNotifications,
    allowedNotifications: allChecked,
  };
};
