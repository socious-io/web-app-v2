import { AnyAction } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { selfDelete } from 'src/core/api';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { Modal } from 'src/Nowruz/modules/general/components/modal';

import css from './account.module.scss';

const Account = () => {
  const [modalVisibility, setModalVisibility] = useState(false);
  let reasonbody = '';

  const onChangeTextHandler = (e: AnyAction) => {
    reasonbody = e.target.value;
  };

  const navigate = useNavigate();
  const closeAccount = async () => {
    await selfDelete({ reason: reasonbody });
    navigate('/sign-in');
  };

  return (
    <>

      <div className="text-Error-700 text-sm py-5 cursor-pointer" onClick={() => setModalVisibility(true)}>
        Close your Account
      </div>
      <Modal
        customStyle={css.modalStyle}
        open={modalVisibility}
        handleClose={() => setModalVisibility(!modalVisibility)}
        headerDivider={false}
        footerDivider={false}
        icon={<FeaturedIcon iconName="alert-circle" size="md" theme="error" type="light-circle-outlined" />}
      >
        <div className="p-6">
          <div className="text-lg font-semibold pt-5 mb-5">Close account?</div>
          <div className="text-sm font-normal text-Gray-light-mode-600">
            Closing your account will erase all your existing activity on Socious, including connections you’ve made,
            jobs and contracts.
            <p className="pt-5">This action is irreversible.</p>
          </div>
          <div className="mt-5">
            <Input
              multiline
              label="Reason (optional)"
              customHeight="160px"
              onChange={onChangeTextHandler}
              placeholder="Please let us know why you are closing your account."
            />
          </div>
          <div className="flex mt-8 justify-end gap-2">
            <Button
              onClick={() => {
                setModalVisibility(false);
              }}
              color="info"
            >
              Cancel
            </Button>
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
