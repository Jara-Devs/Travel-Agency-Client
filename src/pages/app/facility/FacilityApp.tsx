import { Button, Col, Row, Tag, Tooltip, Typography, message } from "antd";
import { facility } from "../../../api/services";
import { useRef, useState } from "react";
import Title from "antd/es/typography/Title";
import {
  Facility,
  FacilityFormType,
  FacilityType,
} from "../../../types/services";
import TableEntities, { TableEntitiesRef } from "../../../common/TableEntities";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { FilterValue } from "antd/es/table/interface";
import { Filter } from "odata-query";
import FacilityForm from "./FacilityForm";

const FacilityTag = (type: FacilityType) => {
  switch (type) {
    case FacilityType.Hotel:
      return <Tag color="green">Hotel</Tag>;
    case FacilityType.Excursion:
      return <Tag color="blue">Excursion</Tag>;
    case FacilityType.Flight:
      return <Tag color="purple">Flight</Tag>;
  }
};

const FacilityApp = () => {
  const { get, create, edit, remove } = facility();
  const [loading, setLoading] = useState<boolean>(false);

  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);

  const [selected, setSelected] = useState<Facility>();

  const tableRef = useRef<TableEntitiesRef>({
    reload: () => {},
    reset: () => {},
  });

  const load = async (
    _: Record<string, FilterValue | null>,
    search: string,
    setDataValue: (data: Facility[]) => void
  ) => {
    setLoading(true);

    const searchFilter: Filter = { Name: { contains: search } };

    const response = await get({
      select: ["id", "name", "type"],
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

  const createTouristActivity = async (form: FacilityFormType) => {
    setLoading(true);

    const response = await create(form);

    if (response.ok) {
      message.success("Facility created");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  const editTouristActivity = async (form: FacilityFormType, id: string) => {
    setLoading(true);
    const response = await edit(form, id);

    if (response.ok) {
      message.success("Facility edited");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  const deleteTouristActivity = async (id: string) => {
    setLoading(true);
    const response = await remove(id);

    if (response.ok) {
      message.success("Facility deleted");
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
              <Title>Facilities</Title>
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
              title="Facilities"
              loading={loading}
              columns={[
                {
                  title: "Name",
                  key: "name",
                  render: (v: Facility) => <>{v.name}</>,
                },
                {
                  title: "Type",
                  key: "type",
                  render: (v: Facility) => <>{FacilityTag(v.type)}</>,
                },
                {
                  title: "Actions",
                  key: "Actions",
                  render: (v: Facility) => (
                    <Row gutter={10}>
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
      <FacilityForm
        onOk={(form: FacilityFormType) => {
          setCreateModal(false);
          createTouristActivity(form);
        }}
        onCancel={() => setCreateModal(false)}
        open={createModal}
      />
      {selected && (
        <FacilityForm
          onOk={(form: FacilityFormType) => {
            setEditModal(false);
            editTouristActivity(form, selected.id);
          }}
          onCancel={() => setEditModal(false)}
          open={editModal}
          values={{
            name: selected.name,
            type: selected.type,
          }}
        />
      )}
    </>
  );
};

export default FacilityApp;
