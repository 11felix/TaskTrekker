import React, { useContext } from "react";
import BtnPrimary from "./BtnPrimary.js";
import { useNavigate } from "react-router";
import { UserContext } from "../context/userContext.js";
import Cookies from "js-cookie";

const Navbar = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const handleLogout = () => {
        setUser(null);
        Cookies.remove("token");
        navigate("/login");
    };
    return (
        <div className="bg-white shadow h-14 grid grid-cols-2">
            <img
                className="mx-10 h-12 inline-block justify-self-start mt-1"
                src="./images/TaskTrekker-logo.png"
                alt="logo"
            />
            <div className="justify-self-end mt-2 mx-10">
                <BtnPrimary onClick={handleLogout}>Logout</BtnPrimary>
            </div>
        </div>
    );
};

export default Navbar;
