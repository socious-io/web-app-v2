import { useNavigate } from '@tanstack/react-location';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getIdentities } from '../../../../core/api';
import { IdentityReq } from '../../../../core/types';
import { RootState } from '../../../../store/store';
import { Avatar } from '../../../atoms/avatar/avatar';
import { Button } from '../../../atoms/button/button';
import { getSession } from '../menu.service';
import css from './mobile.module.scss';
import { AccountsModel } from './mobile.types';

export const Mobile = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);


    const identity = useSelector<RootState, IdentityReq>((state) => {
        return state.identity.entities.find((identity) => identity.current) as IdentityReq;
    });

    const avatarImg = identity?.meta?.avatar || identity?.meta?.image;
    const avatarType = identity?.type;

    const accountList = useSelector<RootState, AccountsModel[]>((state) => {
        return state.identity.entities.map(item => {
            return {
                name: item.meta.name,
                image: item.meta.image,
                type: item.type,
                id: item.id
            }
        });
    });


    const closePage = () => {
        console.log('dddd');
    }

    const navigatTojobs = (id: string) => {
        getSession(id).then(resp => {
            if (resp.message === "success") {
                getIdentities().then(() => navigate({ to: '../jobs' }));
            }
        })
    }

    return (
        <div className={`${isOpen ? css.active : css.deactive}`}>
            <div className={`${css.container}`} onClick={closePage}></div>
            <div className={css.sidbar}>
                <div className={css.header}>
                    <div className={css.organization}>
                        <Button color='white' width='160px'>Add organization</Button>
                        <div className={css.dotIcon}>
                            <img src="/icons/three-dots-blue.svg" alt="" />
                        </div>
                    </div>
                    <div className={css.info}>
                        <Avatar size='3rem' type={avatarType} img={avatarImg} />
                        <div className={css.nameInfo}>
                            <span className={css.fullname}>Azin Zare</span>
                            <span className={css.profile}>view my profile</span>
                        </div>
                    </div>
                    <div className={css.connections}>
                        <span>4 Connections</span>
                        <span>11 Followers</span>
                    </div>
                </div>
                <div className={css.items}>
                    <div className={css.title}>Jobs</div>
                    <div className={css.row}>
                        <img src="/icons/document-black.svg" />
                        <span>My applications</span>
                    </div>
                    <div className={css.row}>
                        <img src="/icons/folder-black.svg" />
                        <span>Hired jobs</span>
                    </div>
                </div>
                <div className={css.items}>
                    <div className={css.title}>Switch To</div>
                    {
                        accountList.map(item => <div onClick={() => navigatTojobs(item.id)} key={item.id} className={css.row}>
                            <Avatar size='2rem' type={item.type} img={item.image} />
                            <span>{item.name}</span>
                        </div>)
                    }

                </div>
                <div className={css.items}>
                    <div className={css.title}>Settings</div>
                    <div className={css.row}>
                        <img src="/icons/document-black.svg" />
                        <span>Privacy policy</span>
                    </div>
                    <div className={css.row}>
                        <img src="/icons/folder-black.svg" />
                        <span>Terms & conditions</span>
                    </div>
                    <div className={css.row}>
                        <img src="/icons/folder-black.svg" />
                        <span>Change password</span>
                    </div>
                    <div className={css.row}>
                        <img src="/icons/folder-black.svg" />
                        <span>Delete Account</span>
                    </div>
                </div>
                <div className={css.items}>
                    <div className={css.row}>
                        <img src="/icons/document-black.svg" />
                        <span className={css.redText}>Log out</span>
                    </div>
                </div>
            </div>

        </div>
    )
}