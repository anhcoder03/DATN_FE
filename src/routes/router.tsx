import { RouteObject, Routes, Route } from "react-router-dom";
import ReceptionList from "../pages/reception/ReceptionList";
import WelcomeUpdate from "../pages/reception/components/WelcomeUpdate";
import ReceptionAdd from "../pages/reception/components/ReceptionAdd";
import AddBooking from "../pages/reception/components/AddBooking";
import ReceptionView from "../pages/reception/components/ReceptionView";
import ExaminationList from "../pages/examination/ExaminationList";
import ExaminationDetail from "../pages/examination/ExaminationDetail";
import ExaminationUpdate from "../pages/examination/update/ExaminationUpdate";
import PrescriptionDetail from "../pages/prescription/components/PrescriptionDetail";
import PrescriptionAdd from "../pages/prescription/components/PrescriptionAdd";
import PrescriptionListContainer from "../pages/prescription/list/PrescriptionList";
import Login from "../pages/auth/Login";
import Information from "../pages/auth/Information";
import ProductList from "../pages/product/ProductList";
import ProductAdd from "../pages/product/components/ProductAdd";
import ProductDetail from "../pages/product/components/ProductDetail";
import ProductUpdate from "../pages/product/components/ProductUpdate";
import ServiceList from "../pages/service/ServiceList";
import ServiceAdd from "../pages/service/ServiceAdd";
import ServiceDetail from "../pages/service/components/ServiceDetail";
import ServiceUpdate from "../pages/service/components/ServiceUpdate";
import DetailBooking from "../pages/reception/components/DetailBooking";
import UpdateBooking from "../pages/reception/components/UpdateBooking";
import DesignationList from "../pages/designation/DesignationList";
import DesignationDetail from "../pages/designation/DesignationDetail";
import DesigantionUpdate from "../pages/designation/components/DesignationUpdate";
import CustommerList from "../pages/customer/CustommerList";
import CustomerAdd from "../pages/customer/CustomerAdd";
import CustomerDetail from "../pages/customer/components/CustomerDetail";
import DashboardPage from "../pages/dashboard";
import ConfigUserListContainer from "../pages/configuration/user/list";
import ConfigUserAddContainer from "../pages/configuration/user/new";
import ConfigUserUpdateContainer from "../pages/configuration/user/edit";
import ClinicList from "../pages/clinic/ClinicList";
import ClinicAdd from "../pages/clinic/ClinicAdd";
import ClinicUpdate from "../pages/clinic/components/ClinicUpdate";
import TitleList from "../pages/title/TitleList";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { ROLE } from "../constants/define";
import OrderList from "../pages/order/OrderList";
import OrderDetail from "../pages/order/components/OrderDetail";
import Home from "../pages/Home";
import CategoryList from "../pages/category/CategoryList";
import CategoryAdd from "../pages/category/CategoryAdd";
import CategoryUpdate from "../pages/category/components/CategoryUpdate";
import NotFound from "../pages/NotFound";
export const doctorRouter: any[] = [
  {
    path: "reception",
    element: ReceptionList,
  },
  {
    path: "reception/:id",
    element: WelcomeUpdate,
  },
  {
    path: "reception/add",
    element: ReceptionAdd,
  },
  {
    path: "reception/addBooking",
    element: AddBooking,
  },
  {
    path: "reception/:id/view",
    element: ReceptionView,
  },
  {
    path: "examination",
    element: ExaminationList,
  },
  {
    path: "examination/:id/view",
    element: ExaminationDetail,
  },
  {
    path: "examination/:id",
    element: ExaminationUpdate,
  },
  {
    path: "reception/booking/:id",
    element: DetailBooking,
  },
  {
    path: "reception/booking/update/:id",
    element: UpdateBooking,
  },
  {
    path: "designation/list",
    element: DesignationList,
  },
  {
    path: "designation/:id/view",
    element: DesignationDetail,
  },
  {
    path: "designation/update/:id",
    element: DesigantionUpdate,
  },
];

export const publiRouter: any[] = [
  {
    path: "login",
    element: Login,
  },
  {
    path: "account",
    element: Information,
  },
  {
    path: "product/list",
    element: ProductList,
  },
  {
    path: "product/add",
    element: ProductAdd,
  },
  {
    path: "product/view/:id",
    element: ProductDetail,
  },
  {
    path: "product/update/:id",
    element: ProductUpdate,
  },
  {
    path: "customer/list",
    element: CustommerList,
  },
  {
    path: "customer/add",
    element: CustomerAdd,
  },
  {
    path: "customer/:id",
    element: CustomerDetail,
  },
  { path: "", element: Home },
  {
    path: "prescription",
    element: PrescriptionListContainer,
  },
  {
    path: "prescription/view/:id",
    element: PrescriptionDetail,
  },
  {
    path: "prescription/add/:id",
    element: PrescriptionAdd,
  },
  {
    path: "order",
    element: OrderList,
  },
  {
    path: "order/:id/view",
    element: OrderDetail,
  },
  {
    path: "category/list",
    element: CategoryList,
  },
  {
    path: "category/add",
    element: CategoryAdd,
  },
  {
    path: "category/update/:id",
    element: CategoryUpdate,
  },
];

export const adminRouter: any[] = [
  {
    path: "dashboard",
    element: DashboardPage,
  },
  {
    path: "configuration/user",
    element: ConfigUserListContainer,
  },
  {
    path: "configuration/user/add",
    element: ConfigUserAddContainer,
  },
  {
    path: "configuration/user/:id/edit",
    element: ConfigUserUpdateContainer,
  },
  {
    path: "service/list",
    element: ServiceList,
  },
  {
    path: "service/add",
    element: ServiceAdd,
  },
  {
    path: "service/:id",
    element: ServiceDetail,
  },
  {
    path: "service/update/:id",
    element: ServiceUpdate,
  },
  {
    path: "configuration/clinic",
    element: ClinicList,
  },
  {
    path: "configuration/clinic/add",
    element: ClinicAdd,
  },
  {
    path: "configuration/clinic/update/:id",
    element: ClinicUpdate,
  },
  {
    path: "configuration/title",
    element: TitleList,
  },
];

export const sellerRouter: any[] = [
  {
    path: "prescription",
    element: PrescriptionListContainer,
  },
  {
    path: "prescription/view/:id",
    element: PrescriptionDetail,
  },
  {
    path: "prescription/add/:id",
    element: PrescriptionAdd,
  },
  {
    path: "order",
    element: OrderList,
  },
  {
    path: "order/:id/view",
    element: OrderDetail,
  },
];

const AppRouter = () => {
  const auth = useSelector((state: RootState) => state.auth.auth?.user);
  return (
    <Routes>
      {auth?.role?.roleNumber === ROLE.ADMIN &&
        adminRouter?.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          />
        ))}
      {auth?.role?.roleNumber === ROLE.STAFFSELL ||
        (auth?.role?.roleNumber === ROLE.ADMIN &&
          sellerRouter?.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.element />}
            />
          )))}
      {(auth?.role?.roleNumber === ROLE.DOCTOR ||
        auth?.role?.roleNumber === ROLE.STAFFRECEPTION ||
        auth?.role?.roleNumber === ROLE.ADMIN) &&
        doctorRouter?.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          />
        ))}
      {publiRouter?.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};
export default AppRouter;
