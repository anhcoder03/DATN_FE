
import React from "react";
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
import PrescriptionListContainer from './pages/prescription/list';

function App() {
  const router = createBrowserRouter([
    { path: '', element: <Home /> },
    {
      path: 'reception',
      element: <ReceptionList />,
    },
    {
      path: 'examination',
      element: <ExaminationList />,
    },
    {
      path: 'customer/list',
      element: <CustommerList />,
    },
    {
      path: 'customer/add',
      element: <CustomerAdd />,
    },
    {
      path: 'customer/:id',
      element: <CustomerDetail />,
    },
    {
      path: 'customer/update/:id',
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
      path: 'category/:id',
      element: <CategoryDetail />
    },
    {
      path: 'prescription',
      element: <PrescriptionListContainer />,
    }
  ]);
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;
