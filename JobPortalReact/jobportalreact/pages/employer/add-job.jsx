import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function AddJob() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    employerId: 0,
    name: '',
    description: '',
    location: '',
    skillsNeeded: '',
    salary: 0,
    experience: ''
  });

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setFormData(prevState => ({
        ...prevState,
        employerId: parseInt(userId)
      }));
    }
  }, []);

  const handleLogout = () => {
    if (confirm('Do you want to logout?')) {
      localStorage.clear();
      router.push('/');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description, location, skillsNeeded, salary, experience } = formData;

    if (name && description && location && skillsNeeded && salary && experience) {
        try {
            const response = await fetch('https://localhost:7095/api/Job/addjob', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Form submission failed.');
            }

            // Check if the response is JSON
            const contentType = response.headers.get('content-type');
            const data = contentType && contentType.includes('application/json') ? await response.json() : await response.text();

            if (contentType && contentType.includes('application/json')) {
                console.log('Form data submitted successfully:', data);
                // Handle successful submission
            } else {
                console.error('Response is not JSON:', data);
                alert(`${data}`);
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred. Please try again.');
        }
    } else {
        alert('Please fill in all fields.');
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
        <h1>Add Job</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Job Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Job Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </label>
          <label>
            Job Location
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />
          </label>
          <label>
            Skills Needed
            <input
              type="text"
              name="skillsNeeded"
              value={formData.skillsNeeded}
              onChange={handleChange}
            />
          </label>
          <label>
            Salary
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
            />
          </label>
          <label>
            Experience Needed
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
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
          max-width: 1000px;
          margin: 0 auto;
          background-color: #fff;
          padding: 30px;
          border-radius: 0 0 10px 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1em;
        }
        label {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        input, textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 5px;
          margin-top: 5px;
        }
        button {
          padding: 10px 20px;
          background-color: #4caf50;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:disabled {
          background-color: #ccc;
        }
      `}</style>
    </div>
  );
}
