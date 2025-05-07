import React, { useState, useEffect } from "react";

function AdminPanel() {
  const [activeTab, setActiveTab] = useState("add");
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    image: "",
  });
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch products for the dropdown
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/product");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Handle product selection from the dropdown
  const handleProductSelect = (e) => {
    const productId = e.target.value;
    setSelectedProductId(productId);

    // Find the selected product and prefill the input fields
    const selectedProduct = products.find(
      (product) => product._id === productId
    );
    if (selectedProduct) {
      setProductData({
        name: selectedProduct.name,
        price: selectedProduct.price,
        image: selectedProduct.image || "",
      });
    }
  };

  // Handle input changes for the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  // Handle product update
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!selectedProductId) {
      alert("Please select a product to update.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/updateproduct/${selectedProductId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update product");
      }

      const responseData = await response.json();
      setMessage(responseData.message);
      alert("Product updated successfully!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/addproduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add product");
      }

      const responseData = await response.json();
      setMessage(responseData.message);
      alert("Product added successfully!");
      setProductData({ name: "", price: "", image: "" });
    } catch (error) {
      setMessage(error.message);
    }
  };

  // Handle product selection for deletion
  const handleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  // Handle product deletion
  const handleDeleteProducts = async () => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product to delete.");
      return;
    }

    try {
      for (const productId of selectedProducts) {
        try {
          const response = await fetch(
            `http://localhost:3000/removeproduct/${productId}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to delete product");
          }
        } catch (error) {
          console.error("Error deleting product:", error);
          alert(
            "An error occurred while deleting the product. Please try again."
          );
        }
      }

      alert("Selected products deleted successfully!");
      setSelectedProducts([]);
      setProducts(
        products.filter((product) => !selectedProducts.includes(product._id))
      );
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-centre h-screen bg-gray-900 text-gray-400">
      <h1 className="text-4xl font-bold mb-8">Admin Panel</h1>
      <div className="space-x-4 mb-8">
        <button
          className={`py-2 px-6 rounded transition duration-200 ${
            activeTab === "add"
              ? "bg-blue-600 text-white"
              : "bg-blue-500 text-gray-200 hover:bg-blue-600"
          }`}
          onClick={() => setActiveTab("add")}
        >
          Add Product
        </button>
        <button
          className={`py-2 px-6 rounded transition duration-200 ${
            activeTab === "edit"
              ? "bg-green-600 text-white"
              : "bg-green-500 text-gray-200 hover:bg-green-600"
          }`}
          onClick={() => setActiveTab("edit")}
        >
          Edit Products
        </button>
        <button
          className={`py-2 px-6 rounded transition duration-200 ${
            activeTab === "delete"
              ? "bg-red-600 text-white"
              : "bg-red-500 text-gray-200 hover:bg-red-600"
          }`}
          onClick={() => setActiveTab("delete")}
        >
          Delete Products
        </button>
      </div>

      <div className="w-full max-w-2xl bg-gray-800 p-6 rounded shadow-md">
        {activeTab === "add" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Add Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Price</label>
                <input
                  type="text"
                  name="price"
                  value={productData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={productData.image}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <button
                type="submit"
                className="py-2 px-6 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Product
              </button>
            </form>
            {message && <p className="mt-4 text-green-400">{message}</p>}
          </div>
        )}
        {activeTab === "edit" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <div className="mb-4">
              <label className="block mb-2">Select Product</label>
              <select
                value={selectedProductId}
                onChange={handleProductSelect}
                className="w-full p-2 rounded bg-gray-700 text-white"
              >
                <option value="">-- Select a Product --</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <form onSubmit={handleUpdateProduct} className="space-y-4">
              <div>
                <label className="block mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={productData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Price</label>
                <input
                  type="text"
                  name="price"
                  value={productData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={productData.image}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <button
                type="submit"
                className="py-2 px-6 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Update Product
              </button>
            </form>
            {message && <p className="mt-4 text-green-400">{message}</p>}
          </div>
        )}
        {activeTab === "delete" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Delete Products</h2>
            <div className="mb-4">
              <label className="block mb-2">Select Products to Delete</label>
              <ul className="space-y-2">
                {products.map((product) => (
                  <li key={product._id} className="flex items-center space-x-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product._id)}
                      onChange={() => handleProductSelection(product._id)}
                      className="form-checkbox h-5 w-5 text-red-600"
                    />
                    <span>{product.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button
              onClick={handleDeleteProducts}
              className="py-2 px-6 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete Selected Products
            </button>
            {message && <p className="mt-4 text-red-400">{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
