import { createContext, useContext, useReducer } from 'react';
import { ExperienceReq, LanguageReq } from 'src/core/api';

interface State {
  skills: string[];
  summary: string;
  languages: LanguageReq[];
  experiences: ExperienceReq[];
}

const initialState: State = {
  skills: [],
  summary: '',
  languages: [],
  experiences: [],
};

type Action = { type: 'IMPORT_LINKEDIN_PROFILE'; payload: Partial<State> };

interface LinkedInContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const LinkedInContext = createContext<LinkedInContextProps>({
  state: initialState,
  dispatch: () => null,
});

export const LinkedInProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <LinkedInContext.Provider value={{ state, dispatch }}>{children}</LinkedInContext.Provider>;
};
export const useLinkedInContext = () => useContext(LinkedInContext);

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'IMPORT_LINKEDIN_PROFILE': {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
