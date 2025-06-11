import React from "react";
import {
  Check,
  Share,
  MessageCircle,
  Mail,
  Instagram,
  Twitter,
} from "lucide-react";

// Types
interface Skill {
  name: string;
  category: "technical" | "design" | "testing";
}

interface UserProfile {
  name: string;
  title: string;
  isVerified: boolean;
  bio: string;
  email: string;
  skills: Skill[];
  socialMedia: {
    instagram: string;
    twitter: string;
    linkedin: string;
  };
}

// Dummy Data
const userData: UserProfile = {
  name: "Arinola Olivia",
  title: "UI/UX Designer Web Developer",
  isVerified: true,
  bio: "Greetings, fellow recruiters! I'm thrilled to see your interest in exploring my profile. Hi, I'm Tommy, a web developer with a passion for building responsive, user-friendly websites and applications. I specialize in front-end technologies like HTML, CSS, JavaScript, and React, and I enjoy turning complex ideas into clean, functional designs.",
  email: "hellotommy@gmail.com",
  skills: [
    { name: "HTML/CSS", category: "technical" },
    { name: "Javascript", category: "technical" },
    { name: "USER TESTING", category: "testing" },
    { name: "Backend Development", category: "technical" },
    { name: "PRODUCT DESIGN", category: "design" },
    { name: "PRODUCT DESIGN", category: "design" },
  ],
  socialMedia: {
    instagram: "@arinola_olivia",
    twitter: "@arinola_olivia",
    linkedin: "arinola-olivia",
  },
};

const ProfilePage: React.FC = () => {
  const getSkillBgColor = (category: string): string => {
    switch (category) {
      case "technical":
        return "bg-purple-600";
      case "design":
        return "bg-blue-600";
      case "testing":
        return "bg-purple-700";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="p-6">
          {/* Welcome Text */}
          <div className="text-center mb-4">
            <p className="text-purple-600 font-medium text-sm mb-1">Welcome</p>
            <h1 className="text-2xl font-bold text-purple-800 mb-1">
              {userData.name}
            </h1>
            <p className="text-gray-600 text-sm">{userData.title}</p>

            {/* Verified Badge */}
            <div className="flex items-center justify-center mt-2">
              <div className="flex items-center bg-purple-600 text-white px-3 py-1 rounded-full text-xs">
                <Check className="w-3 h-3 mr-1" />
                Verified
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mb-6">
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex-1">
              HIRE ME
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1">
              <Share className="w-4 h-4" />
              SHARE
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              MESSAGES
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-6">
          <div className="bg-gray-50 rounded-xl p-4">
            {/* Bio Section */}
            <div className="mb-6">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium mb-4">
                BIO SUMMARY
              </button>
              <p className="text-gray-700 text-sm leading-relaxed">
                {userData.bio}
              </p>
            </div>

            {/* Skills Section */}
            <div className="mb-6">
              <div className="text-center mb-4">
                <button className="bg-white border-2 border-gray-300 text-gray-700 px-6 py-2 rounded-lg text-sm font-medium">
                  SKILLS
                </button>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {userData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className={`${getSkillBgColor(
                      skill.category
                    )} text-white px-3 py-1 rounded text-xs font-medium`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div className="text-center">
              <h3 className="font-bold text-gray-800 mb-3">CONTACT ME</h3>

              {/* Email */}
              <div className="flex items-center justify-center mb-4">
                <Mail className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-purple-600 text-sm">
                  {userData.email}
                </span>
              </div>

              {/* Social Media */}
              <div>
                <h4 className="font-bold text-gray-800 mb-3">Social Media</h4>
                <div className="flex justify-center gap-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <Twitter className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
