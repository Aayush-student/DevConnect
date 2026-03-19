import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext();

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

export default function AppContextProvider({ children }) {
    const navigate = useNavigate();

    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
    const [user, setUser] = useState(null);
    const [rooms, setRooms] = useState([]);
    const [showLogin, setShowLogin] = useState(false);
    const [loading, setLoading] = useState(true);

    const saveTokens = (access, refresh) => {
        setAccessToken(access);
        setRefreshToken(refresh);
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
    };

    const clearAuth = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
    };

    const forceLogout = () => {
        clearAuth();
        setRooms([]);
        setShowLogin(false);
        navigate("/", { replace: true });
    };

    const fetchUser = async () => {
        if (!accessToken) {
            setLoading(false);
            return;
        }

        try {
            const { data } = await axios.get("/user/data", {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            if (data.success) setUser(data.data);
        } catch {
            forceLogout();
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await axios.post("/user/logout", {}, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            toast.success("Logged out");
        } finally {
            forceLogout();
        }
    };

    useEffect(() => {
        fetchUser();
    }, [accessToken]);

    const fetchRooms = async () => {
        try {
            const { data } = await axios.get("/rooms");
            if (data.success) setRooms(data.data);
        } catch {
            toast.error("Failed to load rooms");
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const value = {
        navigate,
        accessToken,
        setAccessToken,
        refreshToken,
        setRefreshToken,
        user,
        setUser,
        axios,
        fetchUser,
        fetchRooms,
        logout,
        showLogin,
        setShowLogin,
        rooms,
        setRooms,
        loading
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}