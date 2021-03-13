import "./styles.css";
import Messages from "./Messages";
import { useState, useEffect, KeyboardEvent } from "react";
import { getId } from "./utils";
import { Actions, useNotepadState } from "./State";
import { Group, Message } from "./types";

export default function App() {
  const { state, dispatch } = useNotepadState();
  const [name, setName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const addNewMessage = (message: Message, group: typeof selectedGroup) => {
    if (group) {
      dispatch({
        type: Actions.addMessage,
        data: { message, group }
      });
    }
  };

  const addNewGroup = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch({ type: Actions.addGroup, data: name });
      setName("");
    }
  };

  useEffect(() => {
    dispatch({ type: Actions.hydrate });
  }, [dispatch]);

  return (
    <div className="App">
      <div>
        {state.notepad.map((group) => (
          <div key={getId()} onClick={() => setSelectedGroup(group)}>
            {selectedGroup?.name === group.name && `+`}
            {group.name}
          </div>
        ))}
        <input
          value={name}
          onChange={({ target }) => setName(target.value)}
          onKeyDown={addNewGroup}
        />
      </div>
      <div>
        {selectedGroup ? (
          <Messages
            messages={selectedGroup.messages}
            addNew={(msg) => addNewMessage(msg, selectedGroup)}
          />
        ) : (
          "Select group"
        )}
      </div>
    </div>
  );
}
