import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import { useStoreContext } from "../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../utils/actions";
import { QUERY_PRODUCTS } from "../utils/queries";
import spinner from '../assets/spinner.gif'

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({})
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  const { products } = state;
  // const products = data?.products || [];

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
            <button>
              Add to Cart
            </button>
            <button>
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
    </>
  );
};

export default Detail;
