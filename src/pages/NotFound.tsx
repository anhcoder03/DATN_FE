import { Layout } from "../components/layout";
import NotFount from "../assets/404.png";

const NotFound = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center max-w-[500px] w-full mx-auto">
        <img src={NotFount} alt="" />
        <h3 className="text-base font-semibold">Trang không tồn tại !</h3>
        <p>Trang bạn truy cập không tồn tại hoặc bạn không có quyền truy cập</p>
      </div>
    </Layout>
  );
};

export default NotFound;
