// import React from 'react'

import ClientJobListing from "./ClientJobListing";

const ClientProject = () => {
  return (
    <div>
      <div>
        <ClientJobListing />
      </div>
    </div>
  );
};

export default ClientProject;

// import React, { useState, ChangeEvent } from "react";
// import {
//   Plus,
//   Calendar,
//   Clock,
//   // Users,
//   Briefcase,
//   // MoreHorizontal,
//   // Share,
//   Grid3X3,
//   List,
// } from "lucide-react";

// interface Project {
//   id: number;
//   title: string;
//   status: string;
//   duration: string;
//   posted: string;
//   tags: string[];
//   description: string;
//   requirements: string[];
//   experience: string;
//   budget: string;
// }

// interface ProjectCardProps {
//   project: Project;
//   isSelected: boolean;
//   onClick: () => void;
// }

// interface ProjectDetailsProps {
//   project: Project;
// }

// const ClientProject = () => {
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [sortBy, setSortBy] = useState<string>("Relevance");

//   const projects: Project[] = [
//     {
//       id: 1,
//       title: "Creative UI/UX Designer",
//       status: "Active Project",
//       duration: "2 Weeks | 50-100hrs",
//       posted: "2 days ago",
//       tags: ["Entry Level", "Figma", "Urgent"],
//       description:
//         "We are looking for someone who is an expert in UI/UX Development to join us. As, we are in pursuit of understanding human-computer interaction and user psychology.",
//       requirements: [
//         "Gather and evaluate user requirements in collaboration with product managers and engineers",
//         "Illustrate design ideas using storyboards, process flows and sitemaps",
//         "Design graphic user interface elements, like menus, tabs and widgets",
//       ],
//       experience: "Translate user requirements into design choices",
//       budget: "$5,000.00 USD",
//     },
//     {
//       id: 2,
//       title: "Frontend Developer",
//       status: "Active Project",
//       duration: "3 Weeks | 40-60hrs",
//       posted: "1 day ago",
//       tags: ["Intermediate", "React", "TypeScript"],
//       description:
//         "Looking for a skilled frontend developer to build modern web applications using React and TypeScript.",
//       requirements: [
//         "Proficiency in React and TypeScript",
//         "Experience with modern CSS frameworks",
//         "Understanding of responsive design principles",
//       ],
//       experience: "Minimum 2 years of frontend development experience",
//       budget: "$8,000.00 USD",
//     },
//     {
//       id: 3,
//       title: "Mobile App Designer",
//       status: "Active Project",
//       duration: "4 Weeks | 30-50hrs",
//       posted: "3 days ago",
//       tags: ["Expert", "iOS", "Android"],
//       description:
//         "We need an experienced mobile app designer to create intuitive and beautiful mobile experiences.",
//       requirements: [
//         "Expert knowledge of mobile design patterns",
//         "Experience with iOS and Android design guidelines",
//         "Proficiency in Sketch, Figma, or Adobe XD",
//       ],
//       experience: "Portfolio showcasing mobile app designs",
//       budget: "$12,000.00 USD",
//     },
//   ];

//   const ProjectCard: React.FC<ProjectCardProps> = ({
//     project,
//     isSelected,
//     onClick,
//   }) => (
//     <div
//       className={`border rounded-lg p-4 mb-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
//         isSelected
//           ? "border-purple-500 bg-purple-50"
//           : "border-gray-200 hover:border-gray-300"
//       }`}
//       onClick={onClick}
//     >
//       <div className="flex items-start justify-between mb-3">
//         <div className="flex items-center space-x-2">
//           <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
//             <Briefcase className="w-4 h-4 text-white" />
//           </div>
//           <span className="text-sm text-gray-500">{project.status}</span>
//         </div>
//         <div className="flex items-center space-x-1">
//           <div className="w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
//             <span className="text-xs text-white font-medium">A</span>
//           </div>
//           <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
//             <span className="text-xs text-white font-medium">B</span>
//           </div>
//           <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
//             <span className="text-xs text-white font-medium">C</span>
//           </div>
//           <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center">
//             <span className="text-xs text-white font-medium">+</span>
//           </div>
//         </div>
//       </div>

//       <h3 className="font-semibold text-lg mb-2">{project.title}</h3>

//       <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
//         <div className="flex items-center space-x-1">
//           <Clock className="w-4 h-4" />
//           <span>{project.duration}</span>
//         </div>
//         <div className="flex items-center space-x-1">
//           <Calendar className="w-4 h-4" />
//           <span>{project.posted}</span>
//         </div>
//       </div>

//       <div className="flex flex-wrap gap-2 mb-3">
//         {project.tags.map((tag, index) => (
//           <span
//             key={index}
//             className={`px-2 py-1 rounded-md bg-[#CEC4E2] text-xs font-medium `}
//           >
//             {tag}
//           </span>
//         ))}
//       </div>

//       <p className="text-gray-700 text-sm leading-relaxed">
//         {project.description}
//       </p>
//     </div>
//   );

