const axios = require("axios");

export async function getDataFromBackend() {
  return await axios.get(`${process.env.REACT_APP_BACKEND}/api/data`);
}


