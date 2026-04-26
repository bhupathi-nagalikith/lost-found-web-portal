import API from "./api";

export const createReport = async (reportData) => {
  const formData = new FormData();

  formData.append("itemName", reportData.itemName);
  formData.append("description", reportData.description);
  formData.append("type", reportData.type);

  if (reportData.image) {
    formData.append("image", reportData.image);
  }

  const response = await API.post("/reports", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data;
};