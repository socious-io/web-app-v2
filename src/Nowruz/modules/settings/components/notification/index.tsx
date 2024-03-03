import { ToggleButton } from "src/Nowruz/modules/general/components/toggleButton";

import css from "./notification.module.scss";
import { useNotification } from "./useNotification";

const Notification = () => {
    const {allChecked,onAllowNotifications,generateSettings,onChange} = useNotification();

    return(
        <>
            <div>
                <div className="w-full py-8 items-center">
                    <h2 className="grow css.title text-lg font-semibold">Notification settings</h2>
                    <p className='text-sm font-normal text-Gray-light-mode-600 pt-1'>
                    We may still send you important notifications about your account outside of your notification settings.
                    </p>
                </div>
            </div>
            <div className={css.borderSection}>
                <div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
                    <label className="text-Gray-light-mode-700">Allow notifications</label>
                    <div className='col-span-2'>
                        <div className={css.item}>
                            <ToggleButton checked={allChecked} onChange={onAllowNotifications} size="small" />
                            <div className="flex flex-col">
                                <p className={css.title}>Allow All</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {generateSettings.length > 0 && generateSettings.map((item) => (

                <div className={css.borderSection}>
                    <div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
                        <div>
                            <label className="capitalize text-sm font-semibold text-Gray-light-mode-700 leading-5">{item.type ? item.type.toLowerCase() : item.type}</label>
                            <p className="text-sm font-normal text-Gray-light-mode-600">
                            These are notifications for when someone likes your post.
                            </p>
                        </div>
                        <div className='col-span-2'>
                            <div className={css.item}>
                                <ToggleButton checked={item.push} size="small" onChange={() => onChange(item.push, item.type, 'push')}/>
                                <div className="flex flex-col">
                                    <p className={css.title}>Push</p>
                                </div>
                            </div>
                            <div className={css.item}>
                                <ToggleButton checked={item.in_app} size="small" onChange={() => onChange(item.in_app, item.type, 'in_app')}/>
                                <div className="flex flex-col">
                                    <p className={css.title}>in-app</p>
                                </div>
                            </div>
                            <div className={css.item}>
                                <ToggleButton checked={item.email} size="small" onChange={() => onChange(item.email, item.type, 'email')}/>
                                <div className="flex flex-col">
                                    <p className={css.title}>Email</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 

            ))}
            
        </>
    );
};

export default Notification;