//   const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => (
//     <div className="h-full bg-white">
//       <div className="p-3 border-b">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-2xl font-bold">{project.title}</h2>
//           {/* <div className="flex items-center space-x-2">
//             <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
//               <Share className="w-5 h-5" />
//             </button>
//             <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
//               <MoreHorizontal className="w-5 h-5" />
//             </button>
//           </div> */}
//         </div>

//         <div className="flex flex-col space-x-4 text-sm text-gray-600 mb-4">
//           <div className="flex items-center space-x-1">
//             {/* <Calendar className="w-4 h-4" /> */}
//             <span>Posted {project.posted}</span>
//           </div>
//           <div className="flex flex-col space-x-3 mt-3">
//             {/* <Clock className="w-4 h-4" /> */}
//             <p className="font-semibold">Deadline</p>
//             <span>{project.duration}</span>
//           </div>
//         </div>

//         <div className="flex flex-wrap gap-2 mb-4">
//           {project.tags.map((tag, index) => (
//             <span
//               key={index}
//               className={`px-3 py-1 rounded-md bg-[#CEC4E2] text-sm font-medium

//               `}
//             >
//               {tag}
//             </span>
//           ))}
//         </div>
//       </div>

//       <div className="p-3 overflow-y-auto">
//         <div className="mb-8">
//           <h3 className="text-lg font-semibold mb-3">Project Description</h3>
//           <p className="text-gray-700 leading-relaxed">{project.description}</p>
//         </div>

//         <div className="mb-8">
//           <h3 className="text-lg font-semibold mb-3">Requirements</h3>
//           <ul className="space-y-2">
//             {project.requirements.map((req, index) => (
//               <li key={index} className="flex items-start space-x-2">
//                 <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
//                 <span className="text-gray-700">{req}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <div className="mb-8">
//           <h3 className="text-lg font-semibold mb-3">Required Experience</h3>
//           <p className="text-gray-700">{project.experience}</p>
//         </div>

//         <div className="mb-8">
//           <h3 className="text-lg font-semibold mb-3">Team Members</h3>
//           <div className="flex items-center space-x-2">
//             <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center">
//               <span className="text-sm text-white font-medium">A</span>
//             </div>
//             <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
//               <span className="text-sm text-white font-medium">B</span>
//             </div>
//             <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
//               <span className="text-sm text-white font-medium">C</span>
//             </div>
//             <div className="w-10 h-10 bg-purple-400 rounded-full flex items-center justify-center">
//               <span className="text-sm text-white font-medium">+2</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="text-2xl font-bold text-purple-600 mb-4">
//         Budget: {project.budget}
//       </div>

//       <button className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors">
//         Edit Project
//       </button>
//     </div>
//   );

//   const ComingSoon: React.FC = () => (
//     <div className="h-full flex items-center justify-center bg-white">
//       <div className="text-center">
//         <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
//           <Briefcase className="w-12 h-12 text-purple-500" />
//         </div>
//         <h3 className="text-xl font-semibold text-gray-700 mb-2">
//           Coming Soon
//         </h3>
//         <p className="text-gray-500">Select a project to view details</p>
//       </div>
//     </div>
//   );

//   const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     setSortBy(e.target.value);
//   };

//   return (
//     <div className="min-h-screen ">
//       {/* Top Header */}
//       <div className=" px-2 sm:px-4  mb-5">
//         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 w-full md:w-auto">
//             <div className="flex items-center space-x-2">
//               <Grid3X3 className="w-5 h-5 text-gray-400" />
//               <span className="text-sm text-gray-600">Client Index</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <List className="w-5 h-5 text-gray-400" />
//               <span className="text-sm text-gray-600">Most Index</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <span className="text-sm text-gray-600">Sort by:</span>
//               <select
//                 value={sortBy}
//                 onChange={handleSortChange}
//                 className="border rounded px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
//               >
//                 <option>Relevance</option>
//                 <option>Date Posted</option>
//                 <option>Budget</option>
//                 <option>Duration</option>
//               </select>
//             </div>
//           </div>
//           <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2 w-full md:w-auto justify-center mt-2 md:mt-0">
//             <Plus className="w-4 h-4" />
//             <span>Add Project</span>
//           </button>
//         </div>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-5 h-[calc(100vh-80px)] md:h-[calc(100vh-96px)]">
//         {/* Project List */}
//         <div className="w-full lg:w-4/6 p-2 sm:p-4 md:p-6 overflow-y-auto max-h-[50vh] lg:max-h-full  rounded-2xl bg-white">
//           <h1 className="text-2xl font-bold mb-6">Active Projects</h1>
//           {projects.map((project) => (
//             <ProjectCard
//               key={project.id}
//               project={project}
//               isSelected={selectedProject?.id === project.id}
//               onClick={() => setSelectedProject(project)}
//             />
//           ))}
//         </div>

//         {/* Project Details Sidebar */}
//         <div className="w-full lg:w-2/6 rounded-2xl bg-white flex-1 min-h-[300px] max-h-[60vh] lg:max-h-full overflow-y-auto">
//           {selectedProject ? (
//             <div className="">
//               <ProjectDetails project={selectedProject} />
//             </div>
//           ) : (
//             <ComingSoon />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClientProject;
