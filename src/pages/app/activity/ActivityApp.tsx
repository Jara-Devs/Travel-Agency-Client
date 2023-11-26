import { Button, Col, Row, Tooltip, Typography, message } from "antd";
import { touristActivity } from "../../../api/services";
import { useRef, useState } from "react";
import Title from "antd/es/typography/Title";
import {
  TouristActivity,
  TouristActivityFormType,
} from "../../../types/services";
import TableEntities, { TableEntitiesRef } from "../../../common/TableEntities";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { FilterValue } from "antd/es/table/interface";
import { Filter } from "odata-query";
import ShowActivity from "../../show/services/ShowActivity";
import TouristActivityForm from "./ActivityForm";

const ActivityApp = () => {
  const { get, create, edit, remove } = touristActivity();
  const [loading, setLoading] = useState<boolean>(false);

  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);

  const [selected, setSelected] = useState<TouristActivity>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const tableRef = useRef<TableEntitiesRef>({
    reload: () => {},
    reset: () => {},
  });

  const load = async (
    _: Record<string, FilterValue | null>,
    search: string,
    setDataValue: (data: TouristActivity[]) => void
  ) => {
    setLoading(true);

    const searchFilter: Filter = { Name: { contains: search } };

    const response = await get({
      select: ["id", "description", "name"],
      expand: { image: { select: ["id", "url", "name"] } },

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

  const createTouristActivity = async (form: TouristActivityFormType) => {
    setLoading(true);
    console.log(form);
    const response = await create(form);

    if (response.ok) {
      message.success("Tourist Activity created");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  const editTouristActivity = async (
    form: TouristActivityFormType,
    id: string
  ) => {
    setLoading(true);
    const response = await edit(form, id);

    if (response.ok) {
      message.success("Tourist Activity edited");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  const deleteTouristActivity = async (id: string) => {
    setLoading(true);
    const response = await remove(id);

    if (response.ok) {
      message.success("Tourist Activity deleted");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  return (
    <>
      <div className="m-5">
        <Row justify="space-between" className="app-header">
          <Col>
            <Typography>
              <Title>Tourist Activities</Title>
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
          <Col span={24}>
            <TableEntities
              ref={tableRef}
              title="Tourist Activities"
              loading={loading}
              columns={[
                {
                  title: "Name",
                  key: "name",
                  render: (v: TouristActivity) => <>{v.name}</>,
                },
                {
                  title: "Description",
                  key: "Description",
                  render: (v: TouristActivity) => <>{v.description}</>,
                },

                {
                  title: "Actions",
                  key: "Actions",
                  render: (v: TouristActivity) => (
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
                              deleteTouristActivity(v.id);
                            }}
                          />
                        </Tooltip>
                      </Col>
                    </Row>
                  ),
                },
              ]}
              load={load}
            />
          </Col>
        </Row>
      </div>
      <TouristActivityForm
        onOk={(form: TouristActivityFormType) => {
          setCreateModal(false);
          createTouristActivity(form);
        }}
        onCancel={() => setCreateModal(false)}
        open={createModal}
      />
      {selected && (
        <TouristActivityForm
          onOk={(form: TouristActivityFormType) => {
            setEditModal(false);
            editTouristActivity(form, selected.id);
          }}
          onCancel={() => setEditModal(false)}
          open={editModal}
          values={{
            name: selected.name,
            description: selected.description,
            image: selected.image,
          }}
        />
      )}
      {selected && (
        <ShowActivity
          open={showModal}
          onOk={() => {
            setShowModal(false);
          }}
          touristActivity={selected}
        />
      )}
    </>
  );
};

export default ActivityApp;
