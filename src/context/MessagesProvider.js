import { createContext, useState } from "react";

const MessagesContext = createContext({});

export const MessagesProvider = ({ children }) => {
  const [privateChats, setPrivateChats] = useState(new Map());
  const [tab, setTab] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    receivername: "",
    message: "",
  });

  return (
    <MessagesContext.Provider
      value={{
        tab,
        setTab,
        userData,
        setUserData,
        privateChats,
        setPrivateChats,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesContext;
