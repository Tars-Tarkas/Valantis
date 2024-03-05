import CryptoJS from "crypto-js";
const apiReq = (url: string, body: any): Promise<any> => {
  let date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const authorizationString = CryptoJS.MD5(`Valantis_${date}`).toString();
  const fetchData = async () => {
    try {
      const response = await fetch(url, {
        body: JSON.stringify(body),
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
      return json;
    } catch (error: any) {
      console.log(error);
    }
  };

  return fetchData();
};

export default apiReq;
