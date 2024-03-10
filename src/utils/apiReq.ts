import CryptoJS from "crypto-js";

export const apiReq = async (url: string, body: Object): Promise<any> => {
  let date = new Date().toISOString().slice(0, 10).replace(/-/g, "");

  const authorizationString = CryptoJS.MD5(
    `${process.env.REACT_APP_URL_PASSWORD}_${date}`
  ).toString();

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
      } else {
        const json = await response.json();
        return json;
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return fetchData();
};
