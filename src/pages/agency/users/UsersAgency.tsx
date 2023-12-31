import { Button, Col, Row, Tag, Tooltip, Typography, message } from "antd";
import { userAgency } from "../../../api/auth";
import { useRef, useState } from "react";
import Title from "antd/es/typography/Title";
import TableEntities, { TableEntitiesRef } from "../../../common/TableEntities";
import { DeleteOutlined } from "@ant-design/icons";
import { FilterValue } from "antd/es/table/interface";
import { Filter } from "odata-query";
import { Roles, UserAgency, UserAgencyFormType } from "../../../types/auth";
import UserAgencyForm from "./UsersAgencyForm";

const UsersAgency = () => {
  const { get, create, remove } = userAgency();

  const [loading, setLoading] = useState<boolean>(false);
  const [createModal, setCreateModal] = useState<boolean>(false);

  const tableRef = useRef<TableEntitiesRef>({
    reload: () => {},
    reset: () => {},
  });

  const load = async (
    _: Record<string, FilterValue | null>,
    search: string,
    setDataValue: (data: UserAgency[]) => void
  ) => {
    setLoading(true);

    const searchFilter: Filter = {
      and: [{ Name: { contains: search } }],
    };

    const response = await get({
      select: ["id", "name", "email", "role"],
      filter: searchFilter,
    });

    if (response.ok) {
      const data = response.value || [];
      setDataValue(data);
    } else {
      message.error(response.message);
    }
    setLoading(false);
  };

  const createAgencyUser = async (form: UserAgencyFormType) => {
    setLoading(true);

    const response = await create(form);

    if (response.ok) {
      message.success("User created");

      tableRef.current.reload();
    } else message.error(response.message);

    setLoading(false);
  };

  const deleteAgencyUser = async (id: string) => {
    setLoading(true);
    const response = await remove(id);

    if (response.ok) {
      message.success("User deleted");

      tableRef.current.reload();
    } else message.error(response.message);

    setLoading(false);
  };

  const getTable = () => {
    const nameColumn = {
      title: "Name",
      key: "name",
      render: (v: UserAgency) => <>{v.name}</>,
    };

    const emailColumn = {
      title: "Email",
      key: "email",
      render: (v: UserAgency) => <>{v.email}</>,
    };

    const roleColumn = {
      title: "Role",
      key: "role",
      render: (v: UserAgency) =>
        v.role === Roles.ManagerAgency ? (
          <Tag color="blue">Manager</Tag>
        ) : (
          <Tag color="green">Employee</Tag>
        ),
    };

    const actionsColumn = {
      title: "Actions",
      key: "Actions",
      render: (v: UserAgency) => (
        <Row gutter={10}>
          <Col>
            <Tooltip title="Delete">
              <DeleteOutlined
                onClick={() => {
                  deleteAgencyUser(v.id);
                }}
              />
            </Tooltip>
          </Col>
        </Row>
      ),
    };

    const columns = [nameColumn, emailColumn, roleColumn, actionsColumn];

    return (
      <TableEntities
        ref={tableRef}
        title={"Agency User"}
        loading={loading}
        columns={columns}
        load={load}
      />
    );
  };

  return (
    <>
      <div className="m-5">
        <Row justify="space-between" className="app-header">
          <Col>
            <Typography>
              <Title>Users</Title>
            </Typography>
          </Col>
          <Col>
            <Button
              type="primary"
              disabled={loading}
              onClick={() => setCreateModal(true)}
            >
              Create
            </Button>
          </Col>
        </Row>
        <Row className="content-center m-10">
          <Col span={24}>{getTable()}</Col>
        </Row>
      </div>
      <UserAgencyForm
        onOk={(form: UserAgencyFormType) => {
          if (createModal) {
            setCreateModal(false);
            createAgencyUser(form);
          }
        }}
        create={createModal}
        onCancel={() => {
          if (createModal) setCreateModal(false);
        }}
        open={createModal}
      />
    </>
  );
};

export default UsersAgency;
