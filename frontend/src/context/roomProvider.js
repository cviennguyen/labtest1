import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RoomContext = createContext();

const RoomProvider = ({ children }) => {
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <RoomContext.Provider value={{ user, setUser }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
