import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "antd";
import { fetchAllProducts } from "../../redux/action";
import Suggest from "../../components/suggest/suggest";
import { useCookies } from "react-cookie";

const SuggestSP = (props) => {
  const dispatch = useDispatch();
  const [sumPage, setSumtPage] = useState(1);
  const [responseData, setResponseData] = useState({});
  const [listProduct, setListProduct] = useState([]);
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(props.urlApi, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.user_token}`,
          },
        });
        const data = await response.json();
        setResponseData(data);
        setListProduct(data.data);
        setSumtPage(data.pagination);
      } catch (error) {
        console.error("Error fetching API:", error);
      }
    };
    fetchProducts();
  }, [
    props.filter,
    props.currentPage,
    props.textSearch,
    props.sortOrder,
    props.productWithBrands,
  ]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const onPageChange = (pageNumber) => {
    props.setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="suggest-sp">
        <div id="list__suggest-products">
          <div className="suggest-products  ">
            <Suggest list={listProduct} />
          </div>
        </div>
        <div style={{ marginLeft: "40%" }} id="Pagination">
          <Pagination
            defaultCurrent={1}
            total={sumPage * 10}
            onChange={onPageChange}
          />
        </div>
      </div>
    </>
  );
};
export default SuggestSP;
