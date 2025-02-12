import { Divider, Typography } from '@mui/material';
import React from 'react';
import { Button } from 'src/modules/general/components/Button';
import FileUploader from 'src/modules/general/components/FileUploader';
import { Input } from 'src/modules/general/components/input/input';
import { Modal } from 'src/modules/general/components/modal';
import variables from 'src/styles/constants/_exports.module.scss';

import { ApplyModalProps } from './applyModal.types';
import { useApplyModal } from './useApplyModal';
import ApplyModalQuestions from '../applyModalQuestions';

export const ApplyModal: React.FC<ApplyModalProps> = ({ open, handleClose }) => {
  const {
    register,
    errors,
    attachments,
    onDropFiles,
    onDeleteFiles,
    answers,
    setAnswers,
    questionErrors,
    handleSubmit,
    apply,
    screeningQuestions,
  } = useApplyModal(handleClose);

  const modalFooterJsx = (
    <div className="w-full flex flex-col md:flex-row-reverse px-4 py-4 md:px-6 md:py-6 gap-3 md:justify-start">
      <Button customStyle="w-full md:w-fit " variant="contained" color="primary" onClick={handleSubmit(apply)}>
        Submit
      </Button>
      <Button customStyle="w-full md:w-fit " variant="outlined" color="primary" onClick={() => handleClose(false)}>
        Cancel
      </Button>
    </div>
  );

  const renderTitle = (title: string) => {
    return (
      <Typography variant="h4" color={variables.color_grey_700}>
        {title}
      </Typography>
    );
  };
  const contentJSX = (
    <div className="w-full py-6 px-4 md:p-6 flex flex-col gap-4">
      {renderTitle('Cover letter')}
      <Input
        id="cover-letter"
        label="Message*"
        name="coverLetter"
        errors={errors['coverLetter']?.message ? [errors['coverLetter']?.message.toString()] : undefined}
        register={register}
        multiline
        customHeight="118px"
      />
      <Divider />
      {renderTitle('Resume')}

      <FileUploader
        files={attachments}
        onDropFiles={onDropFiles}
        fileTypes={['DOC', 'DOCX', 'PDF']}
        deleteOnFileName
        onDeleteFiles={onDeleteFiles}
        customStyle="w-full h-[126px]"
      />

      <Divider />
      {renderTitle('Link')}

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            id="link-name"
            label="Link name"
            name="linkName"
            errors={errors['linkName']?.message ? [errors['linkName']?.message.toString()] : undefined}
            register={register}
            placeholder="eg. Portfolio"
          />
        </div>
        <div className="flex-1">
          <Input
            id="url"
            label="URL"
            name="linkUrl"
            errors={errors['linkUrl']?.message ? [errors['linkUrl']?.message.toString()] : undefined}
            register={register}
            prefix="https://"
            placeholder="www.example.com"
          />
        </div>
      </div>
      {screeningQuestions.questions.length ? (
        <>
          <Divider />
          <ApplyModalQuestions answers={answers} setAnswers={setAnswers} questionErrors={questionErrors} />
        </>
      ) : (
        ''
      )}
    </div>
  );

  return (
    <Modal
      id="apply-job"
      open={open}
      handleClose={() => handleClose(false)}
      title="Apply to job"
      content={contentJSX}
      footer={modalFooterJsx}
      mobileFullHeight={false}
    />
  );
};
