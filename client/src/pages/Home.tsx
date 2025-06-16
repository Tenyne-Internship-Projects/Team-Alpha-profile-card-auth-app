import UserList from "../components/home/UserLists";
import Navbar from "../components/Navbar";
import ProfilePage from "../components/ProfilePage";

const Home = () => {
  return (
    <div>
      <Navbar isAuthenticated={false} onLogout={() => {}} />
      <ProfilePage />
      <UserList />
    </div>
  );
};

export default Home;

// import { useEffect, useState } from "react";
// import axios from "../services/axiosInstance";
// import type { FreelancerProfile } from "../types/profile";

// export default function Home() {
//   const [freelancers, setFreelancers] = useState<FreelancerProfile[]>([]);

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       try {
//         const res = await axios.get<FreelancerProfile[]>("/profile"); // Get all public profiles
//         setFreelancers(res.data);
//       } catch (err) {
//         console.error("Error fetching freelancers:", err);
//       }
//     };
//     fetchProfiles();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 px-6 py-12">
//       <h1 className="text-3xl font-bold text-center mb-10">
//         🌟 Hire Top Freelancers
//       </h1>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {freelancers.length === 0 ? (
//           <p className="text-center col-span-full">No freelancers found.</p>
//         ) : (
//           freelancers.map((freelancer) => (
//             <div
//               key={freelancer._id}
//               className="bg-white rounded-xl shadow p-6 space-y-3"
//             >
//               <div className="flex items-center space-x-4">
//                 <img
//                   src={freelancer.imageUrl || "https://via.placeholder.com/80"}
//                   alt={freelancer.name}
//                   className="w-16 h-16 rounded-full object-cover"
//                 />
//                 <div>
//                   <h2 className="font-bold text-lg">{freelancer.name}</h2>
//                   <p className="text-sm text-gray-500">{freelancer.title}</p>
//                 </div>
//               </div>
//               <p className="text-gray-700 text-sm">{freelancer.bio}</p>
//               <div className="text-sm">
//                 <p>
//                   <strong>Skills:</strong> {freelancer.skills}
//                 </p>
//                 <p>
//                   <strong>Location:</strong> {freelancer.location}
//                 </p>
//               </div>
//               <div className="flex space-x-4 mt-2 text-sm text-blue-500">
//                 {freelancer.github && (
//                   <a
//                     href={freelancer.github}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     GitHub
//                   </a>
//                 )}
//                 {freelancer.linkedin && (
//                   <a
//                     href={freelancer.linkedin}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     LinkedIn
//                   </a>
//                 )}
//                 {freelancer.portfolio && (
//                   <a
//                     href={freelancer.portfolio}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     Portfolio
//                   </a>
//                 )}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }
