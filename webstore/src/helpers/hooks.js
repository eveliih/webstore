import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeCart } from "../reducers/cartReducer";
import { initUser } from "../reducers/userReducer";
import { matchesFilter } from "./utils";

const getFilter = (state) => state.filter;
const getProducts = (state) => state.products;
const getUser = (state) => state.user;

export const useFilteredProducts = (category) => {
  const filter = useSelector(getFilter);
  const allProducts = useSelector(getProducts);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const filteredProducts = allProducts.filter((product) =>
      matchesFilter(product, filter)
    );
    setProducts(filteredProducts);
    setIsLoading(false);
  }, [category, filter, allProducts]);

  return { products, isLoading };
};

export const useInitializeCart = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  useEffect(() => {
    if (user) {
      dispatch(initializeCart(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(initUser());
  }, [dispatch]);
};
