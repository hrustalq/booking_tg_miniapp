import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import RootPage from "./routes/root";
import UnauthorizedPage from "./routes/unauthorized";
import NotificationsPage from "./routes/notifications";
import NotFoundPage from "./not-found";
import { AuthWrapper } from "./components/auth-wrapper";
import NewsPage from "./routes/news";
import LinkAccountPage from "./routes/link-account";
import BookingPage from "./routes/booking";
import CreateAccountPage from "./routes/create-account";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <RootPage />,
      },
      {
        path: "unauthorized",
        element: <UnauthorizedPage />,
      },
      {
        path: "notifications",
        element: <AuthWrapper><NotificationsPage /></AuthWrapper>
      },
      {
        path: "news",
        element: <NewsPage />,
      },
      {
        path: "link-account",
        element: <LinkAccountPage />,
      },
      {
        path: "create-account",
        element: <CreateAccountPage />,
      },
      {
        path: "booking",
        element: <BookingPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      }
    ],
  },
]);

export default router;
