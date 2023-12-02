import { Button, Col, Row, Tooltip, Typography, message } from "antd";
import { touristPlace } from "../../../api/services";
import { useRef, useState } from "react";
import Title from "antd/es/typography/Title";
import { TouristPlace, TouristPlaceFormType } from "../../../types/services";
import TableEntities, { TableEntitiesRef } from "../../../common/TableEntities";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { FilterValue } from "antd/es/table/interface";
import { Filter } from "odata-query";
import PlaceForm from "./PlaceForm";
import ShowPlace from "../../show/services/ShowPlace";

const PlaceApp = () => {
  const { get, create, edit, remove } = touristPlace();
  const [loading, setLoading] = useState<boolean>(false);

  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);

  const [selected, setSelected] = useState<TouristPlace>();
  const [showModal, setShowModal] = useState<boolean>(false);

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
      select: ["id", "description", "name", "address"],
      expand: {
        image: { select: ["id", "url", "name"] },
        city: { select: ["id", "name", "country"] },
      },
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

  const createPlace = async (form: TouristPlaceFormType) => {
    setLoading(true);
    const response = await create(form);

    if (response.ok) {
      message.success("Place created");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  const editPlace = async (form: TouristPlaceFormType, id: string) => {
    setLoading(true);
    const response = await edit(form, id);

    if (response.ok) {
      message.success("Place edited");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  const deletePlace = async (id: string) => {
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
                  render: (v: TouristPlace) => <>{v.name}</>,
                },
                {
                  title: "Description",
                  key: "description",
                  render: (v: TouristPlace) => <>{v.description}</>,
                },
                {
                  title: "Address",
                  key: "address",
                  render: (v: TouristPlace) => (
                    <>{`${v.address}, ${v.city.name}, ${v.city.country}`}</>
                  ),
                },
                {
                  title: "Actions",
                  key: "Actions",
                  render: (v: TouristPlace) => (
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
                              deletePlace(v.id);
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
        onOk={(form: TouristPlaceFormType) => {
          setCreateModal(false);
          createPlace(form);
        }}
        onCancel={() => setCreateModal(false)}
        open={createModal}
      />
      {selected && (
        <PlaceForm
          onOk={(form: TouristPlaceFormType) => {
            setEditModal(false);
            editPlace(form, selected.id);
          }}
          onCancel={() => setEditModal(false)}
          open={editModal}
          values={{
            name: selected.name,
            description: selected.description,
            address: selected.address,
            cityId: selected.city.id,
            image: selected.image,
          }}
        />
      )}
      {selected && (
        <ShowPlace
          open={showModal}
          onOk={() => {
            setShowModal(false);
          }}
          place={selected}
        />
      )}
    </>
  );
};

export default PlaceApp;
