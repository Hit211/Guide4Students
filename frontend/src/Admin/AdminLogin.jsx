import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post("http://localhost:3000/api/admin/login", credentials, {
                withCredentials: true, 
            });

            if (response.data.success) {
                localStorage.setItem("user", JSON.stringify(response.data.user));

                if (response.data.user.role === "admin") {
                    navigate("/adminpanel");
                } else {
                    toast.error("Unauthorized access");
                    navigate("/dashboard");
                }
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white shadow-lg rounded-lg p-8 w-96 flex flex-col gap-5">
                <h2 className="text-center font-bold text-2xl text-gray-700">Admin Login</h2>
                <div>
                    <label className="font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none my-2"
                        required
                    />
                </div>

                <div>
                    <label className="font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none my-2"
                        required
                    />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300">
                    Login as Admin
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;
