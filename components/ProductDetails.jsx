/* eslint-disable @next/next/no-img-element */
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { parseCookies } from 'nookies';
import { useEffect, useRef, useState } from "react";
import baseUrl from "../helpers/baseUrl";

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const cookie = parseCookies()
  const user = cookie.user ? JSON.parse(cookie.user) : ''
  const router = useRouter();
  const modalRef = useRef(null);

  useEffect(() => {
    M.Modal.init(modalRef.current);
  }, []);

  const getModal = () => {
    return (
      <div id="modal1" className="modal" ref={modalRef}>
        <div className="modal-content">
          <h4>{product.name}</h4>
          <p>Are you sure you want to delete this</p>
        </div>
        <div className="modal-footer">
          <button className="btn waves-effect waves-light #1565c0 blue darken-3">
            cancel
          </button>
          <button
            className="btn waves-effect waves-light #c62828 red darken-3"
            onClick={() => deleteProduct()}
          >
            Yes
          </button>
        </div>
      </div>
    );
  };

  const deleteProduct = async () => {
    const res = await fetch(`${baseUrl}/api/product/${product._id}`, {
      method: "DELETE",
    });
    await res.json();
    router.push("/");
  };

  const AddToCart = async () => {
    const response = await fetch(`${baseUrl}/api/cart`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': cookie.token
      },
      body: JSON.stringify({
        quantity,
        productId: product._id
      })
    })
    const result = await response.json()
    if(result.error) {
      M.toast({ html: result.error, classes: "red" });
      Cookies.remove('user')
      Cookies.remove('token')
      router.push('/login')
    } else {
      M.toast({ html: result.success, classes: "green" });
    }
  }

  return (
    <div className="container center-align">
      <h3>{product.name}</h3>
      <img src={product.mediaUrl} alt={product.name} style={{width:'30%'}} />
      <h5>RS {product.price}</h5>
      <input
        type="number"
        style={{ width: "400px", margin: "10px" }}
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        placeholder="Qunatity"
      />
      {user ? (
        <button
          className="btn waves-effect waves-light #1565c0 blue darken-3"
          onClick={() => AddToCart()}
        >
          Add
          <i className="material-icons right">add</i>
        </button>
      ) : (
        <button
          className="btn waves-effect waves-light #1565c0 blue darken-3"
          onClick={() => router.push("/login")}
        >
          Login To Add
          <i className="material-icons right">add</i>
        </button>
      )}

      <p className="left-align">{product.description}</p>
      {user.role != "user" && (
        <button
          data-target="modal1"
          className="btn modal-trigger waves-effect waves-light #c62828 red darken-3"
        >
          Delete
          <i className="material-icons left">delete</i>
        </button>
      )}

      {getModal()}
    </div>
  );
};

export default ProductDetails;
