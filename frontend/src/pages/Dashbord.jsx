import { useContext } from "react";
import { GlobalContext } from "../components/GlobalContext";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import LostForm from "../components/dashboard/Lostform";
import FoundForm from "../components/dashboard/Foundform";
import AllItems from "../components/dashboard/Allitems";
import SuccessStories from "../components/dashboard/SuccessStories";
import EditModal from "../components/dashboard/Editmodal";
import MatchModal from "../components/dashboard/MatchModalFixed";
import "../styles/Dashboard.css";

const TAB_COPY = {
  all: {
    title: "A cleaner command center for every report",
    description: "Search, filter, and manage all campus lost and found activity from one focused workspace.",
  },
  lost: {
    title: "Publish lost item details with less friction",
    description: "Capture the key information quickly so other students can recognize and return the item sooner.",
  },
  found: {
    title: "Turn found items into successful returns",
    description: "Post what you found with clear descriptions and images to help the right owner identify it.",
  },
  stories: {
    title: "Celebrate successful handoffs",
    description: "Keep a visible history of returned items and build trust around the campus recovery process.",
  },
};

export default function Dashbord() {
  const { formData, items, tabs } = useContext(GlobalContext);

  const lostCount = items.filter((item) => item.type === "lost").length;
  const foundCount = items.filter((item) => item.type === "found").length;
  const returnedCount = items.filter((item) => item.type === "returned").length;
  const myCount = items.filter((item) => item.reportedBy?.regdNo === formData.regdNo).length;
  const tabCopy = TAB_COPY[tabs] || TAB_COPY.all;

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <DashboardHeader />

        <section className="dashboard-hero">
          <div className="dashboard-panel">
            <h2>{tabCopy.title}</h2>
            <p>{tabCopy.description}</p>
            <div className="dashboard-panel-badges">
              <div className="dashboard-panel-badge">Student: {formData.name || "Active user"}</div>
              <div className="dashboard-panel-badge">Registration: {formData.regdNo || "Not available"}</div>
              <div className="dashboard-panel-badge">Section: {formData.section || "Not set"}</div>
            </div>
          </div>
          <div className="dashboard-metrics">
            <div className="dashboard-metric">
              <span>Lost reports</span>
              <strong>{lostCount}</strong>
            </div>
            <div className="dashboard-metric">
              <span>Found reports</span>
              <strong>{foundCount}</strong>
            </div>
            <div className="dashboard-metric">
              <span>Returned items</span>
              <strong>{returnedCount}</strong>
            </div>
            <div className="dashboard-metric">
              <span>Your reports</span>
              <strong>{myCount}</strong>
            </div>
          </div>
        </section>

        <section className="dashboard-content">
          <div className="dashboard-content-title">
            <div>
              <h3>
                {tabs === "lost" && "Lost item report"}
                {tabs === "found" && "Found item report"}
                {tabs === "all" && "All reports"}
                {tabs === "stories" && "Success stories"}
              </h3>
              <p>Focused layouts, better spacing, and clearer actions across the full workflow.</p>
            </div>
          </div>

          {tabs === "lost" && <LostForm />}
          {tabs === "found" && <FoundForm />}
          {tabs === "all" && <AllItems />}
          {tabs === "stories" && <SuccessStories />}
        </section>

        <EditModal />
        <MatchModal />
      </div>
    </div>
  );
}
