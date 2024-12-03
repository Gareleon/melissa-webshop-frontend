import { createBrowserRouter } from "react-router";
import Home from "../pages/home/home";
import App from "../App";
import Login from "../components/Login";
import Register from "../components/Register";
import Cart from "../pages/soaps/Cart";
import Checkout from "../pages/soaps/Checkout";
import SingleSoap from "../pages/soaps/SingleSoap";
import PrivateRoute from "./PrivateRoute";
import Order from "../pages/soaps/Order";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/admin/DashboardLayout";
import DashboardHome from "../pages/admin/DashboardHome";
import ManageSoaps from "../pages/admin/manage-soaps/ManageSoaps";
import AddSoap from "../pages/admin/addSoap/addSoap";
import EditSoap from "../pages/admin/editSoap/EditSoap";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/check-out",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
      ,
      {
        path: "/soaps/:id",
        element: <SingleSoap />,
      },
    ],
  },
  { path: "/melissa-admin", element: <AdminLogin /> },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <AdminRoute>
            <DashboardHome />
          </AdminRoute>
        ),
      },
      {
        path: "add-new-soap",
        element: (
          <AdminRoute>
            <AddSoap />
          </AdminRoute>
        ),
      },
      {
        path: "edit-soap/:id",
        element: (
          <AdminRoute>
            <EditSoap />
          </AdminRoute>
        ),
      },
      {
        path: "manage-soaps",
        element: (
          <AdminRoute>
            <ManageSoaps />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
