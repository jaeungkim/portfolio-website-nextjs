import useSWR from "swr";
import axios from "axios";

export default function ViewCounter({ slug }: { slug: string }) {
  const { data: views, error } = useSWR(`/api/views/${slug}`, async (url) => {
    const response = await axios.post(url);
    return response.data.total;
  });

  if (error) return <p>Failed to load views</p>;

  return <p>{views ? `${views} views` : "Loading views..."}</p>;
}
