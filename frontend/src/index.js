import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/homepage';
import Search from './pages/search';
import { ContextWrapper } from './context/main.context';
import ProductDetail from './product/ProductDetail';
import Header from './layout/header';
import Footer from './layout/footer';
import User from './user/User';
import Profile from './user/profile';
import ShopList from './user/ShopList';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/product',
        element: <ProductDetail />,
      },
      {
        path: '/user',
        element: <User />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: '/user/shopping',
            element: <ShopList />,
          }
        ]
      },
    ],
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextWrapper>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ContextWrapper>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
