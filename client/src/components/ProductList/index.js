import React, { useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import ProductItem from "../ProductItem";
import { QUERY_PRODUCTS } from "../../utils/queries";
import spinner from "../../assets/spinner.gif";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_PRODUCTS } from "../../utils/actions";

function ProductList() {
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  // [Hook] Wait for useQuery response to come in 
  useEffect(() => {
    // Once data object goes from undefined to having an actual value 
    if (data) {
      // Dispatch() is executed
      dispatch({
        // Instructing reducer function of UPDATE_PRODUCTS action
        type: UPDATE_PRODUCTS,
        // Save the array of products to Global Store.
        products: data.products
      });
    }
    // When completed, useEffect executes useStoreContext again
    // Providing product data needed to display products on page
  }, [data, dispatch]);

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
