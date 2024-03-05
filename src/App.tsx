import React, { useState, ChangeEvent, useEffect } from "react";
// import useFetch from "./hooks/useFetch";
import { getIds, getItems } from "./hooks/utils/api";
import "./App.css";

function App() {
  const [product, setProduct] = useState("");
  const [ids, setIds] = useState<any[]>([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getIds()
      .then((res) => {
        setIds([...new Set(res.result)]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChangeFind = (e: ChangeEvent<HTMLInputElement>) => {
    setProduct(e.target.value);
  };

  useEffect(() => {
    getItems(ids)
      .then((res) => {
        setProduct(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [ids]);

  console.log(product);

  return (
    <>
      <input
        type="text"
        name="product"
        placeholder="Поиск по названию"
        // value={product}
        onChange={handleChangeFind}
      />
      <input type="text" name="price" placeholder="Поиск по цене" />
      <input type="text" name="brand" placeholder="Поиск по бреду" />
      {/* {data &&
        data.data.map((item, index) => {
          return <li key={index}>{item}</li>;
        })} */}
    </>
  );
}

export default App;
