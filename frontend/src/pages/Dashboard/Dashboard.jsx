import {Link, useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../redux/authSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {

    dispatch(logout());

    toast.success("Logged out successfully!");

    navigate("/login");
  };

  return (
    <div className="bg-black min-h-screen py-16 relative">
        <button onClick={logoutHandler} className="h-[2rem] rounded-full w-[4rem] absolute top-[2rem] right-[2rem] p-[2px] bg-[azure] font-bold text-center text-[darkviolet] ">LogOut</button>
    <div className="max-w-screen-xl mx-auto px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-yellow-500 mb-4">
          Dashboard
        </h1>
        <p className="text-lg font-medium text-white inline-block pb-2 transition-all duration-300 hover:border-b-4 hover:border-yellow-500 hover:font-semibold">
          Manage and explore your options
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
       <Link to="/dashboard/roadmap">
       <div className="p-8 bg-black shadow-2xl rounded-lg border-2 border-gray-300 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
            Looking For Any roadmaps And Resources??
          </h3>
          <p className="text-lg text-white">
            Get curated roadmaps and resources to guide your learning and career development.
          </p>
        </div>
       </Link>
        <Link to="/dashboard/community">
        <div className="p-8 bg-black shadow-2xl rounded-lg border-2 border-gray-300 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
            Want To Join Any Community??
          </h3>
          <p className="text-lg text-white">
            Join like-minded peers and professionals in a community designed to foster learning and collaboration.
          </p>
        </div>
        </Link>
        <Link to='/dashboard/advice'>
        <div className="p-8 bg-black shadow-2xl rounded-lg border-2 border-gray-300 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
            Looking For 1:1 Advice??
          </h3>
          <p className="text-lg text-white">
            Get personalized 1:1 mentorship and advice to solve specific problems and guide you in your career.
          </p>
        </div>
        </Link>
  
        <div className="p-8 bg-black shadow-2xl rounded-lg border-2 border-gray-300 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
            Want To Know About Open-Source Contribution??
          </h3>
          <p className="text-lg text-white">
            Discover opportunities to contribute to impactful open-source projects, enhance your skills, and network with professionals.
          </p>
        </div>

        <div className="p-8 bg-black shadow-2xl rounded-lg border-2 border-gray-300 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
            Looking For College Exam Material??
          </h3>
          <p className="text-lg text-white">
            Access study materials, tips, and resources to help you ace your college exams with ease.
          </p>
        </div>
  
        <Link to="/dashboard/news">
        <div className="p-8 bg-black shadow-2xl rounded-lg border-2 border-gray-300 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
            News Section
          </h3>
          <p className="text-lg text-white">
            Stay updated with the latest trends and news in the IT world and educational opportunities.
          </p>
        </div>
        </Link>
  

        <Link to="/dashboard/imp">
        <div className="p-8 bg-black shadow-2xl rounded-lg border-2 border-gray-300 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
          <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
            Things Must Know
          </h3>
          <p className="text-lg text-white">
            Essential tips, tricks, and must-know facts for succeeding in college and in the IT field.
          </p>
        </div>
        </Link>
      </div>
    </div>
  </div>
  
  )
}

export default Dashboard