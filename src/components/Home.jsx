import axios from "axios";
import SingleProduct from "./SingleProduct";
import { useEffect, useState } from "react";
import "./styles.css";

export default function Home() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await axios.get(
        "https://dummyjson.com/products?limit=100"
      );
      console.log("called");
      setProducts(data.products);
      console.log(products);
    }
    fetchProducts();
  }, []);

  const handleHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage != page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div>
      <div className="product_container">
        {products.slice(page * 10 - 10, page * 10).map((product) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </div>
      <div className="page_nums">
        <div
          onClick={() => handleHandler(page - 1)}
          className={page === 1 ? "product_disabled" : ""}
        >
          Prev
        </div>
        <div>
          {[...Array(products.length / 10)].map((_, i) => (
            <span
              key={i}
              onClick={() => handleHandler(i + 1)}
              className={page === i + 1 ? "product_highlight" : ""}
            >
              {i + 1}
            </span>
          ))}
        </div>
        <div
          onClick={() => handleHandler(page + 1)}
          className={page === products.length / 10 ? "product_disabled" : ""}
        >
          Next
        </div>
      </div>
    </div>
  );
}
