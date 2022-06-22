import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Login = lazy(() => import("../features/users/LoginForm"));
const Register = lazy(() => import("../features/users/RegisterForm"));

const Starter = lazy(() => import("../features/dashboard/Starter.js"));
const Categories = lazy(() => import("../features/categories/CategoriesList"));
const AddCategoryForm = lazy(() => import("../features/categories/AddCategoryFrom"));
const Menus = lazy(() => import("../features/menus/MenusList"));
const AddMenuForm = lazy(() => import("../features/menus/AddMenuForm"));

/*****Routes******/

var routes = [
  { path: "/login", exact: true, element: <Login /> },
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Starter /> },
      { path: "/categories", exact: true, element: <Categories /> },
      { path: "/add-category", exact: true, element: <AddCategoryForm /> },
      { path: "/add-menu", exact: true, element: <AddMenuForm /> },
      { path: "/menus", exact: true, element: <Menus /> },
      { path: "/users", exact: true, element: <Register /> },
    ],
  },
]

const ThemeRoutes = routes;

export default ThemeRoutes;
