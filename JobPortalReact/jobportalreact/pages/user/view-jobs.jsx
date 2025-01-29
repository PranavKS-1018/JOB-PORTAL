import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ViewJobs() {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [applicationData, setApplicationData] = useState({
    jobId: 0,
    userId: 0,
    message: "",
    image: "",
    status: 0,
  });

  useEffect(() => {
    fetch("https://localhost:7095/api/Job/getalljobs")
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  const handleLogout = () => {
    if (confirm("Do you want to logout?")) {
      localStorage.clear();
      router.push("/");
    }
  };

  const handleSortChange = (event) => {
    setSelectedJob(event.target.value);
  };

  const handleApplyClick = (jobId) => {
    const userId = localStorage.getItem("userId");
    setApplicationData({ ...applicationData, jobId, userId: parseInt(userId) }); // Updated
    setShowPopup(true);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setApplicationData({ ...applicationData, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setApplicationData({ ...applicationData, image: base64String });
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch("https://localhost:7095/api/Application/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(applicationData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        console.log("Application submitted:", data);
        alert("Application submitted successfully!"); // Added alert
        setShowPopup(false);
      })
      .catch((error) => console.error("Error submitting application:", error));
  };

  const filteredJobs = selectedJob
    ? jobs.filter((job) => job.name === selectedJob)
    : jobs;

  return (
    <div className="main-container">
      <nav className="navbar">
        <div className="logo">USER HOME</div>
        <ul className="nav-links">
          <li><a onClick={() => router.push('/user/view-jobs')}>VIEW JOBS</a></li>
          <li><a onClick={() => router.push('/user/my-applications')}>MY APPLICATIONS</a></li>
          <li><a onClick={handleLogout}>LOGOUT</a></li>
        </ul>
      </nav>
      <div className="content">
        <h1>View Jobs</h1>
        <div className="sort-container">
          <label htmlFor="sort">Sort by Name: </label>
          <select id="sort" value={selectedJob} onChange={handleSortChange}>
            <option value="">All</option>
            {jobs.map((job, index) => (
              <option key={index} value={job.name}>{job.name}</option>
            ))}
          </select>
        </div>
        <table className="job-table">
          <thead>
            <tr>
              <th>Job ID</th> {/* Add this line */}
              <th>Name</th>
              <th>Description</th>
              <th>Location</th>
              <th>Skills Needed</th>
              <th>Salary</th>
              <th>Experience</th>
              <th>Employer Name</th>
              <th>Employer Email</th>
              <th>Employer Phone</th>
              <th>Apply</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job, index) => (
              <tr key={index}>
                <td>{job.jobId}</td> {/* Add this line */}
                <td>{job.name}</td>
                <td>{job.description}</td>
                <td>{job.location}</td>
                <td>{job.skillsNeeded}</td>
                <td>{job.salary}</td>
                <td>{job.experience}</td>
                <td>{job.employerName}</td>
                <td>{job.employerEmail}</td>
                <td>{job.employerPhone}</td>
                <td><button onClick={() => handleApplyClick(job.jobId)}>Apply</button></td> {/* Updated */}
              </tr>
            ))}
          </tbody>
        </table>
        {showPopup && (
          <div className="popup">
            <form onSubmit={handleFormSubmit}>
              <label>
                Message:
                <input
                  type="text"
                  name="message"
                  value={applicationData.message}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Resume:
                <input
                  type="file"
                  name="resume"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setShowPopup(false)}>Cancel</button>
            </form>
          </div>
        )}
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
          background-color: rgb(0, 115, 255);
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
        .popup {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: #fff;
          padding: 40px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          width: 400px;
        }
        .popup form {
          display: flex;
          flex-direction: column;
        }
        .popup label {
          margin-bottom: 10px;
        }
        .popup input {
          margin-bottom: 10px;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        .popup button {
          padding: 10px;
          background-color: rgb(0, 115, 255);
          color: #fff;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .popup button[type="button"] {
          background-color: #ccc;
          margin-left: 10px;
        }
      `}</style>
    </div>
  );
}
