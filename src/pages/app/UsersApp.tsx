import { Button, Col, Row, Tooltip, Typography, message } from "antd";
import { userSystem } from "../../api/auth";
import { useRef, useState } from "react";
import Title from "antd/es/typography/Title";
import TableEntities, { TableEntitiesRef } from "../../common/TableEntities";
import { DeleteOutlined } from "@ant-design/icons";
import { FilterValue } from "antd/es/table/interface";
import { Filter } from "odata-query";
import {
  UserSystem,
  UserSystemFormType
} from "../../types/auth";
import UserForm from "./UsersForm";

const UsersApp  = () =>{
    const { get, create, edit, remove } = userSystem();

    const [loading, setLoading] = useState<boolean>(false);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [selected, setSelected] = useState<UserSystem>();

    const tableRef = useRef<TableEntitiesRef>({
        reload: () => {},
        reset: () => {},
      });
    
    const load = async (
        _: Record<string, FilterValue | null>,
        search: string,
        setDataValue: (data: UserSystem[]) => void
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
    }

    const createUser = async (
        form: UserSystemFormType,
      ) => {
        setLoading(true);
    
        const response = await create(form);
    
        if (response.ok) {
          message.success("User created");
    
          tableRef.current.reload();
        } else message.error(response.message);
    
        setLoading(false);
      };

      const editAgencyUser = async (
        form: UserSystemFormType,
        id: number
      ) => {
       setLoading(true);
    
        const response = await edit(form, id);
    
        if (response.ok) {
          message.success("User edited");
    
          tableRef.current.reload();
        } else message.error(response.message);

        setLoading(false);
      };

      const deleteAgencyUser = async (id: number) => {
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
          render: (v: UserSystem) => <>{v.name}</>,
        };
    
        const emailColumn = {
          title: "Email",
          key: "email",
          render: (v: UserSystem) => <>{v.email}</>,
        };

        const roleColumn = {
            title: "Role",
            key: "role",
            render: (v: UserSystem) => <>{v.role}</>,
        };

        const actionsColumn = {
          title: "Actions",
          key: "Actions",
          render: (v: UserSystem) => (
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
            title={"Users"}
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
          <UserForm
            onOk={(form: UserSystemFormType) => {
              if (createModal) {
                setCreateModal(false);
                createUser(form);
              }
            }}
            create={createModal}
            onCancel={() => {
              if (createModal) setCreateModal(false);
            }}
            open={createModal}
            values={
              selected != null
                ? {
                    name: selected.name,
                    email: selected.email,
                    password: selected.password,
                    role: selected.role,
                  }
                : undefined
            }
          />
        </>
      );

};

export default UsersApp;
