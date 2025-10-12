import React, { ReactNode, useContext, useEffect, useReducer } from 'react';
import { Media, profile } from 'src/core/api';

interface State {
  bio: string;
  city: string;
  country: string;
  cityLabel: string;
  first_name: string;
  last_name: string;
  mission: string;
  mobile_country_code: string;
  phone: string;
  skills: string[];
  social_causes: string[];
  username: string;
  avatar: Media | undefined;
  address: string;
  orgName: string;
  orgType: { value: string; label: string };
  image: Media | undefined;
  email: string;
  website: string;
  size: { value: string; label: string } | null;
  shortname: string;
  industry: string;
}

type Action = { type: 'UPDATE_USER'; payload: Partial<State> } | { type: 'RESET' };

const initialState: State = {
  bio: '',
  city: '',
  country: '',
  cityLabel: '',
  first_name: '',
  last_name: '',
  mission: '',
  mobile_country_code: '',
  phone: '',
  skills: [] as string[],
  social_causes: [] as string[],
  username: '',
  address: '',
  orgName: '',
  orgType: { value: 'STARTUP', label: 'Impact Startup' },
  image: undefined,
  email: '',
  website: '',
  size: null,
  shortname: '',
  industry: '',
  avatar: undefined,
};

let type = localStorage.getItem('registerFor');

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'UPDATE_USER': {
      const filteredPayload = Object.keys(action.payload).reduce((filtered, key) => {
        if (Object.getOwnPropertyDescriptor(state, key)) {
          filtered[key] = action.payload[key];
        }
        return filtered;
      }, {});

      return {
        ...state,
        ...filteredPayload,
      };
    }
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

interface UserContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}
export const UserContext = React.createContext<UserContextProps | undefined>(undefined);

export interface UserProviderProps {
  children: ReactNode;
}
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await profile();
        dispatch({ type: 'UPDATE_USER', payload: userProfile });
      } catch (error) {
        console.error(error);
      }
    };

    if (localStorage.getItem('registerFor') === 'organization')
      dispatch({ type: 'UPDATE_USER', payload: initialState });
    else fetchData();
  }, []);
  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('must be used within a provider');
  }
  const { state, dispatch } = context;

  const updateUser = updates => {
    dispatch({ type: 'UPDATE_USER', payload: updates });
  };
  const reset = () => {
    type = 'user';
    dispatch({ type: 'RESET' });
  };
  return { updateUser, reset, state };
};
