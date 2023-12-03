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
import { Home } from "react-feather";
import ReceptionList from "./pages/reception/ReceptionList";
import WelcomeUpdate from "./pages/reception/components/WelcomeUpdate";
import ReceptionAdd from "./pages/reception/components/ReceptionAdd";
import AddBooking from "./pages/reception/components/AddBooking";
import ReceptionView from "./pages/reception/components/ReceptionView";
import ExaminationList from "./pages/examination/ExaminationList";
import ExaminationDetail from "./pages/examination/ExaminationDetail";
import ExaminationUpdate from "./pages/examination/update/ExaminationUpdate";
import CustommerList from "./pages/customer/CustommerList";
import CustomerAdd from "./pages/customer/CustomerAdd";
import CustomerDetail from "./pages/customer/components/CustomerDetail";
import CustomerUpdate from "./pages/customer/components/CustomerUpdate";
import CategoryList from "./pages/category/CategoryList";
import CategoryAdd from "./pages/category/CategoryAdd";
import CategoryUpdate from "./pages/category/components/CategoryUpdate";
import ClinicList from "./pages/clinic/ClinicList";
import ClinicAdd from "./pages/clinic/ClinicAdd";
import ClinicUpdate from "./pages/clinic/components/ClinicUpdate";
import TitleList from "./pages/title/TitleList";
import CategoryDetail from "./pages/category/components/CategoryDetail";
import PrescriptionDetail from "./pages/prescription/components/PrescriptionDetail";
import PrescriptionAdd from "./pages/prescription/components/PrescriptionAdd";
// import PrescriptionListContainer "./pages/prescription/list/PrescriptionList"
import Login from "./pages/auth/Login";
import ProductAdd from "./pages/product/components/ProductAdd";
import ProductList from "./pages/product/ProductList";
import ProductDetail from "./pages/product/components/ProductDetail";
import ProductUpdate from "./pages/product/components/ProductUpdate";
import ServiceList from "./pages/service/ServiceList";
import ServiceAdd from "./pages/service/ServiceAdd";
import ServiceDetail from "./pages/service/components/ServiceDetail";
import ServiceUpdate from "./pages/service/components/ServiceUpdate";
import DetailBooking from "./pages/reception/components/DetailBooking";
import UpdateBooking from "./pages/reception/components/UpdateBooking";
import ConfigUserListContainer from "./pages/configuration/user/list";
import ConfigUserAddContainer from "./pages/configuration/user/new";
import ConfigUserUpdateContainer from "./pages/configuration/user/edit";
import DesignationList from "./pages/designation/DesignationList";
import DesignationDetail from "./pages/designation/DesignationDetail";
import DesigantionUpdate from "./pages/designation/components/DesignationUpdate";
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
    // {
    //   path: "prescription",
    //   element: <PrescriptionListContainer />,
    // },
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
