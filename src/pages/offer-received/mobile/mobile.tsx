import { Header } from '../../../components/atoms/header-v2/header';
import { TopFixedMobile } from '../../../components/templates/top-fixed-mobile/top-fixed-mobile';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  return (
    <div className={css.container}>
      <TopFixedMobile>
        <Header title="title" onBack={console.log} />
        <div className={css.body}>

        </div>
      </TopFixedMobile>
    </div>
  );
};
