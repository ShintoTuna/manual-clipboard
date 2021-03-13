import { useRef, useState, FC, useEffect } from "react";
import { Message } from "./types";

interface MessageRowProps {
  message: Message;
}

const MessageRow: FC<MessageRowProps> = ({ message }) => {
  const [msg, setMsg] = useState("");
  const field = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMsg(message);
  }, []);

  const copyToClipboard = () => {
    const message = field?.current;
    if (message) {
      message.select();
      message.setSelectionRange(0, 999999);
      document.execCommand("copy");
      console.log(message.value);
      document.getSelection()?.removeAllRanges();
    }
  };

  return (
    <div>
      <textarea
        ref={field}
        value={msg}
        onChange={({ target }) => setMsg(target.value)}
      />
      <button onClick={() => copyToClipboard()}>copy</button>
    </div>
  );
};

export default MessageRow;
