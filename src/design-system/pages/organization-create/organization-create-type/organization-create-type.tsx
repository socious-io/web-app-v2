import css from './organization-create-type.module.scss';
import { BottomStatic } from '../../../templates/bottom-static/bottom-static';
import { Button } from '../../../atoms/button/button';
import { TypeSelector } from '../../../atoms/type-selector/type-selector';

const list = [
  { value: '1', label: 'Social Business' },
  { value: '2', label: 'Non-profit / Charity' },
  { value: '3', label: 'Social Co-operative' },
  { value: '4', label: 'Impact Investing Funds/Foundations' },
  { value: '5', label: 'Public Institution' },
  { value: '6', label: 'Intergovernmental Organization (e.g. UN)' },
  { value: '7', label: 'Impact department of a for profit company (e.g. CSR)' },
  { value: '8', label: 'Other' },
];

export const OrganizationCreateType = (): JSX.Element => {
  return (
    <div className={css.container}>
      <BottomStatic>
        <div>
          <div className={css.question}>What type of organization?</div>
          <div className={css.main}>
            <TypeSelector
              padding="2rem 1rem"
              onChange={console.log}
              list={list}
            />
          </div>
        </div>
        <div className={css.bottom}>
          <Button>Continue</Button>
        </div>
      </BottomStatic>
    </div>
  );
};
