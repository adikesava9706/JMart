import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Import useParams
import ProductCard from "../../components/ProductGrid/ProductCard";

function SearchResult() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("q") || "";
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  console.log("search term", searchTerm);
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:3000/product", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("This is my data", data);
        setProductList(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    setFilteredProducts(
      productList.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [productList, searchTerm]);
  if(filteredProducts.length === 0 && searchTerm !== "") {
    return (
        <div className="flex items-center justify-center h-[60vh] text-gray-400 bg-gray-900 body-font">
        <h1 className="text-2xl text-gray-400 text-center">
          No Products with keyword {searchTerm} found.
        </h1>
      </div>
    );
  }
  return (
    <div>
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={index}
                productName={product.name}
                productPrice={product.price}
                productImage={product.image || "https://dummyimage.com/422x262"}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SearchResult;
