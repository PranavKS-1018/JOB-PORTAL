import { useRouter } from "next/router";

export default function UserHome() {
  const router = useRouter();

  const navigateTo = (page) => {
    router.push(`/user/${page}`);
  };

  const handleLogout = () => {
    if (confirm("Do you want to logout?")) {
      localStorage.clear();
      router.push("/");
    }
  };

  return (
    <div className="main-container">
      <nav className="navbar">
        <div className="logo">USER HOME</div>
        <ul className="nav-links">
          <li><a onClick={() => navigateTo('view-jobs')}>VIEW JOBS</a></li>
          <li><a onClick={() => navigateTo('my-applications')}>MY APPLICATIONS</a></li>
          <li><a onClick={handleLogout}>LOGOUT</a></li>
        </ul>
      </nav>      
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
          background-color:rgb(0, 115, 255);
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
          cursor: pointer; /* Updated to indicate it's clickable */
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
      `}</style>
    </div>
  );
}
