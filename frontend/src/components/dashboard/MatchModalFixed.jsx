import { useContext, useEffect } from "react";
import { GlobalContext } from "../GlobalContext";
import API from "../../api/api";

function normalize(value) {
  return (value || "").trim().toLowerCase();
}

function isSimilar(left, right) {
  const a = normalize(left);
  const b = normalize(right);

  if (!a || !b) {
    return false;
  }

  return a.includes(b) || b.includes(a);
}

function getNewestItem(items) {
  return [...items].sort((left, right) => {
    const leftTime = new Date(left.createdAt || 0).getTime();
    const rightTime = new Date(right.createdAt || 0).getTime();
    return rightTime - leftTime;
  })[0];
}

function getOwnedItem(sourceItem, matchedItem, userId) {
  if (sourceItem.reportedBy?._id === userId) {
    return sourceItem;
  }

  if (matchedItem.reportedBy?._id === userId) {
    return matchedItem;
  }

  return null;
}

function MatchModalFixed() {
  const { items, matchCandidate, setItems, setMatchCandidate, fetchReports, user } =
    useContext(GlobalContext);

  useEffect(() => {
    if (matchCandidate) {
      return;
    }

    const activeItems = items.filter(
      (item) => item.type === "lost" || item.type === "found"
    );

    if (activeItems.length === 0) {
      return;
    }

    const newestItem = getNewestItem(activeItems);
    const targetType = newestItem.type === "found" ? "lost" : "found";
    const matches = activeItems.filter((item) => {
      if (item._id === newestItem._id || item.type !== targetType) {
        return false;
      }

      if (item.reportedBy?._id === newestItem.reportedBy?._id) {
        return false;
      }

      return (
        isSimilar(item.itemName, newestItem.itemName) ||
        isSimilar(item.description, newestItem.description) ||
        isSimilar(item.itemName, newestItem.description) ||
        isSimilar(item.description, newestItem.itemName)
      );
    });

    if (matches.length > 0) {
      setMatchCandidate({
        source: newestItem,
        matches,
      });
    }
  }, [items, matchCandidate, setMatchCandidate]);

  const confirmMatch = async (ownedItem, otherItem) => {
    try {
      await API.put(`/reports/${ownedItem._id}`, {
        itemName: ownedItem.itemName,
        description: ownedItem.description,
        type: "returned",
        image: ownedItem.image,
      });

      setItems((prev) =>
        prev.map((item) =>
          item._id === ownedItem._id ? { ...item, type: "returned" } : item
        )
      );
      setMatchCandidate(null);
      await fetchReports();
      alert(`"${ownedItem.itemName}" marked as returned after matching with "${otherItem.itemName}".`);
    } catch (error) {
      console.error("Error updating matched item:", error);
      alert("Unable to mark this item as returned.");
    }
  };

  const closeMatchModal = () => setMatchCandidate(null);

  if (!matchCandidate) {
    return null;
  }

  return (
    <div className="dashboard-modal">
      <div className="dashboard-modal-card">
        <div className="dashboard-modal-header">
          <div>
            <h3>Possible match found</h3>
            <p>A recently posted item looks similar to another report. Review the details below.</p>
          </div>
          <button className="dashboard-button danger" onClick={closeMatchModal}>
            Close
          </button>
        </div>

        <div className="dashboard-modal-grid">
          <article className="dashboard-card">
            <div className="dashboard-card-top">
              <div>
                <h4 className="dashboard-card-title">
                  {matchCandidate.source.type === "found" ? "Found item" : "Lost item"}
                </h4>
                <p className="dashboard-card-copy">{matchCandidate.source.itemName}</p>
              </div>
              <span className={`dashboard-badge ${matchCandidate.source.type}`}>{matchCandidate.source.type}</span>
            </div>
            <div className="dashboard-meta">
              <span>{matchCandidate.source.description}</span>
            </div>
            {matchCandidate.source.image && (
              <img
                src={matchCandidate.source.image}
                alt="source item"
                className="dashboard-thumb"
              />
            )}
          </article>

          {matchCandidate.matches.map((matchedItem) => (
            <article key={matchedItem._id} className="dashboard-card">
              <div className="dashboard-card-top">
                <div>
                  <h4 className="dashboard-card-title">{matchedItem.itemName}</h4>
                  <p className="dashboard-card-copy">{matchedItem.description}</p>
                </div>
                <span className={`dashboard-badge ${matchedItem.type}`}>{matchedItem.type}</span>
              </div>
              {matchedItem.image && (
                <img
                  src={matchedItem.image}
                  alt="matched item"
                  className="dashboard-thumb"
                />
              )}
              {(() => {
                const ownedItem = getOwnedItem(matchCandidate.source, matchedItem, user?._id);
                const otherItem =
                  ownedItem?._id === matchCandidate.source._id
                    ? matchedItem
                    : matchCandidate.source;

                if (!ownedItem) {
                  return null;
                }

                return (
                  <button
                    className="dashboard-button success"
                    onClick={() => confirmMatch(ownedItem, otherItem)}
                  >
                    This is Mine
                  </button>
                );
              })()}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MatchModalFixed;
