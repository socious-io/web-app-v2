import { useEffect, useState } from "react";
import { notificationSettings, updateNotificationSettings } from "src/core/api";


export const useNotification = () => {
      
    useEffect(() => {
      notificationSettings().then(e => {
        setGenerateSettings(e.settings);
        setAllChekced(e.settings.every((setting) => setting.in_app && setting.email && setting.push));
      });
    }, []);

    const settings = [];
    const [generateSettings, setGenerateSettings] = useState(settings);
    const notAllow = generateSettings.every((setting) => setting.in_app && setting.email && setting.push);
    const [allChecked, setAllChekced] = useState(!notAllow);

    function onChange(checked: boolean, type: NotificationType, key: string) {
        const t = generateSettings.map(x => { if (x.type === type) { x[key] = !checked; return x } else { return x } });
        setGenerateSettings(t);
        onConfirm();
    }
    async function onConfirm() {
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