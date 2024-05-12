import axios from "axios";

const baseUrl = "https://bayut.p.rapidapi.com"; // Make sure to include the protocol (https://)

const fetchApi = async (url) => {
  try {
    const { data } = await axios.get(url, {
      headers: {
        "X-RapidAPI-Key": "484ba3b1efmsh047d679fb09f469p1234cdjsnc0911648d43c",
        "X-RapidAPI-Host": "bayut.p.rapidapi.com",
      },
    });
    return data; // Return the data from the response
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
};

export { baseUrl, fetchApi };
