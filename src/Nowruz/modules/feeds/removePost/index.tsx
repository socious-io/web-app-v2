import React from 'react';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { Modal } from 'src/Nowruz/modules/general/components/modal';

import { RemovePostProps } from './index.types';

const RemovePost: React.FC<RemovePostProps> = ({ open, handleClose, onDeletePost }) => {
  const headerJSX = <FeaturedIcon iconName="alert-circle" size="lg" theme="warning" type="light-circle-outlined" />;
  const footerJSX = (
    <div className="w-full flex flex-col md:flex-row gap-3 p-4 md:p-6 mt-2">
      <Button color="info" customStyle="flex-1" onClick={handleClose}>
        Cancel
      </Button>
      <Button color="error" customStyle="flex-1" onClick={onDeletePost}>
        Delete
      </Button>
    </div>
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={headerJSX}
      headerDivider={false}
      footer={footerJSX}
      footerDivider={false}
      mobileFullHeight={false}
      mobileCentered
      customStyle="max-w-[400px]"
      contentClassName="px-4 md:px-6 flex flex-col gap-1"
    >
      <span className="text-lg font-semibold leading-7 text-Gray-light-mode-900">Delete post</span>
      <span className="text-sm text-Gray-light-mode-600">Are you sure you want to delete this post?</span>
    </Modal>
  );
};

export default RemovePost;
