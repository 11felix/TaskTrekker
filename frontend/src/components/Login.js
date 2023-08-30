import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/login', data);
            if(response.data.error) {
                toast.error(response.data.error);
            } else {
                setData({
                    email: '',
                    password: ''
                });
                toast.success('Logged in successfully!');
                navigate('/');
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
                                Log In
                            </h3>
                            <p className="">
                                Don't have an account?{" "}
                                <Link
                                    to="/register"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                    <form onSubmit={loginUser} className="space-y-5">
                        <div>
                            <label className="font-medium">Email</label>
                            <input
                                type="email"
                                required
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
                                className="w-full mt-2 mb-7 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <button className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
                            Log in
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
