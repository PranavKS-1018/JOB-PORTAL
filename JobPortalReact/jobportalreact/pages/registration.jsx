import { useState } from "react";
import { register } from "../utils/api";
import Link from 'next/link'; // Import Link from next/link

export default function RegistrationPage() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("USER");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    const data = await register(name, age, phone, email, password, userType);

    if (data.success) {
      setRegistrationSuccess(true); // Set registration success to true
      alert("Registration successful!");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="main">
      <h1 className="main-header">JOB PORTAL</h1>
      <div className="container">
        <h2 className="header">Register</h2>
        <form onSubmit={handleRegister}>
          <input className="input" type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder="Name" required />
          <input className="input" type="number" onChange={(e) => setAge(e.target.value)} value={age} placeholder="Age" required />
          <input className="input" type="text" onChange={(e) => setPhone(e.target.value)} value={phone} placeholder="Phone" required />
          <input className="input" type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" required />
          <input className="input" type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Password" required />
          <select className="select" onChange={(e) => setUserType(e.target.value)} value={userType}>
            <option value="EMPLOYER">EMPLOYER</option>
            <option value="USER">USER</option>
          </select>
          <button className="button" type="submit">Register</button>
        </form>
          <p className="login-link">
             <a href="/">Go to Login</a>
          </p>
      </div>

      <style jsx>{`
        .main {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          background-color: #f7f7f7;
          min-height: 100vh;
        }
        .main-header {
          font-size: 2.5em;
          font-weight: bold;
          color: #333;
          margin: 20px 0;
          text-align: center;
        }
        .container {
          width: 100%;
          max-width: 400px;
          background-color: #fff;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          font-size: 1.5em;
          text-align: center;
          margin-bottom: 20px;
          color: #0070f3;
        }
        .input,
        .select {
          width: 90%;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #ccd;
          border-radius: 5px;
        }
        .button {
          width: 100%;
          padding: 12px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-top: 10px;
          font-size: 1em;
          transition: background-color 0.3s ease;
        }
        .button:hover {
          background-color: #005bb5;
        }
        .login-link {
          margin-top: 20px;
          text-align: center;
          color: #0070f3;
          font-weight: bold;
        }        
      `}</style>
    </div>
  );
}
