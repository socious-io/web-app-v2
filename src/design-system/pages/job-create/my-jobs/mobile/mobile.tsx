import css from './mobile.module.scss';
import { Accordion } from '../../../../atoms/accordion/accordion';

export const Mobile = (): JSX.Element => {
  return (
    <div className={css.container}>
      <Accordion id="1" title="bla">
        <div style={{ background: 'red' }}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum eveniet beatae nam
          explicabo exercitationem esse molestiae obcaecati mollitia voluptate vel reiciendis
          voluptates minus quia, quidem ex illum consequatur laboriosam fugiat.m
        </div>
      </Accordion>
      <Accordion id="2" title="bla">
        <div>asdasdf</div>
        <div></div>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus ipsum officia quia
        laudantium commodi, laboriosam, sint at repellat deleniti cum beatae veniam delectus
        doloribus iure praesentium asperiores nisi reprehenderit similique!m
      </Accordion>
    </div>
  );
};
