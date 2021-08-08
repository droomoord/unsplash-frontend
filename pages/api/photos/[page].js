import { fetchData } from "../../../functions";

export default async function handler(req, res) {
  const { page } = req.query;
  const data = await fetchData(`https://api.unsplash.com/photos?page=${page}`);
  res.send(data);
}
