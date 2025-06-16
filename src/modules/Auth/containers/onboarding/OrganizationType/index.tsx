import { Button } from 'src/modules/general/components/Button';
import SelectCardGroup from 'src/modules/general/components/selectCardGroup';

import css from './organization-type.module.scss';
import { useOrganizationType } from './useOrganizationType';

export const OrganizationType = () => {
  const { orgType, setOrgType, items, goNextPage, translate } = useOrganizationType();
  return (
    <div className={`md:pt-3 px-4 flex flex-col ${css.container}`}>
      <div className="mb-6">
        <div className={css.header}>
          <div>
            <h1 className={css.title}>{translate('onboarding-org-type-title')}</h1>
          </div>
          <div>
            <h2 className={css.description}>{translate('onboarding-org-type-subtitle')}</h2>
          </div>
          <SelectCardGroup items={items} value={orgType} setValue={e => setOrgType(e)} />
        </div>
      </div>
      <div className={`fixed bottom-16 left-0 p-4 pb-0 w-full md:static md:p-0 md:mt-8 ${css.footer}`}>
        <Button data-testid="next-button" disabled={!orgType} color="primary" block onClick={goNextPage}>
          {translate('onboarding-next-social-causes')}
        </Button>
      </div>
    </div>
  );
};
