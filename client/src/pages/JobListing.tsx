// import { useEffect, useState } from "react";
import JobBoard from "../components/freelancerComponent/FreelancePage";
// import axios from "../services/axiosInstance";

// interface Project {
//   // Define the shape of your project object here
//   id: number;
//   title: string;
//   // ...other fields
// }

const JobListing = () => {
  // const [projects, setProjects] = useState<Project[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   setLoading(true);
  //   const fetchProjects = async () => {
  //     try {
  //       const response = await axios.get("/project");
  //       // setProjects(response.data);
  //       console.log(response.data); // Adjust if your API response shape is different
  //       // setError(null);
  //     } catch (err: any) {
  //       setError(err.message || "Failed to fetch projects.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProjects();
  // }, []);

  return (
    <div>
      {/* {loading && <p>Loading projects...</p>}
      {error && <p className="text-red-500">{error}</p>} */}
      <p>Projects</p>
      {/* <p>
        {projects}
      </p> */}
      <JobBoard
      // projects={projects}
      />
    </div>
  );
};

export default JobListing;
