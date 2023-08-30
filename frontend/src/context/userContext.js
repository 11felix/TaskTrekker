import axios from "axios";
import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const getUser = async () => {
        const { data } = await axios.get("/profile");
        setUser(data);
    };
    return (
        <UserContext.Provider value={{ user, setUser, getUser }}>
            {children}
        </UserContext.Provider>
    );
}
