export default function componentName({ product }) {
  return (
    <div className="product">
      <div className="product_image">
        <img
          style={{
            height: "15rem",
            width: "15rem",
            borderRadius: "7px",
            boxShadow: "7px 7px 7px black",
          }}
          src={product.thumbnail}
          alt={product.title}
        />
      </div>
      <div className="product_desc">
        <div className="product_title">{product.title}</div>
        <div className="product_price">${product.price}</div>
      </div>
    </div>
  );
}
