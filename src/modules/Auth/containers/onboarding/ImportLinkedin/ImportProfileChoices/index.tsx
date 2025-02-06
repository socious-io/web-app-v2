import { translate } from 'src/core/utils';
import LinkedInButton from 'src/modules/Auth/components/LinkedInButton';
import Step from 'src/modules/Auth/components/Step';
import ImportLinkedInModal from 'src/modules/Auth/containers/onboarding/ImportLinkedin/ImportLinkedInModal';
import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';

import css from './index.module.scss';
import { useImportProfileChoices } from './useImportProfileChoices';

const ImportProfileChoices = () => {
  const {
    data: { steps, openImportModal },
    operations: { updateSelectedStep, setOpenImportModal },
  } = useImportProfileChoices();

  return (
    <>
      <div className={css.container}>
        <div className="flex flex-col gap-1">
          <div className={css.title}>{translate('linkedin-title')}</div>
          <div className={css.subtitle}>{translate('linkedin-subtitle')}</div>
        </div>
        <div className="w-full flex flex-col gap-5 items-center">
          <LinkedInButton handleClick={() => setOpenImportModal(true)} />
          <div className={css.txt}>{translate('linkedin-cv')}</div>
        </div>
        <div className="w-full flex flex-col">
          <div className={css.boldTxt}>{translate('linkedin-instruction-title')}</div>
          <div className={css.txt}>{translate('linkedin-instruction-subtitle')}</div>
        </div>
        <div className="w-full md:max-w-[400px]">
          {steps.map(item => (
            <Step key={item.title} {...item} />
          ))}
        </div>
        <div className="w-full flex flex-col gap-3">
          <div className={css.subtitle}>{translate('linkedin-normal-onboarding')}</div>
          <Button variant="text" color="secondary" customStyle="flex gap-2" onClick={() => updateSelectedStep(2)}>
            {translate('linkedin-fill-out-button')}
            <Icon fontSize={20} name="arrow-right" className="text-Gray-light-mode-600" />
          </Button>
        </div>
      </div>
      <ImportLinkedInModal open={openImportModal} handleClose={() => setOpenImportModal(false)} />
    </>
  );
};

export default ImportProfileChoices;
