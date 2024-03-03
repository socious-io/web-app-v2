import { ToggleButton } from "src/Nowruz/modules/general/components/toggleButton";

import css from "./notification.module.scss";
import { useNotification } from "./useNotification";

const Notification = () => {
    const {allowNotif, handleAllowAll,settings,
        likePush,likeInapp,likeEmail,commentPush,commentInapp,commentEmail,
        tagsPush,tagsInapp,tagsEmail,remindersPush,remindersInapp,remindersEmail} = useNotification();
    console.log('settings',settings);
    
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
                    <label>Allow notifications</label>
                    <div className='col-span-2'>
                        <div className={css.item}>
                            <ToggleButton checked={!allowNotif} onChange={handleAllowAll} size="small" />
                            <div className="flex flex-col">
                                <p className={css.title}>Allow All</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={css.borderSection}>
                <div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
                    <div>
                        <label>Likes</label>
                        <p>
                            These are notifications for when someone likes your post.
                        </p>
                    </div>
                    <div className='col-span-2'>
                        <div className={css.item}>
                            <ToggleButton checked={likePush} size="small" />
                            <div className="flex flex-col">
                                <p className={css.title}>Push</p>
                            </div>
                        </div>
                        <div className={css.item}>
                            <ToggleButton checked={likeInapp} size="small" />
                            <div className="flex flex-col">
                                <p className={css.title}>in-app</p>
                            </div>
                        </div>
                        <div className={css.item}>
                            <ToggleButton checked={likeEmail} size="small" />
                            <div className="flex flex-col">
                                <p className={css.title}>Email</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 

            <div className={css.borderSection}>
                <div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
                    <div>
                        <label>Comments</label>
                        <p>
                        These are notifications for comments on your posts and replies to your comments.
                        </p>
                    </div>
                    <div className='col-span-2'>
                        <div className={css.item}>
                            <ToggleButton checked={commentPush} size="small" />
                            <div className="flex flex-col">
                                <p className={css.title}>Push</p>
                            </div>
                        </div>
                        <div className={css.item}>
                            <ToggleButton checked={commentInapp} size="small" />
                            <div className="flex flex-col">
                                <p className={css.title}>in-app</p>
                            </div>
                        </div>
                        <div className={css.item}>
                            <ToggleButton checked={commentEmail} size="small" />
                            <div className="flex flex-col">
                                <p className={css.title}>Email</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className={css.borderSection}>
                <div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
                    <div>
                        <label>Tags</label>
                        <p>
                        These are notifications for when someone tags you in a comment, post or story.
                        </p>
                    </div>
                    <div className='col-span-2'>
                        <div className={css.item}>
                            <ToggleButton checked={tagsPush} size="small" />
                            <div className="flex flex-col">
                                <p className={css.title}>Push</p>
                            </div>
                        </div>
                        <div className={css.item}>
                            <ToggleButton checked={tagsInapp} size="small" />
                            <div className="flex flex-col">
                                <p className={css.title}>in-app</p>
                            </div>
                        </div>
                        <div className={css.item}>
                            <ToggleButton checked={tagsEmail} size="small" />
                            <div className="flex flex-col">
                                <p className={css.title}>Email</p>
                            </div>
                        </div>
                    </div> 
                    
                </div>
            </div>
            <div className={css.borderSection}>
                <div className='grid grid-cols-1 lg:grid-cols-5 gap-4'>
                    <div>
                        <label>Reminders</label>
                        <p>
                        These are notifications to remind you of updates you might have missed.                        </p>
                    </div>
                    <div className='col-span-2'>
                        <div className={css.item}>
                            <ToggleButton checked={remindersPush} size="small" />
                            <div className="flex flex-col">
                                <p className={css.title}>Push</p>
                            </div>
                        </div>
                        <div className={css.item}>
                            <ToggleButton checked={remindersInapp} size="small" />
                            <div className="flex flex-col">
                                <p className={css.title}>in-app</p>
                            </div>
                        </div>
                        <div className={css.item}>
                            <ToggleButton checked={remindersEmail} size="small" />
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

export default Notification;