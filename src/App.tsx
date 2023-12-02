import React, { Suspense, useEffect, useState } from "react";
import {
  createBrowserRouter,
  BrowserRouter as Router,
  RouterProvider,
} from "react-router-dom";
import LoadingPage from "./components/common/LoadingPage";
import Login from "./pages/auth/Login";
import CategoryAdd from "./pages/category/CategoryAdd";
import CategoryList from "./pages/category/CategoryList";
import CategoryDetail from "./pages/category/components/CategoryDetail";
import CategoryUpdate from "./pages/category/components/CategoryUpdate";
import ClinicAdd from "./pages/clinic/ClinicAdd";
import ClinicList from "./pages/clinic/ClinicList";
import ClinicUpdate from "./pages/clinic/components/ClinicUpdate";
import TitleList from "./pages/title/TitleList";
import ConfigUserUpdateContainer from "./pages/configuration/user/edit";
import ConfigUserListContainer from "./pages/configuration/user/list";
import ConfigUserAddContainer from "./pages/configuration/user/new";
import CustomerDetail from "./pages/customer/components/CustomerDetail";
import CustomerUpdate from "./pages/customer/components/CustomerUpdate";
import CustomerAdd from "./pages/customer/CustomerAdd";
import CustommerList from "./pages/customer/CustommerList";
import ExaminationList from "./pages/examination/ExaminationList";
import Home from "./pages/Home";
import PrescriptionListContainer from "./pages/prescription/list/PrescriptionList";
import ProductAdd from "./pages/product/components/ProductAdd";
import ProductDetail from "./pages/product/components/ProductDetail";
import ProductUpdate from "./pages/product/components/ProductUpdate";
import ProductList from "./pages/product/ProductList";
import AddBooking from "./pages/reception/components/AddBooking";
import ReceptionAdd from "./pages/reception/components/ReceptionAdd";
import ReceptionList from "./pages/reception/ReceptionList";
import ServiceDetail from "./pages/service/components/ServiceDetail";
import ServiceUpdate from "./pages/service/components/ServiceUpdate";
import DetailBooking from "./pages/reception/components/DetailBooking";
import UpdateBooking from "./pages/reception/components/UpdateBooking";
import ServiceAdd from "./pages/service/ServiceAdd";
import ServiceList from "./pages/service/ServiceList";
import DesignationList from "./pages/designation/DesignationList";
import WelcomeUpdate from "./pages/reception/components/WelcomeUpdate";
import ReceptionView from "./pages/reception/components/ReceptionView";
import DesignationDetail from "./pages/designation/DesignationDetail";
import DesigantionUpdate from "./pages/designation/components/DesignationUpdate";
import ExaminationDetail from "./pages/examination/ExaminationDetail";
import ExaminationUpdate from "./pages/examination/update/ExaminationUpdate";
import PrescriptionDetail from "./pages/prescription/components/PrescriptionDetail";
import PrescriptionAdd from "./pages/prescription/components/PrescriptionAdd";
import { getMessagingToken, onMessageListener } from "./firebase";
import Information from "./pages/auth/Information";
import Examination_view from "./pages/examination_view/Examination_view";
import DashboardPage from "./pages/dashboard";
import OrderList from "./pages/order/OrderList";
import OrderDetail from "./pages/order/components/OrderDetail";
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
      path: "configuration/title",
      element: <TitleList />,
    },
    {
      path: "configuration/title/add",
    },
    {
      path: "configuration/title/update/:id",
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
      path: "examination_view",
      element: <Examination_view />,
    },
    //order
    {
      path: "order",
      element: <OrderList />,
    },
    {
      path: "order/:id/view",
      element: <OrderDetail />,
    },
  ]);
  return (
    <React.Fragment>
      <Router>
        <AppRouter />
      </Router>
    </React.Fragment>
  );
}

export default App;
