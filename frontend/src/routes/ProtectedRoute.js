import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext.js";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
    const { user, getUser } = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            getUser();
        }
        if(document.cookie.length === 0)
            navigate('/login');
    }, [user]);
    if(user === null) {
        return <h1>Loading....</h1>
    }
    return children;
}
