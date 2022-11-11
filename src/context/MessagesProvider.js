import { createContext, useState } from "react";

const MessagesContext = createContext({});

export const MessagesProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userMsg, setUserMsg] = useState("");
  const [message, setMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);

  return (
    <MessagesContext.Provider
      value={{
        users,
        setUsers,
        userMsg,
        setUserMsg,
        messages,
        setMessages,
        message,
        setMessage,
        stompClient,
        setStompClient,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesContext;
