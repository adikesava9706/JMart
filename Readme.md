# Full stack project

Hosted at : [Jmart Vercel App](https://j-mart-opal.vercel.app/)

> Adi Kesava Reddy Koduru \
> RA2211027010168 \
> ak4333@srmist.edu.in \
> CSE - BigData Analytics

## JMart

JMart is a full-stack e-commerce application designed to provide a seamless shopping experience. It includes features for user authentication, product management, and an admin panel for managing products.

## Features

- **Frontend**: Built with React and Vite for a fast and responsive user interface.
- **Backend**: Powered by Express.js and MongoDB for robust and scalable server-side operations.
- **Admin Panel**: Add, edit, and delete products directly from the admin interface.
- **Authentication**: User sign-in and sign-up functionality.

## Main Files

### 1. `server/server.js`

The backend server is built using Express.js and connects to a MongoDB database.

- **Endpoints**:
  - `/user/signin` and `/user/signup` for user authentication.
  - `/product` to fetch all products.
  - `/addproduct` to add a new product.
  - `/updateproduct/:id` to update an existing product.
  - `/removeproduct/:id` to delete a product.

### 2. `client/src/App.jsx`

The main entry point for the React frontend.

- **Routing**:
  - `/` for the landing page.
  - `/login` for user authentication.
  - `/products` to view all products.
  - `/admin` for the admin panel.

### 3. `client/src/pages/AdminPanel.jsx`

The admin panel allows administrators to manage products.

- **Tabs**:
  - Add Product
  - Edit Product
  - Delete Product

## Dependencies

### Backend

- **Express**: Web framework for building the server.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Body-Parser**: Middleware for parsing request bodies.
- **Cors**: Middleware for enabling cross-origin requests.

### Frontend

- **React**: JavaScript library for building user interfaces.
- **React Router**: For handling routing in the application.
- **Tailwind CSS**: For styling the frontend.

## Setup

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository.
2. Navigate to the `server` directory and run:
   ```bash
   npm install
   node server.js
   ```
3. Navigate to the `client` directory and run:
   ```bash
   npm install
   npm run dev
   ```

### Access

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## License

This project is licensed under the MIT License.
