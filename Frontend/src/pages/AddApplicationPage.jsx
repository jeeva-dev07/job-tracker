import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "../styles/App.css";

function AddApplicationPage() {
  const [form, setForm] = useState({
    company: "",
    role: "",
    status: "Applied",
    applied_on: "",
    location: "",
    job_url: "",
    notes: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/applications", form);
      alert("Application Added Successfully");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Failed to add application");
    }
  };

  return (
    <div className="add-page">
      <div className="add-card">
        <h2>Add Application</h2>

        <form onSubmit={submit}>
          <input
            name="company"
            placeholder="Company"
            onChange={handleChange}
          />

          <input
            name="role"
            placeholder="Role"
            onChange={handleChange}
          />

          <select name="status" onChange={handleChange}>
            <option value="Applied">Applied</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
          </select>

          <input
            type="date"
            name="applied_on"
            onChange={handleChange}
          />

          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
          />

          <input
            name="job_url"
            placeholder="Job URL"
            onChange={handleChange}
          />

          <textarea
            name="notes"
            placeholder="Notes"
            onChange={handleChange}
          />

          <button type="submit">Add Application</button>
        </form>
      </div>
    </div>
  );
}

export default AddApplicationPage;
