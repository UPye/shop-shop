import React, { createContext, useContext } from "react";
// createContext is used to create the container to hold the global state data
// and functionality so data can be provided throughout the app
// useContext is used to allow use of the state created in createContext
import { useProductReducer } from './reducers';

const StoreContext = createContext();
// Provider allows data from createContext to be used throughout app
// Basically, makes data passable to other components
// Consumer (React component) is used to obtain the data from the Provider.
const { Provider } = StoreContext;

// value and ...props values allows function to accept props if needed
const StoreProvider = ({ value = [], ...props }) => {
    const [state, dispatch] = useProductReducer({
    // State is the most up-to-date version of the global state object
    // Dispatch is the method used to update the state
      // Dispatch looks for an action object passed in as it's argument
      products: [],
      cart: [],
      cartOpen: false,
      categories: [],
      currentCategory: '',
    });
    // use this to confirm it works!
    console.log(state);
    return <Provider value={[state, dispatch]} {...props} />;
  };

  const useStoreContext = () => {
    return useContext(StoreContext);
  };

  export { StoreProvider, useStoreContext };