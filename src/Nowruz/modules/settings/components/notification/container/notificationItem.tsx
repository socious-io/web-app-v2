import { ToggleButton } from "src/Nowruz/modules/general/components/toggleButton"

import css from "./notificationItem.module.scss";

interface notificationDetailsProps {
    type: string;
    push: boolean;
    inApp: boolean;
    email: boolean;
    changeToggleValue: () => void;
  }

export const NotificationItem:React.FC<notificationDetailsProps> = ({type,push,inApp,email,changePushValue,changeInAppValue,changeEmailValue}) => {
    return (
        <>
            <div className={css.borderSection}>
                <div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
                    <div>
                        <label>{type}</label>
                    </div>
                    <div className='col-span-2'>
                        <div className={css.item}>
                            <ToggleButton checked={push} size="small" onChange={changePushValue}/>
                            <div className="flex flex-col">
                                <p className={css.title}>Push</p>
                            </div>
                        </div>
                        <div className={css.item}>
                            <ToggleButton checked={inApp} size="small" onChange={changeInAppValue}/>
                            <div className="flex flex-col">
                                <p className={css.title}>in-app</p>
                            </div>
                        </div>
                        <div className={css.item}>
                            <ToggleButton checked={email} size="small" onChange={changeEmailValue}/>
                            <div className="flex flex-col">
                                <p className={css.title}>Email</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    );
};