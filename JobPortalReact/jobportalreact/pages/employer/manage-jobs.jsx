import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ManageJobs() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [editJob, setEditJob] = useState(null);

  const handleLogout = () => {
    if (confirm("Do you want to logout?")) {
      localStorage.clear();
      router.push("/");
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const response = await fetch(`https://localhost:7095/api/Job/getjobsbyemployer?employerId=${userId}`);
        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (jobId) => {
    if (confirm("Do you want to delete this job?")) {
      try {
        await fetch(`https://localhost:7095/api/Job/deletejob?id=${jobId}`, { method: 'DELETE' });
        setJobs(jobs.filter(job => job.jobId !== jobId));
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
  };

  const handleEdit = (job) => {
    setEditJob(job);
  };

  const handleUpdate = async () => {
    if (!editJob) return;

    try {
      await fetch(`https://localhost:7095/api/Job/updatejob?id=${editJob.jobId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editJob),
      });
      setJobs(jobs.map(job => (job.jobId === editJob.jobId ? editJob : job)));
      setEditJob(null);
    } catch (error) {
      console.error("Error updating job:", error);
    }
  };

  return (
    <div className="main-container">
      <nav className="navbar">
        <div className="logo">EMPLOYER HOME</div>
        <ul className="nav-links">
          <li><a onClick={() => router.push('/employer/manage-jobs')}>MANAGE ADDED JOBS</a></li>
          <li><a onClick={() => router.push('/employer/view-application')}>VIEW APPLICATIONS</a></li>
          <li><a onClick={() => router.push('/employer/add-job')}>ADD JOB</a></li>
          <li><a onClick={handleLogout}>LOGOUT</a></li>
        </ul>
      </nav>
      <div className="content">
        <h1>Manage Added Jobs</h1>
        {jobs.length > 0 ? (
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job, index) => (
                <tr key={index}>
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
                  <td>
                    <button onClick={() => handleEdit(job)}>Update</button>
                    <button onClick={() => handleDelete(job.jobId)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No jobs found.</p>
        )}
      </div>

      {editJob && (
  <div className="popup">
    <div className="popup-content">
      <button className="close-button" onClick={() => setEditJob(null)}>X</button>
      <h2>Edit Job</h2>
      <form onSubmit={e => {e.preventDefault(); handleUpdate();}}>
        <label>
          Name:
          <input
            type="text"
            value={editJob.name}
            onChange={(e) => setEditJob({ ...editJob, name: e.target.value })}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={editJob.description}
            onChange={(e) => setEditJob({ ...editJob, description: e.target.value })}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={editJob.location}
            onChange={(e) => setEditJob({ ...editJob, location: e.target.value })}
          />
        </label>
        <label>
          Skills Needed:
          <input
            type="text"
            value={editJob.skillsNeeded}
            onChange={(e) => setEditJob({ ...editJob, skillsNeeded: e.target.value })}
          />
        </label>
        <label>
          Salary:
          <input
            type="number"
            value={editJob.salary}
            onChange={(e) => setEditJob({ ...editJob, salary: e.target.value })}
          />
        </label>
        <label>
          Experience:
          <input
            type="text"
            value={editJob.experience}
            onChange={(e) => setEditJob({ ...editJob, experience: e.target.value })}
          />
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => setEditJob(null)}>Cancel</button>
      </form>
    </div>
  </div>
)}

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
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  table, th, td {
    border: 1px solid #ccc;
  }
  th, td {
    padding: 10px;
    text-align: left;
  }
  th {
    background-color: #f4f4f4;
  }
  button {
    background-color: #ff0000;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }
  button:hover {
    background-color: #cc0000;
  }
  .popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    width: 80%;
    max-width: 500px;
  }
  .popup-content {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }
  .close-button {
    align-self: flex-end;
    background-color: transparent;
    border: none;
    font-size: 1.5em;
    cursor: pointer;
    color: #ff0000;
  }
  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
  input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1em;
  }
  button {
    margin-top: 10px;
  }
`}</style>

    </div>
  );
}
