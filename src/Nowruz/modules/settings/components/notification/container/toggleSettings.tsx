import { ToggleButton } from "src/Nowruz/modules/general/components/toggleButton"

import css from "./toggleSettings.module.scss";

interface notificationDetailsProps {
    title: string;
    content: string;
    type: string;
    push: boolean;
    inApp: boolean;
    email: boolean;
    changeToggleValue: () => void;
    
  }

export const ToggleSettings:React.FC<notificationDetailsProps> = ({title,content,type,push,inApp,email,changeToggleValue}) => {
    return (
        <>
            <div className={css.borderSection}>
                <div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
                    <div>
                        <label>{title}</label>
                        <p>
                            {content}
                        </p>
                    </div>
                    <div className='col-span-2'>
                        <div className={css.item}>
                            <ToggleButton checked={push} size="small" onChange={changeToggleValue}/>
                            <div className="flex flex-col">
                                <p className={css.title}>Push</p>
                            </div>
                        </div>
                        <div className={css.item}>
                            <ToggleButton checked={inApp} size="small" onChange={changeToggleValue}/>
                            <div className="flex flex-col">
                                <p className={css.title}>in-app</p>
                            </div>
                        </div>
                        <div className={css.item}>
                            <ToggleButton checked={email} size="small" onChange={changeToggleValue}/>
                            <div className="flex flex-col">
                                <p className={css.title}>Email</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    )
}