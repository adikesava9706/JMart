import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

function ProductGrid() {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3000/product", requestOptions)
      .then((response) => response.json())
      .then((data) => setProductList(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  console.log(productList);
  return (
    <div>
      <section class="text-gray-400 bg-gray-900 body-font h-[80vh] max-height-[80vh] overflow-y-auto">
        <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 class="title-font font-medium text-3xl text-white">
              All Products
            </h1>
          </div>
        </div>
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            {productList.map((product, index) => (
              <ProductCard
                key={index}
                productName={product.name}
                productPrice={product.price}
                productImage={product.image}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductGrid;
