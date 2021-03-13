import { createContext, FC, useContext, useReducer } from "react";
import { Group, Message, State } from "./types";
import { saveToLocalStorage, loadFromLocalStorage } from "./utils";

export enum Actions {
  addGroup,
  addMessage,
  hydrate
}

const initalState: State = {
  selected: null,
  notepad: []
};

type Action = { type: Actions; data?: any };
type Dispatch = (action: Action) => void;

const reducer = (state: State, { type, data }: Action): State => {
  switch (type) {
    case Actions.addGroup: {
      if (data) {
        const exists = state.notepad.find((group) => group.name === data);

        if (!exists) {
          const newState = {
            ...state,
            notepad: [...state.notepad, { name: data as string, messages: [] }]
          };
          saveToLocalStorage(newState);
          return newState;
        }
      }

      return state;
    }

    case Actions.addMessage: {
      const newNotepad = state.notepad.map((group) => {
        const res = data as { message: Message; group: Group };
        if (res.group.name === group.name) {
          group.messages.push(res.message);
          return group;
        } else {
          return group;
        }
      });

      const newState = { ...state, notepad: newNotepad };
      saveToLocalStorage(newState);
      return newState;
    }

    case Actions.hydrate: {
      const savedState = loadFromLocalStorage();
      if (savedState) {
        return savedState;
      }

      return state;
    }

    default:
      throw new Error(`Unhandled action: ${type}`);
  }
};

const NotepadStateContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

export const StateProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  // memoize???
  const value = { state, dispatch };

  return (
    <NotepadStateContext.Provider value={value}>
      {children}
    </NotepadStateContext.Provider>
  );
};

export const useNotepadState = () => {
  const state = useContext(NotepadStateContext);

  if (state === undefined) {
    throw new Error("useNotepadState must be used within StateProvider");
  }

  return state;
};
