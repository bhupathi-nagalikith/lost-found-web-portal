import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { createReport } from "../../api/reportApi";

function Foundform() {
  const { found, fetchReports, setFound, settabs } = useContext(GlobalContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFound({
      ...found,
      [name]: value
    });
  };

  const handleFoundSubmit = async (e) => {
    e.preventDefault();

    try {
      await createReport({
        itemName: found.itemname,
        description: found.des,
        type: "found",
        image: found.image
      });
      await fetchReports();
      setFound({ itemname: "", des: "", image: "" });
      settabs("all");
      alert("Found report submitted successfully");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="dashboard-form-wrap">
      <div className="dashboard-form-card">
        <h3>Report a found item</h3>
        <p>Help the owner identify it by posting a concise description and a clear image.</p>

        <form className="dashboard-form" onSubmit={handleFoundSubmit}>
          <div className="dashboard-field">
            <label htmlFor="found-item-name">Item name</label>
            <input
              id="found-item-name"
              name="itemname"
              value={found.itemname}
              onChange={handleChange}
              placeholder="Example: Silver water bottle"
            />
          </div>

          <div className="dashboard-field">
            <label htmlFor="found-item-description">Description</label>
            <textarea
              id="found-item-description"
              name="des"
              value={found.des}
              onChange={handleChange}
              placeholder="Mention where you found it, condition, brand, and anything unique"
            />
          </div>

          <label className="dashboard-upload">
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setFound({
                      ...found,
                      image: reader.result
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <div>
              <strong>Upload a reference photo</strong>
              <span>Show the item clearly while avoiding private details when possible.</span>
            </div>
          </label>

          {found.image && (
            <div className="dashboard-preview">
              <img className="dashboard-thumb" src={found.image} alt="Found item preview" />
            </div>
          )}

          <button type="submit" className="dashboard-form-submit">
            Submit found report
          </button>
        </form>
      </div>

      <aside className="dashboard-form-card">
        <h3>How to make returns easier</h3>
        <p>Useful found-item posts make it easier for the rightful owner to confirm what belongs to them.</p>
        <div className="dashboard-help-list">
          <div className="dashboard-help-item">
            <strong>Mention the discovery spot</strong>
            Include the exact building, corridor, desk, or area where it was found.
          </div>
          <div className="dashboard-help-item">
            <strong>Balance detail and privacy</strong>
            Share enough information to identify the item, but not every hidden detail.
          </div>
          <div className="dashboard-help-item">
            <strong>Post it quickly</strong>
            Recent found-item reports are easier for owners to spot before they lose track.
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Foundform;
