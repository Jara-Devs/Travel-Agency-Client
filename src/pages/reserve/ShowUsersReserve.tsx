import { Button, Modal, Table, Typography } from "antd";
import { UserIdentity } from "../../types/auth";
import { FC, useRef } from "react";
import ReactToPrint from "react-to-print";
import PrintDocument from "../../common/PrintDocumnet";

export interface ShowUsersInReserveProps {
  users: UserIdentity[];
  open: boolean;
  onOk: () => void;
}

const ShowUsersInReserve: FC<ShowUsersInReserveProps> = ({
  open,
  users,
  onOk,
}) => {
  const componentRef = useRef<any>(null);
  return (
    <Modal
      open={open}
      title={<Typography.Title level={3}>Tourists</Typography.Title>}
      onOk={onOk}
      width={600}
      onCancel={onOk}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <ReactToPrint
          trigger={() => <Button type="primary">Print</Button>}
          content={() => componentRef.current}
        />
      </div>
      <div className="m-5">
        <div ref={componentRef}>
          <PrintDocument
            node={
              <Table
                pagination={false}
                key="id"
                dataSource={users}
                columns={[
                  {
                    title: "Name",
                    key: "name",
                    render: (v: UserIdentity) => <>{v.name}</>,
                  },
                  {
                    title: "Identity document",
                    key: "identityDocument",
                    render: (v: UserIdentity) => <>{v.identityDocument}</>,
                  },
                  {
                    title: "Nationality",
                    key: "nationality",
                    render: (v: UserIdentity) => <>{v.nationality}</>,
                  },
                ]}
              />
            }
            title="Tourists"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ShowUsersInReserve;
