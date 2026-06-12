import { useEffect, useState } from "react";
import api from "../api";

function ApplicationsPage() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      const res = await api.get("/applications");
      setApps(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Applications Page</h1>

      <ul>
        {apps.map((app) => (
          <li key={app.id}>
            {app.company} - {app.role} - {app.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ApplicationsPage;
