import { Routes, Route } from "react-router-dom";
import Register from "./components/Register.js";
import Login from "./components/Login.js";
import Project from "./components/Project.js";
import Task from "./components/Task.js";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./routes/ProtectedRoute.js";
import { PublicRoute } from "./routes/PublicRoute.js";

axios.defaults.baseURL = "http://localhost:9000";
axios.defaults.withCredentials = true;

const App = () => {
    return (
        <>
            <Toaster
                position="bottom-right"
                toastOptions={{ duration: 2000 }}
            />
            <Routes>
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/:projectId"
                    element={
                        <ProtectedRoute>
                            <Task />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Project />
                        </ProtectedRoute>
                    }
                />{" "}
            </Routes>
        </>
    );
};

export default App;
