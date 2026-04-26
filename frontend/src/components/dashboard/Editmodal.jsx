import { useContext } from "react";
import API from "../../api/api";
import { GlobalContext } from "../GlobalContext";

function Editmodal() {
  const { editing, fetchReports, setEditing, setItems } = useContext(GlobalContext);

  const handleSave = async () => {
    try {
      const updatedData = {
        itemName: editing.itemName,
        description: editing.description,
        type: editing.type,
        image: editing.image,
      };
      const res = await API.put(`/reports/${editing._id}`, {
        ...updatedData,
        title: editing.itemName,
      });
      setItems((prev) =>
        prev.map((it) => (it._id === editing._id ? res.data : it))
      );

      await fetchReports();
      setEditing(null);
      alert("Item updated successfully");
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const handleReturn = async () => {
    try {
      const updatedReport = await API.put(`/reports/${editing._id}`, {
        itemName: editing.itemName,
        description: editing.description,
        type: "returned",
        image: editing.image,
      });

      setItems((prev) =>
        prev.map((it) => (it._id === editing._id ? updatedReport.data : it))
      );

      await fetchReports();
      setEditing(null);
      alert("Item marked as returned");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleCloseModal = () => {
    setEditing(null);
  };

  return (
    <>
      {editing && (
        <div className="dashboard-modal">
          <div className="dashboard-modal-card">
            <div className="dashboard-modal-header">
              <div>
                <h3>Edit report</h3>
                <p>Update the item details or mark it as returned once the owner has claimed it.</p>
              </div>
              <button className="dashboard-button danger" onClick={handleCloseModal}>
                Close
              </button>
            </div>

            <div className="dashboard-form">
              <div className="dashboard-field">
                <label htmlFor="edit-item-name">Item name</label>
                <input
                  id="edit-item-name"
                  value={editing.itemName}
                  onChange={(e) => setEditing({ ...editing, itemName: e.target.value })}
                />
              </div>
              <div className="dashboard-field">
                <label htmlFor="edit-item-description">Description</label>
                <textarea
                  id="edit-item-description"
                  value={editing.description}
                  onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                />
              </div>
              <label className="dashboard-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setEditing({ ...editing, image: reader.result });
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <div>
                  <strong>Replace image</strong>
                  <span>Upload a new photo if the current image is unclear or outdated.</span>
                </div>
              </label>

              {editing.image && <img src={editing.image} alt="Edited item preview" className="dashboard-thumb" />}

              <div className="dashboard-button-row">
                <button className="dashboard-button success" onClick={handleReturn}>
                  Mark as returned
                </button>
                <button className="dashboard-button primary" onClick={handleSave}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Editmodal;
