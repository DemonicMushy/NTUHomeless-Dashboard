const axios = require("axios");

async function getDataFromBackend() {
  return await axios.get(`${process.env.REACT_APP_BACKEND}/api/data`);
}

module.exports = { getDataFromBackend };
