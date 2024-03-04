import React from "react";
import useFetch from "./hooks/useFetch";
import "./App.css";

function App() {
  const [data, loading, error] = useFetch("https://api.valantis.store:41000/", {
    method: "POST",
    body: JSON.stringify({
      action: "get_ids",
      params: { offset: 10, limit: 10 },
    }),
  });
  console.log(data);
  return (
    <>
      {/* {data?.map((item) => {
        return <li>item</li>;
      })} */}
    </>
  );
}

export default App;
