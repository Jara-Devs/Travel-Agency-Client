import { UserContext } from "../context/UserProvider";
import { useContext, FC, useState } from "react";
import { Roles } from "../types/auth";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Button, message } from "antd";
import { reserveOnline } from "../api/reserves";
import { ReserveOnlineForm } from "../types/reserves";
import ReserveForm from "../pages/reserve/ReserveForm";

export interface ReserveOnlineProps {
  id: string;
  availability: number;
  isSingleOffer: boolean;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  reload: () => void;
}

const ReserveOnline: FC<ReserveOnlineProps> = ({
  loading,
  setLoading,
  isSingleOffer,
  id,
  availability,
  reload,
}) => {
  const { user } = useContext(UserContext);
  const { create } = reserveOnline();

  const userIdentity = (user as any)?.userIdentity;
  const [show, setShow] = useState<boolean>(false);

  const reserve = async (form: ReserveOnlineForm) => {
    setLoading(true);

    const response = await create(form);

    if (response.ok) {
      message.success("Reserve created");
      reload();
    } else message.error(response.message);

    setLoading(false);
  };

  return (
    <>
      {user?.role === Roles.Tourist && (
        <>
          <div className="center-content mt-5">
            <Button
              type="primary"
              onClick={() => setShow(true)}
              disabled={loading}
            >
              <ShoppingCartOutlinedIcon />
            </Button>
          </div>

          <ReserveForm
            isOnline={true}
            availability={availability}
            userIdentity={{
              name: userIdentity.name,
              nationality: userIdentity.nationality,
              identityDocument: userIdentity.identityDocument,
            }}
            open={show}
            onOk={(form) => {
              setShow(false);

              reserve({
                id,
                isSingleOffer,
                ...form,
                userIdentity: form.userIdentities[0],
              });
            }}
            onCancel={() => setShow(false)}
          />
        </>
      )}
    </>
  );
};

export default ReserveOnline;
