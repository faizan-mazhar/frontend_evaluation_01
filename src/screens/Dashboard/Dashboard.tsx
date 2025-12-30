import { useNavigate } from "react-router-dom";
import './Dashboard.css'
const Dashboard = () => {
  const navigate = useNavigate();

  const actions = [
    { name: "Post Listing", path: "/postlisting" },
    { name: "Add Post", path: "/posts/add" },
    { name: "User Creation", path: "/registration" }
  ];

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="actionsGrid">
        {actions.map((action) => (
          <button
            key={action.name}
            onClick={() => navigate(action.path)}
            className="actionButton"
          >
            {action.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
