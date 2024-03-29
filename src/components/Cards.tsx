import React, { useState, ChangeEvent, useEffect, useCallback } from "react";

import { getIds, getItems, getSearch } from "../utils/api";

import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Navbar from "react-bootstrap/Navbar";

import { PaginationCards } from "./Pagination";

export const Cards: React.FC = () => {
  const [ids, setIds] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(process.env.REACT_APP_LIMIT);
  const [isLoading, setIsLoading] = useState(true);
  const [selectSearch, setSelectSearch] = useState("product");
  const [search, setSearch] = useState("");
  const [filteredIds, setFilteredIds] = useState<any[]>([]);

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;

  const idsSlice = useCallback(
    (data: string[]) => {
      const slice = data.slice(firstPostIndex, lastPostIndex);
      return slice;
    },
    [firstPostIndex, lastPostIndex]
  );

  useEffect(() => {
    if (ids.length < 1) {
      getIds()
        .then((res) => {
          if (res && ids.length < 1) {
            setIds([...new Set(res.result)]);
          } else if (!res) {
            setIds([...ids]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [ids]);

  useEffect(() => {
    if (ids.length > 1 && search.length < 1) {
      setIsLoading(true);
      getItems(idsSlice(ids))
        .then((res) => {
          if (res) {
            setProducts(res.result);
            setIsLoading(false);
          } else {
            setIds([...ids]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [ids, idsSlice, search]);

  useEffect(() => {
    if (search.length > 0) {
      setIsLoading(true);
      getSearch(selectSearch as keyof Object, search)
        .then((res) => {
          if (res && res.result.length > 0) {
            setFilteredIds([...new Set(res.result)]);
          } else {
            setProducts([]);
            setIsLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [search, selectSearch]);

  useEffect(() => {
    if (filteredIds.length > 0) {
      setIsLoading(true);
      getItems(idsSlice(filteredIds))
        .then((res) => {
          setProducts(res.result);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [filteredIds, idsSlice]);

  const handleSelectSearch = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectSearch(e.target.value);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <header>
        <Navbar
          expand="lg"
          bg="light"
          data-bs-theme="light"
          className="bg-body-tertiary"
        >
          <Container>
            <Navbar.Brand
              style={{ fontSize: "36px", fontWeight: "700", color: "#191d3a" }}
              href="#home"
            >
              Valantis
            </Navbar.Brand>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container style={{ padding: "40px" }}>
          <Form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              border: "1px solid white",
              padding: "15px",
              borderRadius: "10px",
            }}
            id="searchForm"
            name="searchForm"
          >
            <Form.Label style={{ color: "white" }} htmlFor="searchForm">
              Поиск
            </Form.Label>
            <Form.Select
              onChange={handleSelectSearch}
              value={selectSearch}
              name="selectSearch"
            >
              <option value="product">По названию продукта</option>
              <option value="brand">По названию бренда</option>
              <option value="price">По цене</option>
            </Form.Select>
            <Form.Control
              name="search"
              type="search"
              id="searchInput"
              onChange={handleSearch}
            />
          </Form>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: `calc(100vH - 500px)`,
              }}
            >
              <Spinner animation="border" variant="light" />
            </div>
          ) : (
            <>
              <Row
                lg={3}
                xs={1}
                md={2}
                sm={2}
                xxs={1}
                className="g-4 mt-0 mb-5"
              >
                {products &&
                  products.map((item, index) => {
                    return (
                      <Col key={index}>
                        <Card bg="light" text="dark">
                          <Card.Header
                            color="red"
                            style={{ height: "70px", textAlign: "center" }}
                          >
                            {item.product}
                          </Card.Header>
                          <Card.Body
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                            color="dark"
                          >
                            <Card.Text>
                              Brand: {item.brand ? item.brand : "-"}
                            </Card.Text>
                            <Card.Text>Price: {item.price}</Card.Text>
                          </Card.Body>
                          <Card.Footer></Card.Footer>
                        </Card>
                      </Col>
                    );
                  })}
              </Row>
              <PaginationCards
                totalPage={
                  filteredIds.length > 0 ? filteredIds.length : ids.length
                }
                currentPage={currentPage}
                postPerPage={postPerPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          )}
        </Container>
      </main>
    </>
  );
};
