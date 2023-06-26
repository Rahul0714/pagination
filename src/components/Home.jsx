import axios from "axios";
import SingleProduct from "./SingleProduct";
import { useEffect, useState } from "react";
import "./styles.css";

export default function Home() {
  const [page, setPage] = useState(2);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await axios.get(
        `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
      );
      setProducts(data.products);
      setTotalPages(data.total / 10);
      console.log(products, data.total);
    }
    fetchProducts();
  }, [page]);

  const handlePageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div>
      <div className="product_container">
        {products.map((product) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </div>
      <div className="page_nums">
        <div
          onClick={() => handlePageHandler(page - 1)}
          className={page !== 1 ? "" : "product_disabled"}
        >
          Prev
        </div>
        <div>
          {[...Array(totalPages)].map((_, i) => (
            <span
              key={i}
              onClick={() => handlePageHandler(i + 1)}
              className={page === i + 1 ? "page_selected" : ""}
            >
              {i + 1}
            </span>
          ))}
        </div>
        <div
          onClick={() => handlePageHandler(page + 1)}
          className={page !== totalPages ? "" : "product_disabled"}
        >
          Next
        </div>
      </div>
    </div>
  );
}
