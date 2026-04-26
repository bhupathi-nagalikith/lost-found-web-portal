import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";

function SuccessStories() {
  const { items } = useContext(GlobalContext);
  const returnedItems = items.filter((item) => item.type === "returned");

  return (
    <div>
      {returnedItems.length === 0 ? (
        <div className="dashboard-empty">
          No success stories yet. Returned items will appear here once a handoff is confirmed.
        </div>
      ) : (
        <div className="dashboard-grid">
          {returnedItems.map((item) => (
            <article key={item._id} className="dashboard-card">
              <div className="dashboard-card-top">
                <div>
                  <h4 className="dashboard-card-title">{item.itemName}</h4>
                  <p className="dashboard-card-copy">{item.description}</p>
                </div>
                <span className="dashboard-badge returned">returned</span>
              </div>
              <div className="dashboard-meta">
                <span>Reported by: {item.reportedBy?.name || "Unknown"}</span>
                <span>Item status: Successfully returned</span>
              </div>
              {item.image && <img src={item.image} alt="returned item" className="dashboard-thumb" />}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default SuccessStories;
