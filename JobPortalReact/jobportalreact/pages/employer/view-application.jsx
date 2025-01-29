import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaDownload } from "react-icons/fa";

export default function ViewApplications() {
  const router = useRouter();
  const [datas, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");

  const handleLogout = () => {
    if (confirm("Do you want to logout?")) {
      localStorage.clear();
      router.push("/");
    }
  };

  useEffect(() => {
      const fetchJobs = async () => {
        try {
          const response = await fetch(`https://localhost:7095/api/Application/applications`);
          const data = await response.json();
          setJobs(data);
        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
      };
  
      fetchJobs();
    }, []);
  
    const handleSortChange = (event) => {
      setSelectedJob(event.target.value);
  
    };
  
    const filteredJobs = selectedJob
      ? datas.filter((data) => data.jobDetails.name === selectedJob)
      : datas;

      const handleDownloadClick = (base64Image) => {
        const link = document.createElement("a");
        link.href = `data:image/png;base64,${base64Image}`;
        link.download = "resume.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

  return (
    <div className="main-container">
      <nav className="navbar">
        <div className="logo">EMPLOYER HOME</div>
        <ul className="nav-links">
          <li><a onClick={() => router.push('/employer/manage-jobs')}>MANAGE ADDED JOBS</a></li>
          <li><a onClick={() => router.push('/employer/view-applications')}>VIEW APPLICATIONS</a></li>
          <li><a onClick={() => router.push('/employer/add-job')}>ADD JOB</a></li>
          <li><a onClick={handleLogout}>LOGOUT</a></li>
        </ul>
      </nav>
      <div className="content">
        <h1>View Applications</h1>
        <div className="sort-container">
          <label htmlFor="sort">Sort by Name: </label>
          <select id="sort" value={selectedJob} onChange={handleSortChange}  className="sort-dropdown">
            <option value="">All</option>
            {datas.map((data, index) => (
              <option key={index} value={data.jobDetails.name}>{data.jobDetails.name}</option>
            ))}
          </select>
        </div>
        <table className="job-table">
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Location</th>
              <th>Skills Needed</th>
              <th>Salary</th>
              <th>Experience</th>
              <th>Employee Name</th>
              <th>Employee Age</th>
              <th>Employee Email</th>
              <th>Employee Phone</th>
              <th>Download Resume</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job, index) => (
              <tr key={index}>
                <td>{job.jobDetails.jobId}</td> {/* Add this line */}
                <td>{job.jobDetails.name}</td>
                <td>{job.jobDetails.description}</td>
                <td>{job.jobDetails.location}</td>
                <td>{job.jobDetails.skillsNeeded}</td>
                <td>{job.jobDetails.salary}</td>
                <td>{job.jobDetails.experience}</td>
                <td>{job.userDetails.age}</td>
                <td>{job.userDetails.name}</td>
                <td>{job.userDetails.phone}</td>
                <td>{job.userDetails.email}</td>
                <td><button onClick={() => handleDownloadClick(job.image)}><FaDownload /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <style jsx>{`
        .main-container {
          background-color: #f1fdf1;
          min-height: 100vh;
          padding: 20px;
        }
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background-color: rgb(255, 0, 0);
          border-radius: 10px 10px 0 0;
        }
        .logo {
          font-size: 1.5em;
          color: #fff;
          font-weight: bold;
        }
        .nav-links {
          display: flex;
          list-style: none;
        }
        .nav-links li {
          margin-left: 20px;
        }
        .nav-links a {
          color: #fff;
          text-decoration: none;
          font-size: 1em;
          cursor: pointer;
        }
        .nav-links a:hover {
          text-decoration: underline;
        }
        .content {
          max-width: 1200px;
          margin: 0 auto;
          background-color: #fff;
          padding: 30px;
          border-radius: 0 0 10px 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        h1 {
          margin: 0;
          font-size: 2.5em;
          text-align: center;
          color: #333;
        }
            .sort-container {
          margin-bottom: 20px;
          text-align: center;
        }
          .job-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        .job-table th, .job-table td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        .job-table th {
          background-color: #f2f2f2;
        }
        button {
          background-color: rgb(0, 115, 255);
          color: #fff;
          border: none;
          padding: 5px 10px;
          cursor: pointer;
          border-radius:5px;
        }
        button:hover {
          background-color: rgb(0, 95, 211);
        }
          .sort-container {
          margin-bottom: 20px;
          text-align: center;
        }
        .sort-dropdown {
          padding: 10px;
          font-size: 1em;
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: #fff;
          cursor: pointer;
        }
        .sort-dropdown:focus {
          outline: none;
          border-color: rgb(0, 115, 255);
        }
      `}</style>
    </div>
  );
}
