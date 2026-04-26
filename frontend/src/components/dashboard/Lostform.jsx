import { useContext } from "react";
import { GlobalContext } from "../GlobalContext";
import { createReport } from "../../api/reportApi";

function Lostform() {
  const { fetchReports, lost, setLost, settabs } = useContext(GlobalContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLost({
      ...lost,
      [name]: value
    });
  };

  const handleLostSubmit = async (e) => {
    e.preventDefault();

    try {
      await createReport({
        itemName: lost.itemname,
        description: lost.des,
        type: "lost",
        image: lost.image
      });
      await fetchReports();
      setLost({ itemname: "", des: "", image: "" });
      settabs("all");
      alert("Lost report submitted successfully");
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div className="dashboard-form-wrap">
      <div className="dashboard-form-card">
        <h3>Report a lost item</h3>
        <p>Describe the item clearly so others can identify it quickly.</p>

        <form className="dashboard-form" onSubmit={handleLostSubmit}>
          <div className="dashboard-field">
            <label htmlFor="lost-item-name">Item name</label>
            <input
              id="lost-item-name"
              name="itemname"
              value={lost.itemname}
              onChange={handleChange}
              placeholder="Example: Black backpack"
            />
          </div>

          <div className="dashboard-field">
            <label htmlFor="lost-item-description">Description</label>
            <textarea
              id="lost-item-description"
              name="des"
              value={lost.des}
              onChange={handleChange}
              placeholder="Add color, brand, location, and anything unique about the item"
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
                  reader.onloadend = () => {
                    setLost({
                      ...lost,
                      image: reader.result
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <div>
              <strong>Upload an image</strong>
              <span>Choose a clear photo to help people recognize the item faster.</span>
            </div>
          </label>

          {lost.image && (
            <div className="dashboard-preview">
              <img className="dashboard-thumb" src={lost.image} alt="Lost item preview" />
            </div>
          )}

          <button type="submit" className="dashboard-form-submit">
            Submit lost report
          </button>
        </form>
      </div>

      <aside className="dashboard-form-card">
        <h3>Tips for better matches</h3>
        <p>Small details can make a big difference when someone is scanning the report list.</p>
        <div className="dashboard-help-list">
          <div className="dashboard-help-item">
            <strong>Include where it was lost</strong>
            Mention the classroom, lab, library, or block if you know it.
          </div>
          <div className="dashboard-help-item">
            <strong>Describe standout details</strong>
            Add colors, stickers, tags, scratches, brand names, or contents.
          </div>
          <div className="dashboard-help-item">
            <strong>Use a clear image</strong>
            A simple well-lit photo increases recognition and trust.
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Lostform;
