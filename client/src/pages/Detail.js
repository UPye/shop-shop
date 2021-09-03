import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { useStoreContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART, 
  UPDATE_PRODUCTS } from "../utils/actions";
import { QUERY_PRODUCTS } from "../utils/queries";
import spinner from '../assets/spinner.gif';
import Cart from "../components/Cart";


function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({})
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const { products, cart } = state;
  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);

    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 }
      });
    }
  };
  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id
    });
  }

  useEffect(() => {
      // Checks for if there's data in global state's product array
      // and if there is, use it to see which product is the one user 
      // wants to display by product with matching id from useParams() hook
    if (products.length) {
      // Run useEffect over with product data to set current product
      // setCurrentProduct is ran to display a single products data
      setCurrentProduct(products.find(product => product._id === id));
      // Dependency array, only runs when it detects changes in value.
    } else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products
      });
    }
  }, [products, data, dispatch, id]);

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">
            ← Back to Products
          </Link>

          <h2>{currentProduct.name}</h2>

          <p>
            {currentProduct.description}
          </p>

          <p>
            <strong>Price:</strong>
            ${currentProduct.price}
            {" "}
            <button onClick={addToCart}>
              Add to Cart
            </button>
            <button
              disabled={!cart.find(p => p._id === currentProduct._id)}
              onClick={removeFromCart}  
            >
              Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {
        loading ? <img src={spinner} alt="loading" /> : null
      }
    <Cart />
    </>
  );
};

export default Detail;
