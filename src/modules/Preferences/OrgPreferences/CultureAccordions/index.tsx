import { Divider, Typography } from '@mui/material';
import Accordion from 'src/modules/general/components/Accordion';
import { Button } from 'src/modules/general/components/Button';
import { Input } from 'src/modules/general/components/input/input';
import { RadioGroup } from 'src/modules/general/components/RadioGroup';

import css from './index.module.scss';
import { CultureAccordionsProps } from './index.types';
import { useCultureAccordions } from './useCultureAccordions';

const CultureAccordions: React.FC<CultureAccordionsProps> = ({ preferences }) => {
  const {
    data: { currentCulturePreferences, letterCounts, errors },
    operations: { onSelectCultureValues, handleCultureDescriptions, onSubmit },
  } = useCultureAccordions(preferences);

  return (
    <form key="culture" className="flex flex-col" onSubmit={onSubmit}>
      <div className={css['section']}>
        <span className={css['section__title']}>Our Culture</span>
        <span className={css['section__subtitle']}>
          Highlight the distinct aspects of your organizational environment and values, from risk-taking to innovation
          and teamwork, to attract talent that resonates with and thrives in your cultural landscape.
        </span>
      </div>
      {currentCulturePreferences.map(culture => (
        <Accordion
          key={culture.key}
          title={culture.title}
          subtitle={culture.subtitle}
          expand
          hasBorder={false}
          contentClassName="flex flex-col !pt-0 gap-6"
        >
          <div className="border border-solid border-Gray-light-mode-200 rounded-default !p-4">
            <RadioGroup
              items={culture.answers}
              contentClassName="!font-normal !text-Gray-light-mode-600"
              selectedItem={{ label: culture.title, value: culture.value }}
              onChange={option => onSelectCultureValues(culture.key, option.value.toString())}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Input
              id="description"
              label=""
              name={culture.key}
              value={culture.description}
              onChange={e => handleCultureDescriptions(culture.key, e.target.value)}
              multiline
              customHeight="180px"
              placeholder="Enter a description..."
              fullWidth
              errors={errors?.[culture.key] ? [errors[culture.key]] : undefined}
            />
            <Typography variant="caption" className="text-Gray-light-mode-600 mr-0 ml-auto">
              {`${letterCounts?.[culture.key] ?? 0}/160`}
            </Typography>
          </div>
        </Accordion>
      ))}
      <Divider />
      <div className="py-6 self-end">
        <Button variant="contained" color="primary" type="submit" disabled={!!Object.keys(errors).length}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default CultureAccordions;
