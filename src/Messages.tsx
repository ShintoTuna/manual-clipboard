import { FC, useState } from "react";
import MessageRow from "./MessageRow";
import { Message } from "./types";
import { getId } from "./utils";

interface MessagesProps {
  messages: Array<Message>;
  addNew: (message: Message) => void;
}

const Messages: FC<MessagesProps> = ({ messages, addNew }) => {
  const [newMessage, setNewMessage] = useState("");
  return (
    <div>
      {messages.map((message) => (
        <MessageRow key={getId()} message={message} />
      ))}
      <textarea
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            console.log("add");
            addNew(newMessage.trim());
            setNewMessage("");
          }
        }}
      />
    </div>
  );
};

export default Messages;
