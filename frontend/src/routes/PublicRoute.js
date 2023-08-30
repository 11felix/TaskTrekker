import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext.js";

export function PublicRoute ({children}) {
    const {user, getUser} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        getUser();
    }, [user]);
    if(user !== null) {
        navigate('/');
    }
    return children;
}