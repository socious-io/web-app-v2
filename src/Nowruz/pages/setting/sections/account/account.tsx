import { Button } from 'src/components/atoms/button/button';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { Modal } from 'src/components/templates/modal/modal';
import { useRef, useState,FormEvent } from 'react';

import { useSelector } from 'react-redux';
import { CurrentIdentity, Notification } from 'src/core/api';
import { RootState } from 'src/store';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { deleteAccount } from 'src/pages/delete-profile/delete-profile.service';


const Account = () => {

    console.log(1)
    const identities = useSelector<RootState, CurrentIdentity[]>((state) => {
        console.log(state.identity.entities)
        return state.identity.entities;
    });
    console.log(2)
    const primary = identities.find((i) => i.primary);

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
                <div className="flex flex-row w-full">
                    <h2 className="grow">Account Information</h2>
                    <div className="flex gap-4">
                        <div className=''>
                            <Button color="white">Cancel</Button>
                        </div>
                        <div className=''>
                            <Button color="primary">Save</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className='flex'>
                    {/* {userFullNameJSX} */}
                    <div>
                        <label>Name</label>
                        <Input
                        id="name"
                        type='text'
                        value={primary?.meta.name}
                        onChange={(e) => console.log(e.target.value)}
                        />
                    </div>
                    {/* <div className='flex'>
                        <label>Name</label>
                        <Input
                        id="name"
                        type='text'
                        value={primary?.meta.name}
                        onChange={(e) => console.log(e.target.value)}
                        />
                    </div> */}
                    
                </div>
                <div>
                    <label>Email Address</label>
                    <Input
                    id="email"
                    type='email'
                    value={primary?.meta.email}
                    onChange={(e) => console.log(e.target.value)}
                    />
                </div>
                <div>
                    <label>Username</label>
                    <Input
                    id="username"
                    value={primary?.meta.username}
                    onChange={(e) => console.log(e.target.value)}
                    />
                </div>
                <div>
                    <label>Role</label>
                    <Input
                    id="role"
                    onChange={(e) => console.log(e.target.value)}
                    />
                </div>
                <div>
                    <label>City</label>
                    <Input
                    id="city"
                    value={primary?.meta.city}
                    onChange={(e) => console.log(e.target.value)}
                    />
                </div>
                <div onClick={()=>  setModalVisibility(true)}>
                    Close your Account
                </div>
            </div>

            <Modal width="25rem" maxWidth="80vw" open={modalVisibility} onClose={() => setModalVisibility(false)}>
                <div >
                    <div >Sign in to Socious</div>
                    <div >To continue, please sign in or register</div>
                    
                        <Textarea rows="15" onChange={onChangeTextHandler} placeholder="Please let us know why you are closing your account ..." />
                        <Button onClick={()=>{ setModalVisibility(false);}}>cancel</Button>
                        <Button onClick={() => closeAccount()} color="white">
                            Delete
                        </Button>
                    
                    <div >
                    </div>
                </div>
            </Modal>

        </>
    )
}

export default Account;