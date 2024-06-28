import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Checkbox } from 'src/Nowruz/modules/general/components/checkbox/checkbox';
import { Dot } from 'src/Nowruz/modules/general/components/dot';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { FileUploaderMultiple } from 'src/Nowruz/modules/general/components/fileUploaderMultiple';
import { Input } from 'src/Nowruz/modules/general/components/input/input';
import { Modal } from 'src/Nowruz/modules/general/components/modal';

import { RespondDisputeModalProps } from './index.types';
import SuccessRespondDispute from './successRespondDispute';
import { useRespondDisputeModal } from './useRespondDisputeModal';

const RespondDisputeModal: React.FC<RespondDisputeModalProps> = ({ open, handleClose, disputeId, onSubmitRespond }) => {
  const {
    data: { register, errors, files, showFiles, step, confirmInfo, sharedInfo, openSuccessModal },
    operations: {
      handleUpload,
      handleDeleteUpload,
      setShowFiles,
      handleCheckbox,
      handleSubmit,
      onSubmit,
      setOpenSuccessModal,
      backToPreviousStep,
    },
  } = useRespondDisputeModal(disputeId, open, handleClose, onSubmitRespond);

  const headerJSX = (
    <div className="flex flex-col gap-4">
      <FeaturedIcon iconName="message-alert-circle" type="modern" size="lg" theme="gray" />
      <div className="flex flex-col text-md font-semibold text-Gray-light-mode-900">
        Your response to the dispute
        <span className="font-normal text-sm leading-5 text-Gray-light-mode-500">
          Please provide your detailed response to the dispute. Include any relevant information, explanations, or
          evidence to support your position.
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
        {step < 2 ? 'Continue' : 'Submit Response'}
      </Button>
    </div>
  );

  const stepOne = (
    <>
      <Input
        id="message"
        name="message"
        placeholder="Provide your detailed response to the dispute here. Address the concerns raised by the claimant and explain your side of the story. Be clear, concise, and factual in your response."
        label="Your response*"
        required
        multiline
        customHeight="200px"
        register={register}
        errors={errors['message']?.message ? [errors['message']?.message.toString()] : undefined}
      />
    </>
  );

  const stepTwo = (
    <>
      <div className="flex flex-col leading-6 text-sm font-semibold text-Gray-light-mode-700">
        Supporting evidence*
        <span className="font-normal text-sm leading-5 text-Gray-light-mode-500">
          Upload any relevant documents, screenshots, delivered work or written communications, that support your
          position. Please ensure all personal information is redacted or anonymized.
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
        <Checkbox
          id="confirmInfo"
          name="confirmInfo"
          label=""
          checked={confirmInfo}
          onChange={e => handleCheckbox(e.target)}
        />
        I hereby confirm that the information provided in this form is true and accurate to the best of my knowledge.
      </div>
      <div className="flex flex-row items-start gap-2 font-normal text-sm leading-5 text-Gray-light-mode-500">
        <Checkbox
          id="sharedInfo"
          name="sharedInfo"
          label=""
          checked={sharedInfo}
          onChange={e => handleCheckbox(e.target)}
        />
        I understand that the submitted information will be shared with the claimant and relevant parties involved in
        the resolution process and adheres to the platform&apos;s guidelines for dispute submission.
      </div>
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
        <SuccessRespondDispute
          open={openSuccessModal.open}
          handleClose={() => setOpenSuccessModal({ open: false, disputeId: '', claimantName: '' })}
          disputeId={openSuccessModal.disputeId}
          claimantName={openSuccessModal.claimantName}
        />
      )}
    </>
  );
};

export default RespondDisputeModal;
