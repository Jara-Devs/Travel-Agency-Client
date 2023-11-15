import { Button, Col, Row, Tooltip, Typography, message } from "antd";
import { touristPlace } from "../../api/services";
import { useRef, useState } from "react";
import Title from "antd/es/typography/Title";
import { TouristPlace, TouristPlaceForm } from "../../types/sevice";
import TableEntities, { TableEntitiesRef } from "../../common/TableEntities";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { FilterValue } from "antd/es/table/interface";
import { Filter } from "odata-query";
import PlaceForm from "./PlaceForm";

const PlaceApp = () => {
  const { get, create, edit, remove } = touristPlace();
  const [loading, setLoading] = useState<boolean>(false);

  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);

  const [selected, setSelected] = useState<TouristPlace>();

  const tableRef = useRef<TableEntitiesRef>({
    reload: () => {},
    reset: () => {},
  });

  const load = async (
    _: Record<string, FilterValue | null>,
    search: string,
    setDataValue: (data: TouristPlace[]) => void
  ) => {
    setLoading(true);

    const searchFilter: Filter = { Name: { contains: search } };

    const response = await get({
      select: ["Id", "Description", "Name", "Address"],
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

  const createPlace = async (form: TouristPlaceForm) => {
    setLoading(true);
    const response = await create(form);

    if (response.ok) {
      message.success("Place created");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  const editPlace = async (form: TouristPlaceForm, id: number) => {
    setLoading(true);
    const response = await edit(form, id);

    if (response.ok) {
      message.success("Place edited");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  const deletePlace = async (id: number) => {
    setLoading(true);
    const response = await remove(id);

    if (response.ok) {
      message.success("Place deleted");
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
              <Title>Places</Title>
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
              title="Places"
              loading={loading}
              columns={[
                {
                  title: "Name",
                  key: "name",
                  render: (v: TouristPlace) => <>{v.Name}</>,
                },
                {
                  title: "Description",
                  key: "description",
                  render: (v: TouristPlace) => <>{v.Description}</>,
                },
                {
                  title: "Address",
                  key: "address",
                  render: (v: TouristPlace) => (
                    <>{`${v.Address.Description}, ${v.Address.City}, ${v.Address.Country}`}</>
                  ),
                },
                {
                  title: "Actions",
                  key: "Actions",
                  render: (v: TouristPlace) => (
                    <Row gutter={10}>
                      <Col>
                        <Tooltip title="Show">
                          <EyeOutlined />
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
                              deletePlace(v.Id);
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
      <PlaceForm
        onOk={(form: TouristPlaceForm) => {
          setCreateModal(false);
          createPlace(form);
        }}
        onCancel={() => setCreateModal(false)}
        open={createModal}
      />
      {selected && (
        <PlaceForm
          onOk={(form: TouristPlaceForm) => {
            setEditModal(false);
            editPlace(form, selected.Id);
          }}
          onCancel={() => setEditModal(false)}
          open={editModal}
          values={{
            name: selected.Name,
            description: selected.Description,
            address: selected.Address.Description,
            city: selected.Address.City,
            country: selected.Address.Country,
          }}
        />
      )}
    </>
  );
};

export default PlaceApp;
