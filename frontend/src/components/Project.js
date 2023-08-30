import Navbar from "./Navbar.js";
import Sidebar from "./Sidebar.js";

export default function Project() {
    return (
        <>
            <div className="bg-white">
                <Navbar />
                <div
                    className=" w-screen flex container mx-auto"
                    style={{ height: "calc(100vh - 56px)" }}
                >
                    <div className="w-[220px]">
                        <Sidebar />
                    </div>
                    <div className="flex-1">
                        <div className="flex">
                            <div className="flex flex-col items-center w-full pt-10">
                                <img
                                    src="./image/welcome.svg"
                                    className="w-5/12"
                                    alt=""
                                />
                                <h1 className="text-lg text-gray-600">
                                    Select or create new project
                                </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
