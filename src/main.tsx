import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'

import Root from './routes/root';
import ErrorPage from './routes/error-page';
import Home from './routes/home'
import ThreadUI from './ui/ThreadUI';

import Thread from './types/Thread';


const testThread: Thread = {
  thread_id:      1,
  user_id:        1,
  tag_id:         1,
  thread_title:   "So you want to be a gangstar",
  thread_date:    "2022-12-15T23:27:46",
  thread_upd:     "2022-12-15T23:27:46",
  thread_cmmt_no: 0,
  thread_body:    "Bao babababa Bao bao baobao BANG" +
                  "Mystical Baobab Tree Moment",
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "thread",
        element: <ThreadUI {...testThread}/>,
      },
      {
        path: "home",
        element: <Home />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
