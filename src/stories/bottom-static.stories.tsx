import { ComponentMeta, ComponentStory } from '@storybook/react';

import { BottomStatic } from '../components/templates/bottom-static/bottom-static';

export default {
  title: 'TEMPLATE/BottomStatic',
  component: BottomStatic,
} as ComponentMeta<typeof BottomStatic>;

const Template: ComponentStory<typeof BottomStatic> = (args) => (
  <>
    <BottomStatic>
      <div>top part, this part should be responsive</div>
      <div>bottom part, this part should be static, relative to viewport</div>
    </BottomStatic>
  </>
);

export const Primary = Template.bind({});

Primary.args = {};
