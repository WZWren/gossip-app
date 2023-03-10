import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';

import Root from './routes/root';
import ErrorPage from './routes/error-page';
import Home from './routes/home';
import LoginPage from './routes/login';
import RegisterPage from './routes/register';
import BookmarkPage from './routes/bookmark';
import IgnoredPage from './routes/ignored';
import Search from './routes/searchpage';

import { store } from './app/store';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "bookmark",
        element: <BookmarkPage />,
      },
      {
        path: "ignore",
        element: <IgnoredPage />,
      },
      {
        path: "searchpage",
        element: <Search />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
