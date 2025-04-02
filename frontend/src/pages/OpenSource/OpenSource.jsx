

import { FaGithub } from "react-icons/fa";

const OpenSourceContribution = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Open Source Contribution</h1>
      <p className="text-lg text-gray-700 text-center mb-6">
        Contributing to open source is a great way to improve your skills, give
        back to the community, and collaborate with developers worldwide.
      </p>

      <div className="mb-6 shadow-lg p-6 rounded-lg border">
        <h2 className="text-2xl font-semibold mb-4">What is Open Source Contribution?</h2>
        <p className="text-gray-700">
          Open source contribution means participating in publicly available projects
          by coding, reporting issues, writing documentation, designing, or helping
          communities grow. It is a collaborative effort where developers worldwide
          work together to improve software.
        </p>
      </div>

      <div className="mb-6 shadow-lg p-6 rounded-lg border">
        <h2 className="text-2xl font-semibold mb-4">Why Contribute to Open Source?</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Enhance your coding, collaboration, and problem-solving skills.</li>
          <li>Gain real-world experience and build a strong portfolio.</li>
          <li>Network with experienced developers and expand career opportunities.</li>
          <li>Give back to the community by improving software for everyone.</li>
        </ul>
      </div>

      <div className="mb-6 shadow-lg p-6 rounded-lg border">
        <h2 className="text-2xl font-semibold mb-4">How to Get Started?</h2>
        <ol className="list-decimal list-inside text-gray-700">
          <li>Find a project that interests you on GitHub or open-source platforms.</li>
          <li>Read the README file and contribution guidelines.</li>
          <li>Look for beginner-friendly issues labeled <strong>"good first issue"</strong>.</li>
          <li>Fork the repository and create a new branch.</li>
          <li>Make your changes, follow coding standards, and commit them.</li>
          <li>Submit a pull request and engage with the maintainers.</li>
        </ol>
      </div>

      <div className="mb-6 shadow-lg p-6 rounded-lg border">
        <h2 className="text-2xl font-semibold mb-4">Best Practices</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Write clear and meaningful commit messages.</li>
          <li>Follow the project’s coding and documentation standards.</li>
          <li>Engage in discussions and be respectful towards maintainers.</li>
          <li>Be patient and open to feedback for your contributions.</li>
        </ul>
      </div>

      <div className="mb-6 shadow-lg p-6 rounded-lg border">
        <h2 className="text-2xl font-semibold mb-4">Where to Find Open Source Projects?</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>
            <a
              href="https://github.com/trending"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Trending
            </a> - Discover trending repositories.
          </li>
          <li>
            <a
              href="https://opensource.google/projects/explore/featured"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Open Source
            </a> - Explore projects backed by Google.
          </li>
          <li>
            <a
              href="https://www.firsttimersonly.com/"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              First Timers Only
            </a> - Find beginner-friendly contributions.
          </li>
          <li>
            <a
              href="https://up-for-grabs.net/"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Up For Grabs
            </a> - Browse open-source projects with tasks for new contributors.
          </li>
        </ul>
      </div>

      <div className="text-center">
        <button
          className="bg-black text-white hover:bg-gray-800 flex items-center gap-2 px-6 py-3 rounded-lg"
        >
          <a href="https://opensource.guide/how-to-contribute/" target="_blank" rel="noopener noreferrer">
            <FaGithub /> Learn More
          </a>
        </button>
      </div>
    </div>
  );
};

export default OpenSourceContribution;
