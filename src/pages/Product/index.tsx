


import { lazy, Suspense } from "react";

const Products = lazy(() => import("../../components/ProductCompo/product"));


const Product: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Products />
    
      
    </Suspense>
  );
};

export default Product;
