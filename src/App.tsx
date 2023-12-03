import React, { Suspense, useEffect, useState } from "react";
import {
  createBrowserRouter,
  BrowserRouter as Router,
  RouterProvider,
} from "react-router-dom";
import LoadingPage from "./components/common/LoadingPage";
import { getMessagingToken, onMessageListener } from "./firebase";
import Information from "./pages/auth/Information";
import Examination_view from "./pages/examination_view/Examination_view";
import DashboardPage from "./pages/dashboard";
import OrderList from "./pages/order/OrderList";
import ClinicDetail from "./pages/clinic/components/ClinicDetail";
import AppRouter from "./routes/router";
const DEFAULT_NOTIFY = {
  title: "",
  body: "",
  link: "",
};
function App() {
  const [notify, setNotify] = useState(DEFAULT_NOTIFY);
  useEffect(() => {
    getMessagingToken();
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const payload = await onMessageListener();
        // fetch api Notification
        // bật toast hiển thị thông tin thông báo, bấm vào bất kỳ đoạn nào trong thông báo cũng redirect đến link trong thông báo được.
        console.log("Receive In-App notification SUCCEED:", payload);
      } catch (error) {
        console.log("Receive In-App notification ERROR:", error);
      }
    })();
  });
  const router = createBrowserRouter([
    { path: "", element: <Home /> },
    {
      path: "reception",
      element: <ReceptionList />,
    },
    {
      path: "reception/:id",
      element: <WelcomeUpdate />,
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
      path: "reception/:id/view",
      element: <ReceptionView />,
    },
    {
      path: "examination",
      element: <ExaminationList />,
    },
    {
      path: "examination/:id/view",
      element: <ExaminationDetail />,
    },
    {
      path: "examination/:id",
      element: <ExaminationUpdate />,
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
      path: "configuration/clinic/:id",
      element: <ClinicDetail />,
    },
    {
      path: "configuration/title",
      element: <TitleList />,
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
      path: "prescription/view/:id",
      element: <PrescriptionDetail />,
    },
    {
      path: "prescription/add/:id",
      element: <PrescriptionAdd />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "account",
      element: <Information />,
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
    // booking
    {
      path: "reception/booking/:id",
      element: <DetailBooking />,
    },
    {
      path: "reception/booking/update/:id",
      element: <UpdateBooking />,
    },

    {
      path: "configuration/user",
      element: <ConfigUserListContainer />,
    },
    {
      path: "configuration/user/add",
      element: <ConfigUserAddContainer />,
    },
    {
      path: "configuration/user/:id/edit",
      element: <ConfigUserUpdateContainer />,
    },
    {
      path: "designation/list",
      element: <DesignationList />,
    },
    {
      path: "designation/:id/view",
      element: <DesignationDetail />,
    },
    {
      path: "designation/update/:id",
      element: <DesigantionUpdate />,
    },
    {
      path: "dashboard",
      element: <DashboardPage />,
    },
    // examination
    {
      path: "examination_view/:id",
      element: <Examination_view />,
    },
    //order
    {
      path: "order",
      element: <OrderList />,
    },
  ]);
  return (
    <React.Fragment>
      <Suspense fallback={<LoadingPage />}>
        <Router>
          <AppRouter />
        </Router>
      </Suspense>
    </React.Fragment>
  );
}

export default App;
