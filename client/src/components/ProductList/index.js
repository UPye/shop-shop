import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import ProductItem from "../ProductItem";
import { QUERY_PRODUCTS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function ProductList() {
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  // [Hook] Wait for useQuery response to come in 
  useEffect(() => {
    // If there's data to be stored
    if (data) {
      // Store it in the global state object
      dispatch({
        // Instructing reducer function of UPDATE_PRODUCTS action
        type: UPDATE_PRODUCTS,
        // Save the array of products
        products: data.products
      });

      // Takes each product and save it to IndexedDB using helper function
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });

      // Checks if `loading` is undefined in `useQuery()` Hook
    } else if (!loading) {
      // If offline, gets all data from the `products` store
      idbPromise('products', 'get').then((products) => {
        // Use data to set global state for offline browsing
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products
        });
      });
    }
    // When completed, useEffect executes useStoreContext again
    // Providing product data needed to display products on page
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      // Return since products are now being retrieved from state object
      return state.products;
    }

    return state.products.filter(
      product => product.category._id === currentCategory
    );
  };

  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {state.products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
