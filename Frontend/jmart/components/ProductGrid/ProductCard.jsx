import React from "react";
import { useNavigate } from "react-router-dom";

function ProductCard({
  productName = "dummyproduct",
  productPrice = 200,
  productImage = "https://dummyimage.com/422x262",
}) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        productName,
        productPrice,
        productImage,
      },
    });
  };
  return (
    <div class="lg:w-1/4 md:w-1/2 p-4 w-full" style={{cursor:'pointer'}} onClick={handleCheckout}>
      <a class="block relative h-48 rounded overflow-hidden">
        <img
          alt={productName}
          class="object-cover object-center w-full h-full block"
          // src="https://dummyimage.com/422x262"
          src={productImage}
        />
      </a>
      <div class="mt-4">
        <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">
          CATEGORY
        </h3>
        <h2 class="text-white title-font text-lg font-medium">{productName}</h2>
        <p class="mt-1"> ₹ {productPrice}</p>
      </div>
    </div>
  );
}

export default ProductCard;
