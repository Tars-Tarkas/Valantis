import { apiReq } from "./apiReq";

export const getIds = () => {
  const body = {
    action: "get_ids",
  };
  const ids = apiReq(process.env.REACT_APP_BASE_URL, body);
  return ids;
};

export const getItems = (ids: any) => {
  const body = {
    action: "get_items",
    params: { ids },
  };
  const items = apiReq(process.env.REACT_APP_BASE_URL, body);
  return items;
};

export const getSearch = (field: any, value: any) => {
  let req = value;
  if (field === "price") {
    req = parseInt(value);
  }
  const body = {
    action: "filter",
    params: {},
  };

  body.params[field as keyof Object] = req;
  const items = apiReq(process.env.REACT_APP_BASE_URL, body);
  return items;
};
