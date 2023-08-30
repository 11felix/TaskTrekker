import Navbar from "./Navbar.js";
import Sidebar from "./Sidebar.js";
import CenterTask from "./CenterTask.js";


export default function Task() {
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
                        <div className="flex"><CenterTask /></div>
                    </div>
                </div>
            </div>
        </>
    );
}
