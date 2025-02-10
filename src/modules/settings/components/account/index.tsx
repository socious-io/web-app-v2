import { AnyAction } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { selfDelete } from 'src/core/api';
import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Input } from 'src/modules/general/components/input/input';
import { Modal } from 'src/modules/general/components/modal';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';

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
      <div className="hidden">
        <div className={css.borderSection}>
          <div className="flex flex-row w-full pt-8 items-center">
            <h2 className={css.title}>{translate('account.info.title')}</h2>
            <div className="flex gap-4">
              <div>
                <Button color="info">{translate('account.buttons.cancel')}</Button>
              </div>
              <div>
                <Button color="primary">{translate('account.buttons.save')}</Button>
              </div>
            </div>
          </div>
        </div>

        <div className={css.borderSection}>
          <div className="grid grid-cols-5 gap-4">
            <label>{translate('account.fields.name')}</label>
            <div>
              <Input id="name" type="text" />
            </div>
            <div>
              <Input id="name" type="text" />
            </div>
          </div>
        </div>
        <div className={css.borderSection}>
          <div className="grid grid-cols-5 gap-4">
            <label>{translate('account.fields.email')}</label>
            <div className="col-span-2">
              <Input id="email" type="email" />
            </div>
          </div>
        </div>
        <div className={css.borderSection}>
          <div className="grid grid-cols-5 gap-4">
            <label>{translate('account.fields.username')}</label>
            <div className="col-span-2">
              <Input id="username" prefix="socious.io/" />
            </div>
          </div>
        </div>
        <div className={css.borderSection}>
          <div className="grid grid-cols-5 gap-4">
            <label>{translate('account.fields.role')}</label>
            <div className="col-span-2">
              <Input id="role" />
            </div>
          </div>
        </div>
        <div className={css.borderSection}>
          <div className="grid grid-cols-5 gap-4">
            <label>{translate('account.fields.city')}</label>
            <div className="col-span-2 ...">
              <SearchDropdown id="location" isAsync icon="search-lg" hasDropdownIcon={false} />
            </div>
          </div>
        </div>
      </div>

      <div className="text-Error-700 text-sm py-5 cursor-pointer" onClick={() => setModalVisibility(true)}>
        {translate('account.closeAccount.link')}
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
          <div className="text-lg font-semibold pt-5 mb-5">{translate('account.closeAccount.title')}</div>
          <div className="text-sm font-normal text-Gray-light-mode-600">
            {translate('account.closeAccount.description')}
            <p className="pt-5">{translate('account.closeAccount.irreversible')}</p>
          </div>
          <div className="mt-5">
            <Input
              multiline
              label={translate('account.closeAccount.reason')}
              customHeight="160px"
              onChange={onChangeTextHandler}
              placeholder={translate('account.closeAccount.placeholder')}
            />
          </div>
          <div className="flex mt-8 justify-end gap-2">
            <Button
              onClick={() => {
                setModalVisibility(false);
              }}
              color="info"
            >
              {translate('account.closeAccount.buttons.cancel')}
            </Button>
            <Button onClick={() => closeAccount()} color="error">
              {translate('account.closeAccount.buttons.delete')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Account;
