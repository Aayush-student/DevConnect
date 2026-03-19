import { useContext, useEffect } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
    const { user, loading, setShowLogin } = useContext(AppContext);
    const location = useLocation();

    useEffect(() => {
        if (!loading && !user && location.pathname !== '/') {
            setShowLogin(true);

            if (!toast.isActive("auth-shield")) {
                toast.error("LOGIN REQUIRED", {
                    toastId: "auth-shield"
                });
            }
        }
    }, [user, loading, location.pathname]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0B0E14] flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user) return null;

    return children;
};

export default ProtectedRoute;