import { useNavigate } from 'react-router-dom';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { OrganizationJobListing } from 'src/Nowruz/modules/Jobs/modules/OrganizationJobListing';

import css from './list.module.scss';

export const CreatedList = () => {
  const navigate = useNavigate();

  const navigateToCreateJob = () => {
    navigate('../create');
  };
  const headerClass = `${css.header}`;

  return (
    <div className={css.container}>
      <div className={`flex flex-col justify-start md:flex-row md:justify-between`}>
        <div className={headerClass}>
          <h1 className={css.title}>{`Jobs listing`}</h1>
          <h2 className={css.subtitle}>{`Manage your published and draft job listings here.`}</h2>
        </div>

        <div className="flex md:justify-end w-3/6">
          <Button
            startIcon={<Icon name="plus" color={variables.color_white} />}
            color="primary"
            variant="contained"
            onClick={navigateToCreateJob}
          >
            Create job
          </Button>
        </div>
      </div>
      <div className={css.list}>{<OrganizationJobListing />}</div>
    </div>
  );
};
