import axios from "axios";

const baseUrl = "https://bayut.p.rapidapi.com"; // Make sure to include the protocol (https://)

const fetchApi = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        "X-RapidAPI-Key": "cd2f144024mshccf439fc1e55a48p1aad54jsn08d23813d46c",
        "X-RapidAPI-Host": "bayut.p.rapidapi.com",
      },
    });
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

export { baseUrl, fetchApi };
