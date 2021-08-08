import axios from "axios";

export async function fetchData(url) {
  try {
    const apiKey = process.env.API_KEY;
    const response = await axios({
      method: "get",
      url,
      headers: {
        Authorization: `Client-ID ${apiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
