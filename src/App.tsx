import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import ReceptionList from './pages/reception/ReceptionList';
import ExaminationList from './pages/examination/ExaminationList';
import CustommerList from './pages/customer/CustommerList';
import CustomerAdd from './pages/customer/CustomerAdd';
import CustomerDetail from './pages/customer/components/CustomerDetail';
import CustomerUpdate from './pages/customer/components/CustomerUpdate';
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
      path: 'prescription',
      element: <PrescriptionListContainer />,
    },
  ]);
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
}

export default App;
