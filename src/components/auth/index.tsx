import { Button, Result } from "antd";
import { useCurrentApp } from "../context/app.context";
import { Link, useLocation } from "react-router-dom";

interface Iprops {
  children: React.ReactNode;
}

const ProtectedRoute = (props: Iprops) => {
  const { user, isAuthenticated } = useCurrentApp();
  const location = useLocation();
  if (isAuthenticated === false) {
    return (
      <Result
        title="Not Login"
        subTitle="Bạn vui lòng đăng nhập để sử dụng tính năng này."
        extra={
          <Button type="primary">
            <Link to="/login">Đăng nhập</Link>
          </Button>
        }
      />
    );
  }

  const isAdminRoute = location.pathname.includes("admin");
  if (isAuthenticated === true && isAdminRoute === true) {
    if (user?.role === "USER") {
      return (
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Button type="primary">
              <Link to={"/"}>Back Home</Link>
            </Button>
          }
        />
      );
    }
  }

  return <>{props.children}</>;
};

export default ProtectedRoute;
