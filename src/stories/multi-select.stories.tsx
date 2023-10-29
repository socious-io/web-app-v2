import { StoryFn } from '@storybook/react';
import { useState } from 'react';
import MultiSelect from 'src/Nowruz/general/multiSelect/multiSelect';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';

export default {
  title: 'Multi Select',
  component: MultiSelect,
} as const;

const keytems = Object.keys(SOCIAL_CAUSES);
const items = keytems.map((i) => {
  return SOCIAL_CAUSES[i].label;
});
const Template: StoryFn = (args) => {
  const [value, setValue] = useState<string[]>([]);
  return (
    <div style={{ width: '480px' }}>
      <MultiSelect
        searchTitle={'Select at least 1 cause*'}
        max={5}
        maxLabel={'Max. 5 causes'}
        items={items.slice(0, 30)}
        placeholder={'search a cause'}
        value={value}
        setValue={setValue}
        {...args}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
