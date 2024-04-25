import React from 'react';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { Modal } from 'src/Nowruz/modules/general/components/modal';

import { LeaveDeleteMemberProps } from './index.type';

const LeaveDeleteMember: React.FC<LeaveDeleteMemberProps> = ({
  open,
  handleClose,
  title,
  subtitle,
  content,
  buttons,
}) => {
  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={<FeaturedIcon iconName="alert-circle" size="lg" theme="warning" type="light-circle-outlined" />}
      headerDivider={false}
      footerDivider={false}
      mobileCentered
      customStyle="max-w-[480px]"
    >
      <div className="flex flex-col gap-1 p-5 pt-0">
        <h1 className="font-semibold text-lg leading-7 text-Gray-light-mode-900">{title}</h1>
        <span className="text-sm leading-5 text-Gray-light-mode-600">{subtitle}</span>
        {content}
        {!!buttons.length && (
          <div className="w-full flex flex-col-reverse md:flex-row items-center justify-end gap-3 mt-9">
            {buttons.map((button, index) => (
              <Button key={index} {...button} className="w-full md:w-auto" />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default LeaveDeleteMember;
