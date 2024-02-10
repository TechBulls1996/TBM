import { Outlet, useLocation, Navigate } from "react-router-dom";
import { getAuthCookie, getUserRole } from "../helpers";

import Header from "../components/Header";
import ErrorPage from "../pages/error-page";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import About from "../pages/About";
import Footer from "../components/Footer";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Loader from "../components/common/Loader";
import Dashboard from "../pages/user/Dasboard";
import Records from "../pages/user/Records";
import Blogs from "../pages/Blogs";
import Logout from "../pages/Logout";
import ForgotPassword from "../pages/ForgotPassword";
import Play from "../pages/user/Play";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminManageClients from "../pages/admin/AdminManageClients";
import AdminManageUsers from "../pages/admin/AdminManageUsers";
import OuterHeader from "../components/OuterHeader";


const useAuth = () => {
  // Your authentication logic here
  const token = getAuthCookie();
  if(token){
    return {
      role: getUserRole(),
    }
  }
  return false;
};

const MainLayout = () => {
  const isAuthenticated = useAuth();
  const location = useLocation();
  const isAdmin = isAuthenticated && isAuthenticated?.role === "admin";

  //check auth
  if(!isAuthenticated) {
    return <Navigate to="/login" />
  }
  
  // Check if the user is trying to access admin routes without admin role
  if (location.pathname.startsWith("/admin") && !isAdmin) {
    return <Navigate to="/user" />;
  }

  // Check if the user is trying to access user routes without user role
  if (location.pathname.startsWith("/user") && isAdmin) {
    return <Navigate to="/" />;
  }

  //hide routes header, sidebar or footer
  const routesToHide = ["/user/play"];
  const hidenRoutes = routesToHide.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      { !hidenRoutes &&<Loader /> }
      { !hidenRoutes && <Header />}
      <Outlet />
      { !hidenRoutes && <Footer />}
    </>
  );
}

const OuterLayout = () => {
  return (<>
   <OuterHeader />
     <Outlet />
   <Footer />  
  </>);
}

const ROUTES = [
  {
    path: "/",
    element: <OuterLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
        index: true,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
      {
        path: "/auth/logout",
        element: <Logout />,
      },
      {
        path: "/auth/forgot",
        element: <ForgotPassword />,
      },
    
    ],
  },

  {
    path: "/user",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        index: true,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "play",
        element: <Play />,
      },
      
      {
        path: "records",
        element: <Records />,
      },
      
    ],
  },
  
  {
    path: "/admin",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <AdminDashboard />,
        index: true,
      },
      {
        path: "dashboard",
        element: <AdminDashboard />,
        index: true,
      },
      
      {
        path: "clients",
        element: <AdminManageClients />,
      },
      {
        path: "users",
        element: <AdminManageUsers />,
      },
      
    ],
  },
];

export default ROUTES;
