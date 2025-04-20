import React from "react";
import jmart from "./jmart.png";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";

function Header() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/", { state: {} });
  };
  const handleProducts = () => {
    navigate("/products", { state: {} });
  };
  const handleSigninSignup = () => {
    navigate("/login", { state: {} });
  }
  const handleContactUs = () => {
    navigate("/contactus", { state: {} });
  }
  return (
    <header class="text-gray-400 bg-gray-900 body-font">
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a
          class="flex title-font font-medium items-center text-white mb-4 md:mb-0"
          style={{ cursor: "pointer" }}
          onClick={handleNavigate}
        >
          <img
            src={jmart}
            alt="JMart Logo"
            class="w-12 h-12 text-white bg-purple-500 rounded-full"
          />

          <span class="ml-3 text-xl">JMart</span>
        </a>
        <div className="ml-10">
        <SearchBar/>
        </div>

        <nav class="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a
            class="mr-5 hover:text-white"
            style={{ cursor: "pointer" }}
            onClick={handleNavigate}
          >
            Home
          </a>
          <a
            class="mr-5 hover:text-white"
            style={{ cursor: "pointer" }}
            onClick={handleProducts}
          >
            Products{" "}
          </a>
          <a class="mr-5 hover:text-white" style={{cursor:'pointer'}} onClick={handleContactUs}>Contact us</a>
          <a class="mr-5 hover:text-white" style={{cursor:'pointer'}} onClick={handleSigninSignup}>Sign Up / Sign in</a>
        </nav>
        <button class="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
          Cart &nbsp;
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 32 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}

export default Header;
