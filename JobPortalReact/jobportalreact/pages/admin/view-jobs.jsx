import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ViewJobs() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);

  const handleLogout = () => {
    if (confirm("Do you want to logout?")) {
      localStorage.clear();
      router.push("/");
    }
  };

  useEffect(() => {
    fetch('https://localhost:7095/api/Job/getalljobs')
      .then(response => response.json())
      .then(data => setJobs(data))
      .catch(error => console.error('Error fetching jobs:', error));
  }, []);

  return (
    <div className="main-container">
      <nav className="navbar">
        <div className="logo">ADMIN HOME</div>
        <ul className="nav-links">
          <li><a onClick={() => router.push('/admin/view-jobs')}>VIEW JOBS</a></li>
          <li><a onClick={() => router.push('/admin/view-users')}>VIEW USERS</a></li>
          <li><a onClick={handleLogout}>LOGOUT</a></li>
        </ul>
      </nav>
      <div className="content">
        <h1>View Jobs</h1>
        <table>
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Location</th>
              <th>Skills Needed</th>
              <th>Salary</th>
              <th>Experience</th>
              <th>Employer Name</th>
              <th>Employer Email</th>
              <th>Employer Phone</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.jobId}>
                <td>{job.jobId}</td>
                <td>{job.name}</td>
                <td>{job.description}</td>
                <td>{job.location}</td>
                <td>{job.skillsNeeded}</td>
                <td>{job.salary}</td>
                <td>{job.experience}</td>
                <td>{job.employerName}</td>
                <td>{job.employerEmail}</td>
                <td>{job.employerPhone}</td>
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
          background-color: #4caf50;
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
          max-width: 1000px;
          margin: 0 auto;
          background-color: #fff;
          padding: 30px;
          border-radius: 0 0 10px 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #4caf50;
          color: white;
        }
        tr:hover {
          background-color: #f5f5f5;
        }
        h1 {
          margin: 0;
          font-size: 2.5em;
          text-align: center;
          color: #333;
        }
      `}</style>
    </div>
  );
}
