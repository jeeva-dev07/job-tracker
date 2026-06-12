import { Link } from "react-router-dom";

function Navbar() {
  const logout = () => { 
    localStorage.removeItem("user"); 
    window.location.href = "/login"; 
  };

  return (
    <nav className="navbar">
      {/* CSS-oda match aaga class name-ai 'nav-links' nu mathiten */}
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/applications">Applications</Link>
      </div>
      <button className="logout-btn" onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navbar;
