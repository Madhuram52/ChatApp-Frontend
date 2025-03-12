'use client'
import { logout, checkAuth } from "@/lib/auth";
import { useAuth } from "@/context/AuthContext";

const Navigation = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const handleSignOut = async () => {
        logout();
        setIsAuthenticated(false);
    }
    return (
        <div>
            <div className=" flex justify-between p-2 pl-5  shadow-lg shadow-purple-300  rounded-sm">
                <div className="text-[20px] font-bold text-purple-600">MadChat</div>
                {isAuthenticated && <div>
                    <button onClick={handleSignOut} className="text-[14px] border bg-purple-700 text-white px-3 py-1.5 rounded-md">Signout</button>
                </div>}
            </div>

        </div>
    );
}

export default Navigation;