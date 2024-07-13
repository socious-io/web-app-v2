import { createContext, useContext, useReducer } from 'react';
import { CommentsRes } from 'src/core/api';

type StateType = {
  comments: Record<string, CommentsRes>;
  replies: Record<string, CommentsRes & { showed?: boolean }>;
};

type ActionType = { type: 'comments'; value: StateType['comments'] } | { type: 'replies'; value: StateType['replies'] };

const initialState = {
  comments: {},
  replies: {},
};

const FeedsContext = createContext<{
  state: StateType;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const FeedsProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return <FeedsContext.Provider value={{ state, dispatch }}>{children}</FeedsContext.Provider>;
};

export const useFeedsContext = () => useContext(FeedsContext);

const mainReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'comments': {
      return { ...state, comments: action.value };
    }
    case 'replies': {
      return { ...state, replies: action.value };
    }
    default: {
      throw Error('Unknown action: ' + action);
    }
  }
};
