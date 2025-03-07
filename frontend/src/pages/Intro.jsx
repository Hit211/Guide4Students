import { Link as ScrollLink } from "react-scroll"; 
import { Link as RouterLink } from "react-router-dom"; 

const Intro = () => {
  return (
    <div>
      <div className="w-full bg-black shadow-md fixed top-0 left-0 z-50">
        <div className="w-[92%] mx-auto h-[70px] flex justify-between items-center p-5">
          {/* Logo */}
          <div className="text-2xl font-bold text-white">Guide4Students</div>

          <div className="md:flex hidden items-center gap-8">
            <ul className="flex gap-8 text-lg font-medium text-white">
              <li>
                <ScrollLink
                  to="home"
                  smooth={true}
                  duration={500}
                  className="hover:text-yellow-500 transition duration-300 ease-in-out hover:scale-105 cursor-pointer hover:border-b-4 hover:border-yellow-500"
                >  
                  Home
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="about"
                  smooth={true}
                  duration={500}
                  className="hover:text-yellow-500 transition duration-300 ease-in-out hover:scale-105 cursor-pointer hover:border-b-4 hover:border-yellow-500"
                >
                  About
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="contact"
                  smooth={true}
                  duration={500}
                  className="hover:text-yellow-500 transition duration-300 ease-in-out hover:scale-105 cursor-pointer hover:border-b-4 hover:border-yellow-500"
                >
                  Contact
                </ScrollLink>
              </li>
              <li>
                <RouterLink
                  to="/signup"
                  className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-yellow-500 transition duration-300 ease-in-out hover:scale-105 cursor-pointer hover:border-b-4 hover:border-yellow-500"
                >
                  Sign Up
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/login"
                  className="hover:text-yellow-500 transition duration-300 ease-in-out hover:scale-105 cursor-pointer hover:border-b-4 hover:border-yellow-500"
                >
                  Log In
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-black min-h-screen">
        {/* Hero Section */}
        <div
          id="home"
          className="w-full h-[80vh] bg-gradient-to-r from-gray-900 to-gray-800 flex flex-col justify-center items-center text-white text-center p-10 rounded-3xl shadow-lg"
        >
          <div className="bg-white bg-opacity-10 p-10 rounded-3xl shadow-xl backdrop-blur-md">
            <h1 className="text-5xl font-extrabold leading-tight mb-4 text-yellow-400 drop-shadow-lg">
              Welcome to Guide4Students
            </h1>
            <p className="text-lg font-semibold text-gray-300 max-w-2xl">
              Everything an IT student needs to succeed — from roadmaps to
              mentorship and beyond.
            </p>
            <div className="mt-6 flex gap-6">
              <RouterLink
                to="/signup"
                className="bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full hover:bg-yellow-400 transition duration-300 ease-in-out shadow-md transform hover:scale-105 cursor-pointer"
              >
                Get Started
              </RouterLink>
            </div>
          </div>
        </div>

        {/* Buckets Section */}
        <div
          id="buckets"
          className="max-w-screen-xl mx-auto py-16 text-center text-white"
        >
          <h2 className="text-3xl font-extrabold mb-4 text-yellow-400 drop-shadow-lg">
            What We Offer
          </h2>
          <p className="text-lg font-semibold text-gray-300 mb-6">
            Everything an IT student needs to succeed — from roadmaps to
            mentorship and beyond.
          </p>

          <div className="grid md:grid-cols-3 gap-8 p-3">
            {[
              {
                title: "Roadmaps",
                description:
                  "Guiding you through the best learning paths for a successful career in IT.",
              },
              {
                title: "Resources",
                description:
                  "Curated resources to help you grow, all in one place.",
              },
              {
                title: "Guidance",
                description:
                  "Personalized mentorship to help you navigate your college and career.",
              },
              {
                title: "Community",
                description:
                  "Join a network of like-minded students and developers to grow together.",
              },
              {
                title: "Open Source",
                description:
                  "Contribute to impactful open-source projects and enhance your skills.",
              },
              {
                title: "College Exam Material",
                description:
                  "Access study materials, tips, and tricks to ace your exams.",
              },
              {
                title: "IT Industry News",
                description:
                  "Stay updated with the latest trends and news in the IT world.",
              },
              {
                title: "Must-Know Tips",
                description:
                  "Essential tips for success in college and beyond.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-gray-900 shadow-2xl rounded-2xl border border-gray-700 relative z-10 hover:bg-gray-800 transition-transform transform hover:scale-105 cursor-pointer"
              >
                <h3 className="text-xl font-semibold mb-4 text-yellow-400">
                  {item.title}
                </h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="about" className="bg-black min-h-screen py-16">
        <div className="max-w-screen-xl mx-auto px-6">
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-yellow-500 mb-12 text-center">
            About Us
          </h1>

          {/* Blocks Section */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Block 1 */}
            <div className="p-8 bg-black shadow-2xl rounded-lg border-2 border-gray-300 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
                Our Journey
              </h3>
              <p className="text-lg text-white mb-4">
                We are a group of ex-students from the IT field, mostly from
                low-tier colleges. We understand the struggles and challenges
                faced by students in navigating the world of college,
                assignments, exams, and career-building.
              </p>
              <p className="text-lg text-white">
                We’ve been there — the late-night assignments, the doubts about
                whether that viva or exam even matters, and the uncertainty
                about which skills to focus on. We created Guide4Students to
                help you.
              </p>
            </div>

            {/* Block 2 */}
            <div className="p-8 bg-black shadow-2xl rounded-lg border-2 border-gray-300 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
                What We Offer
              </h3>
              <p className="text-lg text-white mb-4">
                Our platform provides guidance, mentorship, and resources to
                help students at any stage of their college life — from the
                first year to the final year exams.
              </p>
              <p className="text-lg text-white">
                We&apos;re here to provide direction, answer your questions, and
                give you the resources to not only succeed in college but thrive
                in your IT career.
              </p>
            </div>
          </div>

          {/* Block 3 */}
          <div className="mt-12 p-8 bg-black shadow-2xl rounded-lg border-2 border-gray-300 hover:shadow-xl transition-shadow duration-300 cursor-pointer">
            <h3 className="text-2xl font-semibold text-yellow-500 mb-4">
              Your Journey, Our Mission
            </h3>
            <p className="text-lg text-white">
              Don&apos;t stress out if you&apos;re feeling lost — we are here to
              guide you in every possible way. Whether it’s advice, real-world
              insights, or practical solutions to college and IT career
              challenges, we’ve got you covered.
            </p>
          </div>
        </div>
      </div>
      {/* Contact Section */}
      <div id="contact" className="bg-black min-h-screen py-16">
        <div className="max-w-screen-xl mx-auto px-6">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-yellow-500 mb-4">
              Contact Us
            </h1>
            <p className="text-lg font-medium text-white inline-block pb-2 transition-all duration-300 hover:border-b-4 hover:border-yellow-500 hover:font-semibold">
              Have questions or need guidance? We&apos;re here to help!
            </p>
          </div>

          {/* Form Section */}
          <form className="bg-black p-8 rounded-lg shadow-2xl max-w-xl mx-auto space-y-6">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 border-2 border-gray-300 bg-black text-white rounded-lg focus:outline-none focus:border-yellow-500 transition"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 border-2 border-gray-300 bg-black text-white rounded-lg focus:outline-none focus:border-yellow-500 transition"
              />
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Your Message"
                className="w-full p-4 border-2 border-gray-300 bg-black text-white rounded-lg focus:outline-none focus:border-yellow-500 transition"
                rows="4"
              ></textarea>
            </div>
            <button className="w-full bg-yellow-500 text-white px-6 py-3 rounded-full hover:bg-green-500 transition duration-300">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Intro;
