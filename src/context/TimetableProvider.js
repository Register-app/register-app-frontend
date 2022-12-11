import { createContext, useState } from "react";

const TimetableContext = createContext({});

export const TimetableProvider = ({ children }) => {
  const [events, setEvents] = useState([]);


  return (
    <TimetableContext.Provider
      value={{
        events,
        setEvents,
      }}
    >
      {children}
    </TimetableContext.Provider>
  );
};

export default TimetableContext;
