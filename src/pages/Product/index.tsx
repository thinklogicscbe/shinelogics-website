import { lazy } from "react";

const Products = lazy(() => import("../../components/ProductCompo/product"));

const Product = () => {
  return (
    <Products />
  );
};

export default Product;
