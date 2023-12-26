import { StoryFn } from '@storybook/react';
import { useState } from 'react';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import MultiSelect from 'src/Nowruz/modules/general/components/multiSelect/multiSelect';
import { MultiSelectItem } from 'src/Nowruz/modules/general/components/multiSelect/multiSelect.types';

export default {
  title: 'General/MultiSelect',
  component: MultiSelect,
} as const;

const keyItems = Object.keys(SOCIAL_CAUSES);
const items = keyItems.map((i) => {
  return { value: SOCIAL_CAUSES[i].value, label: SOCIAL_CAUSES[i].label };
});
const Template: StoryFn = (args) => {
  const [value, setValue] = useState<MultiSelectItem[]>([]);
  return (
    <div style={{ width: '480px' }}>
      <MultiSelect
        id="social causes"
        searchTitle={'Select at least 1 cause*'}
        max={5}
        maxLabel={'Max. 5 causes'}
        items={items.slice(0, 30)}
        placeholder={'search a cause'}
        componentValue={value}
        setComponentValue={setValue}
        customHeight="200px"
        {...args}
      />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/T0ZAkJOmRIvG3EmQgpgO0B/Socious-Web-App-3.1?type=design&node-id=860-141985&mode=design&t=3LRoEJuLxlz7ZWPR-0',
  },
};

export const NoPopularOptions = Template.bind({});
NoPopularOptions.args = {
  displayDefaultBadges: false,
};
NoPopularOptions.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/T0ZAkJOmRIvG3EmQgpgO0B/Socious-Web-App-3.1?type=design&node-id=860-141985&mode=design&t=3LRoEJuLxlz7ZWPR-0',
  },
};
