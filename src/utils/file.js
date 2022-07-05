export const uploadImage = async (file) => {
  const API_KEY = process.env.REACT_APP_IMGBB_KEY;
  let formData = new FormData();
  formData.append("image", file);

  try {
    const request = {
      method: "POST",
      header: {
        "mime-type": "multipart/form-data",
        "content-type": false,
      },
      body: formData,
    };

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${API_KEY}`,
      request
    );
    if (!response.ok) {
      return "";
    }
    const json = await response.json();

    return json.data.url;
  } catch (e) {
    return "";
  }
};
