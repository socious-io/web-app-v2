import { useEffect, useState } from "react";
import { notificationSettings, updateNotificationSettings } from "src/core/api";

// import { Payload } from "./payload.type";

export const useNotification = () => {
      
        useEffect(() => {
          notificationSettings().then(e => {
            setGenerateSettings(e.settings);
            setAllChekced(e.settings.every((setting) => setting.in_app && setting.email && setting.push));
          });
        }, []);

        // const [payload, setPayload] = useState<Payload>({} as Payload);
        const settings = [];
        const [generateSettings, setGenerateSettings] = useState(settings);
        const notAllow = generateSettings.every((setting) => setting.in_app && setting.email && setting.push);
        const [allChecked, setAllChekced] = useState(!notAllow);

        function onChange(checked: boolean, type: NotificationType, key: string) {
            const t = generateSettings.map(x => { if (x.type === type) { x[key] = !checked; return x } else { return x } });
            setGenerateSettings(t);
            // setPayload({ ...payload, [type]: { ...payload[type], [key]: checked } });
            onConfirm();
        }
        async function onConfirm() {
            // const payloadRes =
            //   payload &&
            //   Object.entries(payload).map(([key, obj]) => {
            //     const defaultValueOfKey = generateSettings.find((setting) => setting.type === key);
            //     return {
            //       type: key,
            //       in_app: obj.in_app !== undefined ? obj.in_app : (defaultValueOfKey?.in_app as boolean),
            //       email: obj.email !== undefined ? obj.email : (defaultValueOfKey?.email as boolean),
            //       push: obj.push !== undefined ? obj.push : (defaultValueOfKey?.push as boolean),
            //     };
            //   });
            // const keys = new Set(payloadRes.map((d) => d.type));
            // const merged = [...generateSettings.filter((setting) => !keys.has(setting.type)), ...payloadRes];
            updateNotificationSettings({ settings: generateSettings } as NotificationsSettings);
        }

        function onAllowNotifications() {
            setAllChekced(!allChecked);
            const t = generateSettings.map(x => { x.in_app = !allChecked; x.email = !allChecked; x.push = !allChecked; return x });
            setGenerateSettings(t);
            onConfirm();
        }

    return{allChecked,generateSettings,onAllowNotifications,onConfirm,onChange};
    
};