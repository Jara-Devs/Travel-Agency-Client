import { Button, Col, Row, Tag, Tooltip, Typography, message } from "antd";
import { agencyUser } from "../../api/services";
import { useRef, useState } from "react";
import Title from "antd/es/typography/Title";
import TableEntities, { TableEntitiesRef } from "../../common/TableEntities";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { FilterValue } from "antd/es/table/interface";
import { Filter } from "odata-query";
import {
    AgencyUser,
    AgencyUserFormType
  } from "../../types/services";
import AgencyUserForm from "./UsersForm";

const UsersApp = () =>{
    const { get, create, edit, remove } = agencyUser();

    const [loading, setLoading] = useState<boolean>(false);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [selected, setSelected] = useState<AgencyUser>();
    const [showModal, setShowModal] = useState<boolean>(false);

    const tableRef = useRef<TableEntitiesRef>({
        reload: () => {},
        reset: () => {},
      });
    
    const load = async (
        _: Record<string, FilterValue | null>,
        search: string,
        setDataValue: (data: AgencyUser[]) => void
    ) => {
        setLoading(true);
    

        const searchFilter: Filter = {
            and: [{ Name: { contains: search } }],
        };

        const response = await get({
            select: ["id", "name", "email", "role", "agencyId"],
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

    const createAgencyUser = async (
        form: AgencyUserFormType,
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
        form: AgencyUserFormType,
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
          render: (v: AgencyUser) => <>{v.name}</>,
        };
    
        const emailColumn = {
          title: "Email",
          key: "email",
          render: (v: AgencyUser) => <>{v.email}</>,
        };

        const passwordColumn = {
            title: "Password",
            key: "password",
            render: (v: AgencyUser) => <>{v.password}</>,
        };

        const roleColumn = {
            title: "Role",
            key: "role",
            render: (v: AgencyUser) => <>{v.role}</>,
        };

        const agencyColumn = {
            title: "Agency",
            key: "agency",
            render: (v: AgencyUser) => <>{v.agencyId}</>,
        };
    
    
        const actionsColumn = {
          title: "Actions",
          key: "Actions",
          render: (v: AgencyUser) => (
            <Row gutter={10}>
              <Col>
                <Tooltip title="Show">
                  <EyeOutlined
                    onClick={() => {
                      setSelected(v);
                      setShowModal(true);
                    }}
                  />
                </Tooltip>
              </Col>
              <Col>
                <Tooltip title="Edit">
                  <EditOutlined
                    onClick={() => {
                      setSelected(v);
                      setEditModal(true);
                    }}
                  />
                </Tooltip>
              </Col>
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

        const columns = [nameColumn, emailColumn, passwordColumn, roleColumn, agencyColumn, actionsColumn];
    
        return (
          <TableEntities
            ref={tableRef}
            title={"AgencyUser"}
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
          <AgencyUserForm
            onOk={(form: AgencyUserFormType) => {
              if (createModal) {
                setCreateModal(false);
                createAgencyUser(form);
              }
              if (editModal && selected != null) {
                setEditModal(false);
                editAgencyUser(form, selected.id);
              }
            }}
            create={createModal}
            onCancel={() => {
              if (createModal) setCreateModal(false);
              if (editModal) setEditModal(false);
            }}
            open={createModal || editModal}
            values={
              editModal && selected != null
                ? {
                    name: selected.name,
                    email: selected.email,
                    password: selected.password,
                    role: selected.role,
                    agencyId: selected.agencyId
                  }
                : undefined
            }
          />
        </>
      );

};

export default UsersApp;
