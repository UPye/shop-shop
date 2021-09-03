import { useReducer } from "react";

import {
  UPDATE_PRODUCTS,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from "./actions";

export const reducer = (state, action) => {
  switch (action.type) {
    // If action type value is the value of `UPDATE_PRODUCTS`, return a new state object with an updated products array
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };
    // If action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    // If it's none of these actions, do not update state at all and keep things the same!
    default:
      return state;
  }
};

// useProductReducer(), is to help initialize the global state object
export function useProductReducer(initialState) {
  // Provides the functionality for updating that state by running through reducer() function
  // More indepth than useState() function
  return useReducer(reducer, initialState);
}
// useReducer is used when managing large sets of data
// useState is for simpler amounts of data, i.e.: form field values and status of button clicks