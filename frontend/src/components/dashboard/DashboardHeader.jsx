import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";

const TABS = [
  { id: "all", label: "All Reports" },
  { id: "lost", label: "Lost Report" },
  { id: "found", label: "Found Report" },
  { id: "stories", label: "Success Stories" },
];

function DashboardHeader() {
  const { formData, setIsLoggedIn, setRoute, setUser, settabs, tabs } = useContext(GlobalContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    settabs("all");
    setRoute("home");
  };

  return (
    <>
      <header className="dashboard-header">
        <div className="dashboard-header-brand">
          <div className="dashboard-logo">LF</div>
          <div>
            <h1>Campus Lost and Found</h1>
            <p>Dashboard for smoother reporting, search, and returns.</p>
          </div>
        </div>
        <div className="dashboard-header-actions">
          <div className="dashboard-user-pill">
            <strong>{formData.name || "User"}</strong> {formData.regdNo ? `(${formData.regdNo})` : ""}
          </div>
          <button className="dashboard-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-tabbar">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`dashboard-tab ${tabs === tab.id ? "active" : ""}`}
            onClick={() => settabs(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </>
  );
}

export default DashboardHeader;
