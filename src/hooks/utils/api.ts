import apiReq from "./apiReq";

export const getIds = () => {
  const body = {
    action: "get_ids",
  };
  const ids = apiReq("https://api.valantis.store:41000/", body);
  return ids;
};

export const getItems = (ids: any) => {
  const body = {
    action: "get_items",
    params: { ids },
  };
  const items = apiReq("https://api.valantis.store:41000/", body);
  return items;
};
