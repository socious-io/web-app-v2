import { isTouchDevice } from '../../../../core/device-type-detector';
import { Desktop } from './desktop/desktop';
import { Mobile } from './mobile/mobile';

export const OrganizationCreateType = (): JSX.Element => {
  return isTouchDevice() ? <Mobile /> : <Desktop />;

  //   return (
  //     <div className={css.container}>
  //       <BottomStatic>
  //         <div>
  //           <div className={css.question}>What type of organization?</div>
  //           <div>
  //             <TypeSelector
  //               padding="2rem 1rem"
  //               onChange={console.log}
  //               list={ORGANIZATION_TYPE}
  //             />
  //           </div>
  //         </div>
  //         <div className={css.bottom}>
  //           <Button onClick={() => navigate({ to: '../social-causes' })}>
  //             Continue
  //           </Button>
  //         </div>
  //       </BottomStatic>
  //     </div>
  //   );
};
