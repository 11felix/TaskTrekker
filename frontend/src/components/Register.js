import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/register", data);
            if (response.data.error) {
                toast.error(response.data.error);
            } else {
                setData({
                    name: "",
                    email: "",
                    password: "",
                });
                toast.success("Account created successfully.");
                navigate("/login");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <main className="w-full flex">
            <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex">
                <img
                    className="object-cover"
                    src="./images/login-image.jpg"
                    alt="login-iamge"
                />
            </div>
            <div className="flex-1 flex items-center justify-center h-screen">
                <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
                    <div className="">
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                                Sign up
                            </h3>
                            <p className="">
                                Already have an account?{" "}
                                <Link
                                    to="/login"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>
                    <form onSubmit={registerUser} className="space-y-5">
                        <div>
                            <label className="font-medium">Name</label>
                            <input
                                type="text"
                                required
                                autoComplete="off"
                                value={data.name}
                                onChange={(e) => {
                                    setData({ ...data, name: e.target.value });
                                }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">Email</label>
                            <input
                                type="email"
                                required
                                autoComplete="off"
                                value={data.email}
                                onChange={(e) => {
                                    setData({ ...data, email: e.target.value });
                                }}
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div>
                            <label className="font-medium">Password</label>
                            <input
                                type="password"
                                required
                                value={data.password}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        password: e.target.value,
                                    });
                                }}
                                className="w-full mt-2 mb-5 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                        >
                            Create account
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
