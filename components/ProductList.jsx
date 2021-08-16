/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

const ProductList = ({ product }) => {
  return (
    <>
      <div className="card pcard" key={product._id}>
        <div className="card-image">
          <img src={product.mediaUrl} alt={product.name} />
          <span className="card-title">{product.name}</span>
        </div>
        <div className="card-content">
          <p> Tk. {product.price}</p>
        </div>
        <div className="card-action">
          <Link href={"/product/[id]"} as={`/product/${product._id}`}>
            <a>View Product</a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductList;
