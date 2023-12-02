import { UserContext } from "../context/UserProvider";
import { useContext, FC } from "react";
import { Roles } from "../types/auth";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Button } from "antd";

export interface ReserveOnlineProps {
  id: string;
  availability: number;
}

const ReserveOnline: FC<ReserveOnlineProps> = ({ id, availability }) => {
  const { user } = useContext(UserContext);

  return (
    <>
      {user?.role === Roles.Tourist && (
        <div className="center-content mt-5">
          <Button type="primary">
            <ShoppingCartOutlinedIcon />
          </Button>
        </div>
      )}
    </>
  );
};

export default ReserveOnline;
