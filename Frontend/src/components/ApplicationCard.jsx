import React from "react";
import "../styles/App.css";

function ApplicationCards({ app, onDelete }) {
  return (
    <div className="card">
      <div className="card-header">
        <h3>{app.company_name}</h3>
        <span className={`status ${app.status.toLowerCase()}`}>
          {app.status}
        </span>
      </div>

      <div className="card-body">
        <p><b>Role:</b> {app.role}</p>
        <p><b>Location:</b> {app.location}</p>
        <p><b>Applied On:</b> {app.applied_date}</p>
      </div>

      <div className="card-footer">
        <button className="delete-btn" onClick={() => onDelete(app.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ApplicationCards;
