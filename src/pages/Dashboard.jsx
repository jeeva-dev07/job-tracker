import { useEffect, useState } from "react";
import api from "../api";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/App.css";

function Dashboard() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await api.get("/applications");
      setApps(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load applications");
    }
  };

  const remove = async (id) => {
    try {
      await api.delete(`/applications/${id}`);
      load();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  const edit = async (app) => {
    const status = prompt("Enter Status (Applied / Interview / Rejected)", app.status);

    if (!status) return;

    try {
      await api.put(`/applications/${app.id}`, {
        company: app.company,
        role: app.role,
        status,
      });

      load();
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  return (
    <div className="dashboard">
      <Navbar />

      {/* STATS CARDS */}
      <div className="cards">
        <div className="card-box">
          <h3>Total</h3>
          <h1>{apps.length}</h1>
        </div>

        <div className="card-box">
          <h3>Applied</h3>
          <h1>{apps.filter((a) => a.status === "Applied").length}</h1>
        </div>

        <div className="card-box">
          <h3>Interview</h3>
          <h1>{apps.filter((a) => a.status === "Interview").length}</h1>
        </div>

        <div className="card-box">
          <h3>Rejected</h3>
          <h1>{apps.filter((a) => a.status === "Rejected").length}</h1>
        </div>
      </div>

      {/* ADD BUTTON */}
      <div className="dashboard-header">
        <Link to="/add" className="add-btn">
          + Add Application
        </Link>
      </div>

      {/* TABLE */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {apps.length === 0 ? (
              <tr>
                <td colSpan="4">No Applications Found</td>
              </tr>
            ) : (
              apps.map((a) => (
                <tr key={a.id}>
                  <td>{a.company}</td>
                  <td>{a.role}</td>
                  <td>{a.status}</td>
                  <td>
                    <button className="btn edit-btn" onClick={() => edit(a)}>
                      Edit
                    </button>

                    <button className="btn delete-btn" onClick={() => remove(a.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
