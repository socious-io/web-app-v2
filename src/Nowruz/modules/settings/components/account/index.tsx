import { AnyAction } from '@reduxjs/toolkit';
import { useState } from 'react';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { Modal } from 'src/Nowruz/modules/general/components/modal';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';
import { deleteAccount } from 'src/pages/delete-profile/delete-profile.service';

import css from './account.module.scss';



const Account = () => {

    const [modalVisibility, setModalVisibility] = useState(false);
    let reasonbody = "";

    const onChangeTextHandler = (e:AnyAction) => {
        reasonbody = e.target.value;
    };

    const closeAccount = () => {
        deleteAccount(reasonbody);
    };

    return (
        <>
            <div className='hidden'>
                <div className={css.borderSection}>
                    <div className="flex flex-row w-full pt-8 items-center">
                        <h2 className={css.title}>Account Information</h2>
                        <div className="flex gap-4">
                            <div>
                                <Button color="info">Cancel</Button>
                            </div>
                            <div>
                                <Button color='primary'>Save</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={css.borderSection}>
                    <div className='grid grid-cols-5 gap-4'>
                        <label>Name</label>
                        <div>
                            <Input id="name" type='text' />
                        </div>
                        <div>
                            <Input id="name" type='text' />
                        </div>

                    </div>
                </div>
                <div className={css.borderSection}>
                    <div className='grid grid-cols-5 gap-4'>
                        <label>Email Address</label>
                        <div className="col-span-2">
                            <Input id="email" type='email' />
                        </div>
                    </div>
                </div>
                <div className={css.borderSection}>
                    <div className='grid grid-cols-5 gap-4'>
                        <label>Username</label>
                        <div className="col-span-2">
                            <Input
                                id="username" prefix="socious.io/"
                            />
                        </div>
                    </div>
                </div>
                <div className={css.borderSection}>
                    <div className='grid grid-cols-5 gap-4'>
                        <label>Role</label>
                        <div className="col-span-2">
                            <Input id="role" />
                        </div>
                    </div>
                </div>
                <div className={css.borderSection}>
                    <div className="grid grid-cols-5 gap-4">

                        <label >City</label>
                        <div className="col-span-2 ...">
                            <SearchDropdown
                                id="location"
                                isAsync
                                icon="search-lg"
                                hasDropdownIcon={false}
                            />
                        </div>
                    </div>

                </div>
            </div>

            <div className='text-Error-700 text-sm py-5 cursor-pointer' onClick={() => setModalVisibility(true)}>
                Close your Account
            </div>
            <Modal customStyle={css.modalStyle}
                open={modalVisibility}
                handleClose={() => setModalVisibility(!modalVisibility)} headerDivider={false} footerDivider={false}
                icon={<FeaturedIcon iconName="alert-circle" size="md" theme="error" type="light-circle-outlined" />}>
                <div className='p-6'>
                    <div className='text-lg font-semibold pt-5 mb-5'>Close account?</div>
                    <div className='text-sm font-normal text-Gray-light-mode-600'>
                        Closing your account will erase all your existing activity on Socious,
                        including connections you’ve made, jobs and contracts.
                        <p className='pt-5'>
                            This action is irreversible.
                        </p>
                    </div>
                    <div className='mt-5'>
                        <Input
                            multiline
                            label='Reason (optional)'
                            customHeight="160px"
                            onChange={onChangeTextHandler}
                            placeholder='Please let us know why you are closing your account.'
                        />
                    </div>
                    <div className='flex mt-8 justify-end gap-2'>
                        <Button onClick={() => { setModalVisibility(false); }} color="info">cancel</Button>
                        <Button onClick={() => closeAccount()} color="error">
                            Permanently delete my account
                        </Button>
                    </div>
                </div>
            </Modal>

        </>
    );
};

export default Account;