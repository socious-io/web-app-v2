import { configureStore, createSlice } from '@reduxjs/toolkit';
import { StoryFn } from '@storybook/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { IconDropDown } from 'src/Nowruz/modules/general/components/iconDropDown';

const imgUrl = 'https://socious-new.s3.ap-northeast-1.amazonaws.com/f9d1522cb673fa3d64e4243bd423e2bc.jpg';
const accounts = [
  { id: '1', img: imgUrl, type: 'users', name: 'Umaya', username: 'umayausername', selected: true, current: true },
  { id: '2', type: 'organizations', name: 'Ocean', username: 'oceanusername', selected: false, current: false },
];
const items = [
  { iconName: 'user-circle', label: 'View profile' },
  {
    iconName: 'settings-01',
    label: 'Settings',
  },
  { iconName: 'log-out-01', label: 'Log out' },
];

export const MockedIdentity = {
  entities: accounts,
  status: 'succeeded',
  error: null,
  avatarImage: imgUrl,
};

export const MockedProfile = {
  user: {
    id: '1',
    img: imgUrl,
    type: 'users',
    name: 'Umaya',
    username: 'umayausername',
    selected: true,
    current: true,
  },
  profileReq: undefined,
  badges: [],
  missions: [],
  status: 'succeeded',
  error: null,
};

const Mockstore = ({ identityState, profileState, children }) => (
  <Provider
    store={configureStore({
      reducer: {
        profile: createSlice({
          name: 'profile',
          initialState: profileState,
          reducers: {
            setUser: (state, action) => {
              state.user = action.payload;
            },
          },
        }).reducer,
        identity: createSlice({
          name: 'identity',
          initialState: identityState,
          reducers: {
            setIdentityList: (state, action) => {
              state.entities = action.payload;
              if (action.payload.length) state.status = 'succeeded';
              const identity = state.entities.find((identity) => identity.current);
              if (identity && identity.meta) {
                state.avatarImage =
                  'avatar' in identity.meta
                    ? identity.meta.avatar || ''
                    : 'image' in identity.meta
                      ? identity.meta.image || ''
                      : '';
              } else state.avatarImage = '';
            },
            removeIdentityList: () => {
              return identityState;
            },
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export default {
  title: 'General/IconDropDown',
  component: IconDropDown,
  excludeStories: ['MockedIdentity', 'MockedProfile'],
} as const;

const Template: StoryFn = (args) => {
  return (
    <MemoryRouter initialEntries={['/']}>
      <Mockstore identityState={MockedIdentity} profileState={MockedProfile}>
        <div className="flex w-full h-10 items-center justify-center relative">
          <IconDropDown type="users" createItem {...args} />
        </div>
      </Mockstore>
    </MemoryRouter>
  );
};

export const Default = Template.bind({});
Default.args = {
  type: 'users',
  accounts: accounts,
  iconItems: items,
};
Default.parameters = {
  design: {
    type: 'figspec',
    url: 'https://www.figma.com/file/ZDDmg4Vg3c6qAG7CrZzwEm/DS-3.1-Shared-Components?type=design&node-id=16-3287&mode=design&t=ASfFmJQcG6mieWC9-0',
  },
};

export const Organization = Template.bind({});
Organization.args = {
  type: 'organizations',
  accounts: accounts,
  iconItems: items,
};
Organization.parameters = {
  design: {
    type: 'figspec',
    url: 'https://www.figma.com/file/ZDDmg4Vg3c6qAG7CrZzwEm/DS-3.1-Shared-Components?type=design&node-id=16-3287&mode=design&t=ASfFmJQcG6mieWC9-0',
  },
};
