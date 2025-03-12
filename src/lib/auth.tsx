import axios from "axios";

export const checkAuth = async () => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_NODE_API_URL}/api/auth/check-auth`, {
            withCredentials: true,
        });
        return res.data.authenticated;
    } catch (error) {
        return false;
    }
};

export const logout = async () => {
    try {
        await axios.post(`${process.env.NEXT_PUBLIC_NODE_API_URL}/api/auth/logout`, {}, {
            withCredentials: true,
        });
        window.location.reload();
    } catch (error) {
        console.error("Logout failed", error);
    }
};
