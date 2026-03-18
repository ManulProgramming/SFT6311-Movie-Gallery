import { useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (search) => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(url+encodeURIComponent(search));

        if (!res.ok) {
          throw new Error("API request failed");
        }

        const json = await res.json();
        if (json.length===1){
            setData(json[0]);
        }else {
            setData(json);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
  };

  return { data, setData, loading, setLoading, error, setError, fetchData };
}