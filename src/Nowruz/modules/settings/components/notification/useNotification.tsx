import { useEffect, useState } from "react";
import { notificationSettings } from "src/core/api";

export const useNotification = () => {
    const [allowNotif, setAllowNotif] = useState(false);
    const settings = 
        [
          {
            "type": "FOLLOWED",
            "in_app": true,
            "email": false,
            "push": true
          },
          {
            "type": "APPLICATION",
            "email": true,
            "in_app": true,
            "push": true
          }
        ];


    // Likes 
    const [likePush, setLikePush] = useState(false);
    const [likeInapp, setLikeInapp] = useState(false);
    const [likeEmail, setLikeEmail] = useState(false);
    // Comments 

    const [commentPush, setCommentPush] = useState(false);
    const [commentInapp, setCommentInapp] = useState(false);
    const [commentEmail, setCommentEmail] = useState(false);

    // Tags 


    const [tagsPush, setTagsPush] = useState(false);
    const [tagsInapp, setTagsInapp] = useState(false);
    const [tagsEmail, setTagsEmail] = useState(false);

    // Reminder 

    const [remindersPush, setRemindersPush] = useState(false);
    const [remindersInapp, setRemindersInapp] = useState(false);
    const [remindersEmail, setRemindersEmail] = useState(false);


    



    useEffect(() => {
        // console.log('notifValues',notifValues);
        handleAllowAll();
    }, []);

    const handleAllowAll = () => {
        setAllowNotif(current => !current);
        if (allowNotif) {

            setLikePush(true);
            setLikeInapp(true);
            setLikeEmail(true);

            setCommentPush(true);
            setCommentInapp(true);
            setCommentEmail(true);

            setTagsPush(true);
            setTagsInapp(true);
            setTagsEmail(true);

            setRemindersPush(true);
            setRemindersInapp(true);
            setRemindersEmail(true);
            
        } else {
            setLikePush(false);
            setLikeInapp(false);
            setLikeEmail(false);

            setCommentPush(false);
            setCommentInapp(false);
            setCommentEmail(false);

            setTagsPush(false);
            setTagsInapp(false);
            setTagsEmail(false);

            setRemindersPush(false);
            setRemindersInapp(false);
            setRemindersEmail(false);
        }
        
    };

    return{allowNotif, handleAllowAll,settings,likePush,likeInapp,likeEmail,commentPush,commentInapp,commentEmail,tagsPush,tagsInapp,tagsEmail,remindersPush,remindersInapp,remindersEmail};
    
};