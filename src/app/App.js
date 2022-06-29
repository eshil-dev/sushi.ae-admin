import { lazy } from "react";
import { Route, Routes, useRoutes } from "react-router-dom";

import ProtectedRoute from './ProtectedRoute';

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Login = lazy(() => import("../features/users/LoginForm"));
const Register = lazy(() => import("../features/users/RegisterForm"));
const Users = lazy(() => import("../features/users/UsersList"));

const Starter = lazy(() => import("../features/dashboard/Starter.js"));
const Categories = lazy(() => import("../features/categories/CategoriesList"));
const AddCategoryForm = lazy(() => import("../features/categories/AddCategoryFrom"));
const Menus = lazy(() => import("../features/menus/MenusList"));
const AddMenuForm = lazy(() => import("../features/menus/AddMenuForm"));

const App = () => {
  return (
    <Routes>
      <Route element={<FullLayout />}>
        <Route path="/" element={<ProtectedRoute><Starter /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><p>Order page is not completed yet</p></ProtectedRoute>} />
        <Route path="/add-category" element={<ProtectedRoute><AddCategoryForm /></ProtectedRoute>} />
        <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
        <Route path="/add-menu" element={<ProtectedRoute><AddMenuForm /></ProtectedRoute>} />
        <Route path="/menus" element={<ProtectedRoute><Menus /></ProtectedRoute>} />
        <Route path="/add-user" element={<ProtectedRoute><Register /></ProtectedRoute>} />
        <Route path="/all-user" element={<ProtectedRoute><Users /></ProtectedRoute>} />
      </Route>
      <Route path="/*" element={<p>Page not found!</p>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
