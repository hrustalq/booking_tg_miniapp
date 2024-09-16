import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import RootPage from "./routes/root";

export default createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <RootPage />,
      },
    ],
  },
]);