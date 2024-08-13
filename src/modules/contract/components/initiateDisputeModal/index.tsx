import React from 'react';
import { DISPUTE_CATEGORY } from 'src/constants/DISPUTE_CATEGORY';
import { Button } from 'src/modules/general/components/Button';
import { Checkbox } from 'src/modules/general/components/checkbox/checkbox';
import { Dot } from 'src/modules/general/components/dot';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { FileUploaderMultiple } from 'src/modules/general/components/fileUploaderMultiple';
import { Input } from 'src/modules/general/components/input/input';
import { Modal } from 'src/modules/general/components/modal';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';
import variables from 'src/styles/constants/_exports.module.scss';

import { InitiateDisputeModalProps } from './index.types';
import SuccessInitiateDispute from './successInitiateDispute';
import { useInitiateDisputeModal } from './useInitiateDisputeModal';

const InitiateDisputeModal: React.FC<InitiateDisputeModalProps> = ({ open, handleClose, respondentId, missionId }) => {
  const {
    data: { register, errors, files, showFiles, step, category, openSuccessModal },
    operations: {
      handleUpload,
      handleDeleteUpload,
      setShowFiles,
      onSelectCategory,
      handleSubmit,
      onSubmit,
      setOpenSuccessModal,
      backToPreviousStep,
    },
  } = useInitiateDisputeModal(respondentId, missionId, open, handleClose);

  const headerJSX = (
    <div className="flex flex-col gap-4">
      <FeaturedIcon iconName="message-alert-circle" type="modern" size="lg" theme="gray" />
      <div className="flex flex-col text-md font-semibold text-Gray-light-mode-900">
        Initiate a dispute
        <span className="font-normal text-sm leading-5 text-Gray-light-mode-500">
          Please provide the necessary information to initiate the dispute resolution process for the selected contract.
        </span>
      </div>
    </div>
  );

  const footerJSX = (
    <div className="w-full flex flex-col-reverse items-center gap-3 p-4 md:flex-row p-6">
      <Button
        variant="outlined"
        color="info"
        fullWidth
        onClick={() => (step === 0 ? handleClose() : backToPreviousStep())}
      >
        {step === 0 ? 'Cancel' : 'Back'}
      </Button>
      <Button type="submit" variant="contained" color="primary" fullWidth>
        {step < 2 ? 'Continue' : 'Submit Dispute'}
      </Button>
    </div>
  );

  const stepOne = (
    <>
      <SearchDropdown
        id="category"
        name="category"
        placeholder="Select"
        label="Dispute category*"
        options={DISPUTE_CATEGORY}
        onChange={onSelectCategory}
        value={category}
        errors={errors['category']?.label?.message ? [errors['category']?.label?.message.toString()] : undefined}
      />
      <Input
        id="title"
        name="title"
        placeholder="Provide a concise summary of the dispute"
        label="Dispute title*"
        required
        register={register}
        errors={errors['title']?.message ? [errors['title']?.message.toString()] : undefined}
      />
      <Input
        id="description"
        name="description"
        placeholder="Describe the dispute in detail, including the events that led to the disagreement and any relevant circumstances."
        label="Dispute description*"
        required
        multiline
        customHeight="200px"
        register={register}
        errors={errors['description']?.message ? [errors['description']?.message.toString()] : undefined}
      />
    </>
  );

  const stepTwo = (
    <>
      <div className="flex flex-col leading-6 text-sm font-semibold text-Gray-light-mode-700">
        Supporting evidence*
        <span className="font-normal text-sm leading-5 text-Gray-light-mode-500">
          Upload any relevant documents, screenshots, delivered work or written communications, that support your claim.
          Please ensure all personal information is redacted or anonymized.
        </span>
      </div>
      <FileUploaderMultiple
        fileTypes={['PDF', 'DOC', 'DOCX', 'PNG', 'JPG', 'GIF', 'MOV or MP4']}
        maxFileNumbers={10}
        maxSize={10}
        uploaded={files}
        setUploaded={handleUpload}
        onDeleteFile={handleDeleteUpload}
        setShowFiles={setShowFiles}
        showFiles={showFiles}
        loading={false}
      />
      {errors.evidences?.message && (
        <span className="text-Error-700 text-sm">{errors.evidences?.message?.toString()}</span>
      )}
    </>
  );

  const stepThree = (
    <>
      <div className="flex flex-row items-start gap-2 font-normal text-sm leading-5 text-Gray-light-mode-500">
        <Checkbox id="confirmInfo" name="confirmInfo" label="" required register={register} />I hereby confirm that the
        information provided in this form is true and accurate to the best of my knowledge.
      </div>
      <div className="flex flex-row items-start gap-2 font-normal text-sm leading-5 text-Gray-light-mode-500">
        <Checkbox id="sharedInfo" name="sharedInfo" label="" required register={register} />I understand that the
        submitted information will be shared with the respondent and relevant parties involved in the resolution process
        and adheres to the platform&apos;s guidelines for dispute submission.
      </div>
      {(errors.confirmInfo?.message || errors.sharedInfo?.message) && (
        <span className="text-Error-700 text-sm">Both statements must be agreed to before proceeding</span>
      )}
    </>
  );

  const renderStepContent = [stepOne, stepTwo, stepThree];

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal
          open={open}
          handleClose={handleClose}
          title={headerJSX}
          footer={footerJSX}
          footerDivider={false}
          contentClassName="pt-5 px-4 md:px-6 h-full"
        >
          <div className="flex flex-col gap-4 h-full">
            <div className="flex flex-col gap-4 flex-1">{renderStepContent[step]}</div>
            <div className="flex self-center gap-3 mt-1">
              {Array.from({ length: 3 }).map((_, index) => (
                <Dot
                  key={index}
                  size="medium"
                  color={step === index ? variables.color_primary_600 : variables.color_grey_200}
                  shadow={false}
                  onClick={() => index < step && backToPreviousStep()}
                />
              ))}
            </div>
          </div>
        </Modal>
      </form>
      {openSuccessModal.disputeId && (
        <SuccessInitiateDispute
          open={openSuccessModal.open}
          handleClose={() => setOpenSuccessModal({ open: false, disputeId: '', respondentName: '', respondDate: '' })}
          disputeId={openSuccessModal.disputeId}
          respondentName={openSuccessModal.respondentName}
          respondDate={openSuccessModal.respondDate}
        />
      )}
    </>
  );
};

export default InitiateDisputeModal;
