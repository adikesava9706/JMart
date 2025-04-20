import React, { useState } from "react";

function Login() {
  const [activeTab, setActiveTab] = useState("signin");

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    // Add your POST request logic for signup here
    if (e.target.password.value !== e.target.confirmPassword.value) {
      alert("Passwords do not match");
      return;
    }
    fetch("http://localhost:3000/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: e.target.username.value,
        email: e.target.email.value,
        password: e.target.password.value,
        confirmPassword: e.target.confirmPassword.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    // Add your POST request logic for signin here
    fetch("http://localhost:3000/user/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <section className="text-gray-400 bg-gray-900 body-font h-[80vh]">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-white">
              Welcome to JMart
            </h1>
            <p className="leading-relaxed mt-4">
              Experience seamless shopping with our platform.
            </p>
          </div>
          <div className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <div className="flex mb-4">
              <button
                className={`flex-1 py-2 px-4 ${
                  activeTab === "signin"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-700 text-gray-400"
                } rounded-l`}
                onClick={() => setActiveTab("signin")}
              >
                Sign In
              </button>
              <button
                className={`flex-1 py-2 px-4 ${
                  activeTab === "signup"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-700 text-gray-400"
                } rounded-r`}
                onClick={() => setActiveTab("signup")}
              >
                Sign Up
              </button>
            </div>

            {activeTab === "signin" && (
              <form onSubmit={handleSignInSubmit}>
                <div className="relative mb-4">
                  <label
                    htmlFor="username"
                    className="leading-7 text-sm text-gray-400"
                  >
                    Username
                  </label>
                  <input
                    required
                    type="text"
                    id="username"
                    name="username"
                    className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-purple-900 rounded border border-gray-600 focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="password"
                    className="leading-7 text-sm text-gray-400"
                  >
                    Password
                  </label>
                  <input
                    required
                    type="password"
                    id="password"
                    name="password"
                    className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-purple-900 rounded border border-gray-600 focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <button
                  type="submit"
                  className="text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg"
                >
                  Sign In
                </button>
                <p
                  className="text-md text-gray-400 mt-4 cursor-pointer hover:underline"
                  onClick={() => setActiveTab("signup")}
                >
                  New to JMart?{" "}
                  <span className="text-purple-500">Create an account</span>
                </p>
              </form>
            )}

            {activeTab === "signup" && (
              <form onSubmit={handleSignUpSubmit}>
                <div className="relative mb-4">
                  <label
                    htmlFor="username"
                    className="leading-7 text-sm text-gray-400"
                  >
                    Username
                  </label>
                  <input
                    required
                    type="text"
                    id="username"
                    name="username"
                    className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-purple-900 rounded border border-gray-600 focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-400"
                  >
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-purple-900 rounded border border-gray-600 focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="password"
                    className="leading-7 text-sm text-gray-400"
                  >
                    Password
                  </label>
                  <input
                    required
                    type="password"
                    id="password"
                    name="password"
                    className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-purple-900 rounded border border-gray-600 focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="leading-7 text-sm text-gray-400"
                  >
                    Confirm Password
                  </label>
                  <input
                    required
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-purple-900 rounded border border-gray-600 focus:border-purple-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <button
                  type="submit"
                  className="text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg"
                >
                  Sign Up
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
