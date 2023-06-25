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

  return (
    <div>
      <div className="product_container">
        {products.slice(page * 10 - 10, page * 10).map((product) => (
          <SingleProduct key={product.id} product={product} />
        ))}
      </div>
      <div className="page_nums">
        {page === 1 ? "" : <div>Prev</div>}
        <div>
          {[...Array(products.length / 10)].map((_, i) => (
            <span key={i} onClick={() => setPage(i + 1)}>
              {i + 1}
            </span>
          ))}
        </div>
        {page === 10 ? "" : <div>Next</div>}
      </div>
    </div>
  );
}
