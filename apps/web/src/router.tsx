import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout";
import RootPage from "./routes/root";
import UnauthorizedPage from "./routes/unauthorized";
import NotificationsPage from "./routes/notifications";
import NotFoundPage from "./not-found";
import { AuthWrapper } from "./components/auth-wrapper";
import NewsPage from "./routes/news";
import LinkAccountPage from "./routes/link-account";
import CreateBookingPage from "./routes/create-booking";
import BookingListPage from "./routes/booking-list";
import CreateAccountPage from "./routes/create-account";
import ProfilePage from "./routes/profile";
import GizmoAccountPage from "./routes/gizmo-account";

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
        path: "create-account",
        element: <CreateAccountPage />,
      },
      {
        path: "notifications",
        element: <AuthWrapper><NotificationsPage /></AuthWrapper>
      },
      {
        path: "unauthorized",
        element: <UnauthorizedPage />,
      },
      {
        path: "link-account",
        element: <LinkAccountPage />,
      },
      {
        path: "news",
        element: <NewsPage />,
      },
      {
        path: "booking",
        children: [
          {
            index: true,
            element: <CreateBookingPage />,
          },
          {
            path: "list-bookings",
            element: <BookingListPage />,
          },
        ],
      },
      {
        path: "profile",
        element: <AuthWrapper><ProfilePage /></AuthWrapper>,
      },
      {
        path: "profile/:accountId",
        element: <AuthWrapper><GizmoAccountPage /></AuthWrapper>,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default router;
