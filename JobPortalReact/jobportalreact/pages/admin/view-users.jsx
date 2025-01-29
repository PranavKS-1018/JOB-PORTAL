import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ViewUsers() {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  const handleLogout = () => {
    if (confirm("Do you want to logout?")) {
      localStorage.clear();
      router.push("/");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://localhost:7095/api/Authentication/getallusers');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
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
        <h1>View Users</h1>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>User Type</th>
              <th>Name</th>
              <th>Age</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.userType}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
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
          padding: 12px;
          border: 1px solid #ddd;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
      `}</style>
    </div>
  );
}
