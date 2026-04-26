import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";

function Allitems() {
  const { items, searchQuery, setSearchQuery, filter, setFilter, setEditing, user } = useContext(GlobalContext);
  const filtered = items.filter((it) => {
    if (it.type !== "lost" && it.type !== "found") return false;

    if (filter !== "all" && it.type !== filter) return false;

    if (!searchQuery) return true;

    return (
      (it.itemName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (it.description || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div>
      <div className="dashboard-toolbar">
        <input
          className="dashboard-search"
          placeholder="Search by item name or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="dashboard-chip-group">
          <button
            className={`dashboard-chip ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`dashboard-chip ${filter === "lost" ? "active" : ""}`}
            onClick={() => setFilter("lost")}
          >
            Lost
          </button>
          <button
            className={`dashboard-chip ${filter === "found" ? "active" : ""}`}
            onClick={() => setFilter("found")}
          >
            Found
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        {filtered.map((it) => (
          <article key={it._id} className="dashboard-card">
            <div className="dashboard-card-top">
              <div>
                <h4 className="dashboard-card-title">{it.itemName}</h4>
                <p className="dashboard-card-copy">{it.description}</p>
              </div>
              <span className={`dashboard-badge ${it.type}`}>{it.type}</span>
            </div>

            <div className="dashboard-meta">
              <span>Reported by: {it.reportedBy?.section || "N/A"} ({it.reportedBy?.regdNo || "N/A"})</span>
              <span>Reporter: {it.reportedBy?.name || "Unknown user"}</span>
            </div>

            {it.image && <img src={it.image} alt={it.itemName} className="dashboard-thumb" />}

            {it.reportedBy?._id === user?._id && (
              <div className="dashboard-card-actions">
                <button className="dashboard-button warning" onClick={() => setEditing(it)}>
                  Edit report
                </button>
              </div>
            )}
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="dashboard-empty">
          No items matched your search yet. Try another keyword or switch the filter.
        </div>
      )}
    </div>
  );
}

export default Allitems;
