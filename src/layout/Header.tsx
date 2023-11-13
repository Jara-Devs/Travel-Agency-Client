import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { FC, useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

const MyHeader: FC<{}> = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div className="layout-header-content">
      <div className="layout-header-left-buttons layout-header-effect">
        <p className="ml-10">Contact</p>
        <p className="ml-5 "> /</p>
        <p className="ml-5">FAQ</p>
      </div>
      {user ? (
        <div className="layout-header-effect" onClick={logout}>
          logout <LogoutOutlined />
        </div>
      ) : (
        <div
          className="layout-header-effect"
          onClick={() => navigate("/auth/login")}
        >
          login <LoginOutlined />
        </div>
      )}
    </div>
  );
};

export default MyHeader;
