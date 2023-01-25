import css from './mobile.module.scss';
import { Accordion } from '../../../../atoms/accordion/accordion';
import { Header } from '../../../../atoms/header/header';
import { Tabs } from '../../../../atoms/tabs/tabs';

export const Mobile = (): JSX.Element => {
  const tabs = [
    {
      name: 'Created',
      content: (
        <>
          <Accordion id="1" title="On-going">
            <div style={{ background: 'red' }}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum eveniet beatae nam
            </div>
          </Accordion>
          <Accordion id="2" title="Drafts">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus ipsum officia
          </Accordion>
        </>
      ),
      default: true,
    },
    {
      name: 'archived',
      content: <></>,
    },
  ];

  return (
    <div className={css.container}>
      <Header border="0" paddingTop={'var(--safe-area)'} title="My Jobs" />
      <Tabs tabs={tabs} />
    </div>
  );
};
