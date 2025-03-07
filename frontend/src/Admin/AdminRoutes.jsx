import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const AdminRoutes = () => {
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyToken = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/admin/verify", { withCredentials: true });
                setIsValid(response.data.success);
            } catch (error) {
                setIsValid(false);
                console.log(error);                
            } finally {
                setLoading(false);
            }
        };

        verifyToken();
    }, []);

    if (loading) return <p>Loading...</p>;

    return isValid ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminRoutes;
