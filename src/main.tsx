import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import './index.css'

import Root from './routes/root';
import ErrorPage from './routes/error-page';
import ThreadUI from './ui/ThreadUI';

import Thread from './types/Thread';


const testThread: Thread = {
  thread_id:      1,
  user_id:        1,
  tag_id:         1,
  thread_title:   "So you want to be a gangstar",
  thread_date:    new Date(2022, 10, 28, 10, 33, 30),
  thread_upd:     new Date(2022, 10, 28, 10, 33, 30),
  thread_cmmt_no: 0,
  thread_body:    "Bao babababa Bao bao baobao BANG\n" +
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
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
