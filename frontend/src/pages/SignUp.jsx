import { useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/authSlice";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });
   
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading,error} = useSelector((state)=>state.auth);


  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const signupHandler = async (e) => {
    e.preventDefault();

    if (!input.username || !input.email || !input.password) {
      toast.error("All fields are required!");
      return;
    }
    const result = await dispatch(signupUser(input));
    if(signupUser.fulfilled.match(result)){
      toast.success("Signup successful!");
      navigate("/login");
    }else{
      toast.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={signupHandler}
        className="bg-white shadow-lg rounded-lg p-8 w-96 flex flex-col gap-5"
      >
        <div className="mb-4">
          <h1 className="text-center font-bold text-2xl text-gray-700">LOGO</h1>
          <p className="text-sm text-center text-gray-500">
            Signup to see photos & videos from your friends
          </p>
        </div>

        <div>
          <label className="font-medium text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={input.username}
            onChange={changeEventHandler}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none my-2"
          />
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
            Signup
          </button>
        )}

        <span className="text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
