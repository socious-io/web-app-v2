import { Button } from '../../../../components/atoms/button/button';
import { Card } from '../../../../components/atoms/card/card';
import { useOrganizationCreateShared } from '../../organization-create.shared';
import { getProcess } from '../verified.services';
import css from './desktop.module.scss';

export const Desktop = (): JSX.Element => {
  const processes = getProcess('verify@socious.com');
  const { navigateToJobs } = useOrganizationCreateShared();

  return (
    <div className={css.container}>
      <Card className={css.card} padding={0}>
        <div className={css.header}>
          <div className={css.icon}>
            <img src="/icons/verified.svg" />
          </div>
          <div className={css.title}>Get verified</div>
          <div className={css.statement}>
            Get your organization page verified to create jobs and hire users on Socious
          </div>
        </div>
        <div className={css.main}>
          <div className={css.title}>How to get verified?</div>
          <div className={css.verificationProcess}>
            {processes.map((item, i) => (
              <div key={item.title} className={css.processItem}>
                <div className={css.processLeft}>
                  <div
                    style={i === 0 ? { backgroundColor: 'var(--color-primary-01)' } : {}}
                    className={css.processIcon}
                  >
                    <img src={item.iconUrl} />
                  </div>
                  {i !== processes.length - 1 && <div className={css.processLine}></div>}
                </div>
                <div className={css.processRight}>
                  <div className={css.rightTitle}>{item.title}</div>
                  <div className={css.rightContent}>{item.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={css.bottom}>
        <Button onClick={navigateToJobs}>Continue</Button>

        </div>
      </Card>
    </div>
  );
};
