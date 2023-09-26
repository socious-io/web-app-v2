import { ComponentMeta, ComponentStory } from '@storybook/react';

import { TwoThird } from '../components/templates/two-third/two-third';

export default {
  title: 'TEMPLATE/TwoThird',
  component: TwoThird,
} as ComponentMeta<typeof TwoThird>;

const Template: ComponentStory<typeof TwoThird> = (args) => <TwoThird {...args} />;

export const Primary = Template.bind({});

Primary.args = {
  top: (
    <div style={{ border: '1px solid black' }}>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis ex, porro magnam voluptatum nesciunt
      voluptatem! Alias earum exercitationem laudantium amet consectetur corporis totam ipsam natus accusamus, beatae
    </div>
  ),
  bottom: (
    <div style={{ border: '1px solid black' }}>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis ex, porro magnam voluptatum nesciunt
      voluptatem! Alias earum exercitationem laudantium amet consectetur corporis totam ipsam natus accusamus, beatae
      unde repudiandae tempora, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis ex, Lorem, ipsum
      dolor sit amet consectetur adipisicing elit. Officiis ex, porro magnam voluptatum nesciunt voluptatem! Alias earum
      exercitationem laudantium amet consectetur corporis totam ipsam natus accusamus, beatae unde repudiandae tempora,
      porro magnam voluptatum nesciunt voluptatem! Alias earum exercitationem laudantium amet consectetur corporis totam
      ipsam natus accusamus, beatae unde repudiandae tempora, Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      Officiis ex, porro magnam voluptatum nesciunt voluptatem! Alias earum exercitationem laudantium amet consectetur
      corporis totam ipsam natus accusamus, beatae unde repudiandae tempora, Lorem, ipsum dolor sit amet consectetur
      adipisicing elit. Officiis ex, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis ex, porro magnam
      voluptatum nesciunt voluptatem! Alias earum exercitationem laudantium amet consectetur corporis totam ipsam natus
      accusamus, beatae unde repudiandae tempora, porro magnam voluptatum nesciunt voluptatem! Alias earum
      exercitationem laudantium amet consectetur corporis totam ipsam natus accusamus, beatae unde repudiandae tempora,
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis ex, porro magnam voluptatum nesciunt
      voluptatem! Alias earum exercitationem laudantium amet consectetur corporis totam ipsam natus accusamus, beatae
      unde repudiandae tempora, Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis ex, Lorem, ipsum
      dolor sit amet consectetur adipisicing elit. Officiis ex, porro magnam voluptatum nesciunt voluptatem! Alias earum
      exercitationem laudantium amet consectetur corporis totam ipsam natus accusamus, beatae unde repudiandae tempora,
      porro magnam voluptatum nesciunt voluptatem! Alias earum exercitationem laudantium amet consectetur corporis totam
      ipsam natus accusamus, beatae unde repudiandae tempora,
    </div>
  ),
};
