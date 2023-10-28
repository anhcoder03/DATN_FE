import React, { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import ReceptionList from "./pages/reception/ReceptionList";
import ExaminationList from "./pages/examination/ExaminationList";
import CustommerList from "./pages/customer/CustommerList";
import CustomerAdd from "./pages/customer/CustomerAdd";
import CustomerDetail from "./pages/customer/components/CustomerDetail";
import CustomerUpdate from "./pages/customer/components/CustomerUpdate";
import CategoryList from "./pages/category/CategoryList";
import CategoryAdd from "./pages/category/CategoryAdd";
import CategoryUpdate from "./pages/category/components/CategoryUpdate";
import CategoryDetail from "./pages/category/components/CategoryDetail";
import PrescriptionListContainer from "./pages/prescription/list";
import Login from "./pages/auth/Login";
import ProductList from "./pages/product/ProductList";
import AddBooking from "./pages/reception/components/AddBooking";
import ReceptionAdd from "./pages/reception/components/ReceptionAdd";
import ProductAdd from "./pages/product/components/ProductAdd";
import LoadingPage from "./components/common/LoadingPage";
import ProductDetail from "./pages/product/components/ProductDetail";
import ProductUpdate from "./pages/product/components/ProductUpdate";
import ClinicList from "./pages/clinic/ClinicList";
import ClinicAdd from "./pages/clinic/ClinicAdd";
import ClinicUpdate from "./pages/clinic/components/ClinicUpdate";
import ServiceList from "./pages/service/ServiceList";
import ServiceAdd from "./pages/service/ServiceAdd";
import ServiceDetail from "./pages/service/components/ServiceDetail";
import ServiceUpdate from "./pages/service/components/ServiceUpdate";
function App() {
  const router = createBrowserRouter([
    { path: "", element: <Home /> },
    {
      path: "reception",
      element: <ReceptionList />,
    },
    {
      path: "reception/add",
      element: <ReceptionAdd />,
    },
    {
      path: "reception/addBooking",
      element: <AddBooking />,
    },
    {
      path: "examination",
      element: <ExaminationList />,
    },
    {
      path: "customer/list",
      element: <CustommerList />,
    },
    {
      path: "customer/add",
      element: <CustomerAdd />,
    },
    {
      path: "customer/:id",
      element: <CustomerDetail />,
    },
    {
      path: "customer/update/:id",
      element: <CustomerUpdate />,
    },
    {
      path: "category/list",
      element: <CategoryList />,
    },
    {
      path: "category/add",
      element: <CategoryAdd />,
    },
    {
      path: "category/update/:id",
      element: <CategoryUpdate />,
    },
    {
      path: "configuration/clinic",
      element: <ClinicList />,
    },
    {
      path: "configuration/clinic/add",
      element: <ClinicAdd />,
    },
    {
      path: "configuration/clinic/update/:id",
      element: <ClinicUpdate />,
    },
    {
      path: "category/view/:id",
      element: <CategoryDetail />,
    },
    {
      path: "prescription",
      element: <PrescriptionListContainer />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "product/list",
      element: <ProductList />,
    },
    {
      path: "product/add",
      element: <ProductAdd />,
    },
    {
      path: "product/view/:id",
      element: <ProductDetail />,
    },
    {
      path: "product/update/:id",
      element: <ProductUpdate />,
    },
    {
      path: "service/list",
      element: <ServiceList />,
    },
    {
      path: "service/add",
      element: <ServiceAdd />,
    },
    {
      path: "service/:id",
      element: <ServiceDetail />,
    },
    {
      path: "service/update/:id",
      element: <ServiceUpdate />,
    },
  ]);
  return (
    <React.Fragment>
      <Suspense fallback={<LoadingPage />}>
        <RouterProvider router={router} />
      </Suspense>
    </React.Fragment>
  );
}

export default App;
