import { Button } from 'src/components/atoms/button/button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { Modal } from 'src/components/templates/modal/modal';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';

import { useRef, useState,FormEvent } from 'react';
import css from './account.module.scss';
import {
    User,Organization,identities
  } from 'src/core/api';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

import { useSelector } from 'react-redux';
import store, { RootState } from 'src/store';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { deleteAccount } from 'src/pages/delete-profile/delete-profile.service';



const Account = () => {

    const identities = useSelector<RootState, CurrentIdentity[]>((state) => {
        console.log('state',state.identity.entities)
        return state.identity.entities;
    });
    const primary = identities.find((i) => i.primary);
    console.log(primary);
    

    const user = useSelector<RootState, User | Organization | undefined>((state) => {
        console.log('user',state.identity.entities.find((i)=> i.current === true))
        return state.identity.entities.find((i)=> i.current === true)
    }) as User;

    const [modalVisibility, setModalVisibility] = useState(false);
    let reasonbody = "";
    const onChangeTextHandler = (e:any) =>{
        console.log('value', e.target.value);
        reasonbody = e.target.value
    }
    const closeAccount = () => {
        deleteAccount(reasonbody);
    }

  
    return(
        <>
            <div className="container">
                <div className="flex flex-row w-full pt-8">
                    <h2 className="grow css.title">Account Information</h2>
                    <div className="flex gap-4">
                        <div>
                            <Button color="white" className={css.cancelBtn}>Cancel</Button>
                        </div>
                        <div>
                            <Button className={css.saveBtn}>Save</Button>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={css.borderSection}>
                <div className='grid grid-cols-3 gap-4'>
                    <label>Name</label>
                    <div className='flex gap-4'>
                        <Input
                        id="name"
                        type='text'
                        value={user?.meta.name}
                        onChange={(e) => console.log(e.target.value)}
                        />
                        <Input
                        id="name"
                        type='text'
                        onChange={(e) => console.log(e.target.value)}
                        className='col-span-2'
                        />
                    </div>
                </div>
            </div>
            <div className={css.borderSection}>
                <div className='grid grid-cols-3 gap4'>
                    <label>Email Address</label>
                    <Input
                    id="email"
                    prefix={<img height={48} src="/icons/email.svg" alt="email-green-icon"/>}
                    type='email'
                    value={user?.meta?.email}
                    onChange={(e) => console.log(e.target.value)}
                    className='col-span-2'
                    />
                </div>
            </div>
            <div className={css.borderSection}>
                <div className='grid grid-cols-3 gap-4'>
                    <label>Username</label>
                    <Input
                    id="username"
                    prefix="socious.io/"
                    value={user?.meta.username}
                    onChange={(e) => console.log(e.target.value)}
                    className='col-span-2'
                    />
                </div>
            </div>
            <div className={css.borderSection}>
                <div className='grid grid-cols-3 gap-4'>
                    <label>Role</label>
                    <Input
                    id="role"
                    onChange={(e) => console.log(e.target.value)}
                    className='col-span-2'
                    />
                </div> 
            </div>
            <div className={css.borderSection}>
                <div className='grid grid-cols-3 items-center'>
                    <label>City</label>
                    <SearchDropdown
                        id="location"
                        value={user?.meta.city}
                        isAsync
                        loadOptions={user?.meta.onSelectCity}
                        defaultOptions
                        icon="search-lg"
                        hasDropdownIcon={false}
                        onChange={(value) => {
                        onSelectCity(value);
                        }}
                    />
                    
                </div> 
            </div>
            <div className='text-Error-700 text-sm py-5 cursor-pointer' onClick={()=>  setModalVisibility(true)}>
                Close your Account
            </div>
            <Modal width="35rem" maxWidth="80vw" 
            open={modalVisibility} onClose={() => setModalVisibility(false)}
            className='p-6'
            >
                <div>
                    <div className={css.modalHeader}>
                        <div>
                            <FeaturedIcon iconName="alert-circle" size="md" theme="error" type="light-circle-outlined" />
                        </div>
                        <div onClick={() => setModalVisibility(false)}>
                            <img src="/icons/close-black.svg" />
                        </div>
                    </div>
                    <div className='text-lg font-semibold pt-5 mb-5'>Close account?</div>
                    <div className='text-sm font-normal text-Gray-light-mode-600'>
                        Closing your account will erase all your existing activity on Socious, 
                        including connections you’ve made, jobs and contracts.
                        <p className='pt-5'> 
                        This action is irreversible. 
                        </p>
                    </div>
                    <div className='mt-5'>
                        <Textarea rows="8" label='Reason (optional)' onChange={onChangeTextHandler} placeholder="Please let us know why you are closing your account." />
                        
                    </div>
                    <div className='flex mt-8 justify-end gap-2'>
                        <Button onClick={()=>{ setModalVisibility(false);}} color="white" className={css.cancelBtn}>cancel</Button>
                        <Button onClick={() => closeAccount()} color="white" className='bg-Error-600 text-Base-White rounded-default px-4 py-2 w-auto'>
                            Permanently delete my account
                        </Button>
                    </div>
                </div>
            </Modal>

        </>
    )
}

export default Account;