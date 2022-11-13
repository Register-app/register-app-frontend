import { createContext, useState } from "react";

const MessagesContext = createContext({});

export const MessagesProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [userMsg, setUserMsg] = useState(null);
  const [message, setMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [subscription, setSubscription] = useState(null);

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
        subscription,
        setSubscription,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesContext;
