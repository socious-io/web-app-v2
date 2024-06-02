import React, { useState } from 'react';
import variables from 'src/components/_exports.module.scss';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { IconButton } from 'src/Nowruz/modules/general/components/iconButton';
import { Modal } from 'src/Nowruz/modules/general/components/modal';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

import { ReportPostProps } from './index.types';

const ReportPost: React.FC<ReportPostProps> = ({ open, handleClose, onReportPost }) => {
  const [comment, setComment] = useState('');
  const reportOptions = [
    { value: 'Spam', label: 'Spam' },
    { value: 'Fraud', label: 'Fraud' },
    { value: 'Harassment', label: 'Harassment' },
    { value: 'Misinformation', label: 'Misinformation' },
    { value: 'Hateful speech', label: 'Hateful speech' },
    { value: 'Violence', label: 'Violence' },
    { value: 'Self-harm', label: 'Self-harm' },
    { value: 'Sexual content', label: 'Sexual content' },
    { value: 'Child exploitation', label: 'Child exploitation' },
    { value: 'Illegal goods or services', label: 'Illegal goods or services' },
    { value: 'Infringement', label: 'Infringement' },
    { value: 'Other', label: 'Other' },
  ];

  const headerJSX = (
    <IconButton
      iconName="flag-02"
      iconSize={24}
      size="large"
      iconColor={variables.color_grey_700}
      customStyle="!border !border-solid !border-Gray-light-mode-200"
    />
  );
  const footerJSX = (
    <div className="w-full flex flex-col md:flex-row gap-3 p-4 md:p-6">
      <Button color="info" customStyle="flex-1" onClick={handleClose}>
        Cancel
      </Button>
      <Button color="primary" customStyle="flex-1" disabled={!comment} onClick={() => onReportPost(comment)}>
        Send
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
      mobileFullHeight={false}
      customStyle="max-w-[480px]"
      contentClassName="px-4 md:px-6 flex flex-col"
    >
      <span className="text-lg font-semibold leading-7 text-Gray-light-mode-900">Repost this post</span>
      <p className="text-sm text-Gray-light-mode-600 mt-1">
        Are you sure you want to report this post?
        <br /> Select a reason that applies.
      </p>
      <div className="my-6">
        <SearchDropdown
          id="report-reason"
          className="flex-1"
          placeholder="Reason to report"
          options={reportOptions}
          value={reportOptions.find(option => option.value === comment)}
          onChange={value => setComment(value?.value || '')}
          errors={!comment ? ['Please select a reason to report'] : undefined}
        />
      </div>
    </Modal>
  );
};

export default ReportPost;
