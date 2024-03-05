import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

const useFetch = (initialUrl: string, body: any) => {
  const [url, setUrl] = useState(initialUrl || "");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;
    let date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const authorizationString = CryptoJS.MD5(`Valantis_${date}`).toString();
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          body: JSON.stringify({ body }),
          method: "POST",
          headers: {
            "X-Auth": authorizationString,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }
        const json = await response.json();
        setData(json.result);
        setLoading(false);
        setError(null);
      } catch (error: any) {
        setLoading(false);
        setError(error.message);
      }
    };

    fetchData();
  }, [url]);

  return [{ data, loading, error }];
};

export default useFetch;
