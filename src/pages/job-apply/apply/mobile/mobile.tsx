import { Textarea } from '@atoms/textarea/textarea';
import { ProfileView } from '@molecules/profile-view/profile-view';
import { resumeInitialState } from '../apply.services';
import { Divider } from '@templates/divider/divider';
import { Input } from '@atoms/input/input';
import { Button } from '@atoms/button/button';
import { Checkbox } from '@atoms/checkbox/checkbox';
import { Header } from '@atoms/header/header';
import { ExpandableText } from '@atoms/expandable-text';
import { printWhen } from 'src/core/utils';
import { useApplyShared } from '../apply.shared';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const {
    questions,
    resume,
    setResume,
    onResumeLoad,
    jobDetail,
    form,
    location,
    onSubmit,
    createTextQuestion,
    createRadioQuestion,
  } = useApplyShared();

  const renderQuestions = () => {
    return (
      <div className={css.questionsContainer}>
        <Divider divider="line" title="Screening questions">
          {questions.map((item, i) => {
            const isMultipleChoice = item.options?.length;
            return (
              <div key={item.id} className={css.questions}>
                {isMultipleChoice ? createRadioQuestion(item, i + 1) : createTextQuestion(item, i + 1)}
              </div>
            );
          })}
        </Divider>
      </div>
    );
  };

  const uploadedResume = (
    <div className={css.uploadedResume}>
      <img src="/icons/attachment-black.svg" />
      {resume?.file && (
        <a href={URL.createObjectURL(resume.file)} target="_blank">
          {resume.name}
        </a>
      )}
      <div onClick={() => setResume(resumeInitialState)} className={css.trashIcon}>
        <img src="/icons/trash-bin.svg" />
      </div>
    </div>
  );

  const uploadResumeBtn = (
    <>
      <div className={css.uploadYourResume}>Upload your resume</div>
      <div className={css.acceptedType}>DOC, DOCX, PDF (10MB)</div>
      <Button className="relative w9-75" icon="/icons/attachment.svg" size="s" color="white">
        <input onChange={onResumeLoad} type="file" className={css.fileInput} />
        Upload File
      </Button>
    </>
  );

  return (
    <div className={css.container}>
      <Header onBack={() => history.back()} height="var(--safe-area)" title="Apply" />
      <div className={css.main}>
        <Divider>
          <ProfileView
            img={jobDetail.identity_meta?.image}
            type={jobDetail.identity_type}
            name={jobDetail.identity_meta.name}
            username={jobDetail.identity_meta.shortname}
            location={location}
          />
          <div className={css.jobTitle}>{jobDetail.title}</div>
          <ExpandableText text={jobDetail.description} isMarkdown />
        </Divider>
        <Divider divider="line" title="Cover letter">
          <Textarea register={form} name="cover_letter" placeholder="write a message..." label="Message" />
        </Divider>
        <Divider divider="line" title="Resume">
          {resume.name ? uploadedResume : uploadResumeBtn}
        </Divider>
        <Divider divider="line" title="Link">
          <div className={css.linkContainer}>
            <Input register={form} name="cv_name" optional placeholder="Link name" label="Link name" />
            <Input register={form} name="cv_link" optional placeholder="Enter a URL" label="Link URL" />
          </div>
        </Divider>
        {printWhen(renderQuestions(), !!questions.length)}
        <Divider divider="line" title="Contact info">
          <div className={css.contactContainer}>
            <div>Share contact information with Organization?</div>
            <Checkbox label="" id="" defaultChecked={false} />
          </div>
        </Divider>
        <div className={css.btnContainer}>
          <Button disabled={!form.isValid} onClick={onSubmit}>
            Submit application
          </Button>
        </div>
      </div>
    </div>
  );
};
