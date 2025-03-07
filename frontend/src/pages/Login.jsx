import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    if (!input.email || !input.password) {
      toast.error("All fields are required!");
      return;
    }

    try {
      setLoading(true);

     
      const payload = {
        email: input.email,
        password: input.password,
      };

      const res = await axios.post("http://localhost:3000/api/user/login", payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });


      if (res.data.success) {  
        toast.success(res.data.message);
        setInput({ email: "", password: "" });
        dispatch(login({user:res.data.user,token:res.data.token}));
        navigate("/dashboard");
      } else {
        toast.error(res.data.message);  
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={loginHandler}
        className="bg-white shadow-lg rounded-lg p-8 w-96 flex flex-col gap-5"
      >
        <div className="mb-4">
          <h1 className="text-center font-bold text-2xl text-gray-700">LOGO</h1>
          <p className="text-sm text-center text-gray-500">
           Login To Continue
          </p>
        </div>

        <div>
          <label className="font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none my-2"
          />
        </div>

        <div>
          <label className="font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none my-2"
          />
        </div>

        {loading ? (
          <button
            disabled
            className="w-full flex items-center justify-center bg-blue-500 text-white py-2 rounded-md shadow-md cursor-not-allowed"
          >
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait...
          </button>
        ) : (
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        )}

        <span className="text-center text-gray-600">
          Create account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
