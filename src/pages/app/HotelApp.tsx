import { Button, Col, Row, Tooltip, Typography, message } from "antd";
import { hotel } from "../../api/services";
import { useRef, useState } from "react";
import Title from "antd/es/typography/Title";
import { Hotel, HotelFormType } from "../../types/services";
import TableEntities, { TableEntitiesRef } from "../../common/TableEntities";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { FilterValue } from "antd/es/table/interface";
import { Filter } from "odata-query";
import HotelForm from "./HotelForm";
import ShowHotel from "../show/ShowHotel";
import { getCategory } from "../../common/functions";

const HotelApp = () => {
  const { get, create, edit, remove } = hotel();
  const [loading, setLoading] = useState<boolean>(false);

  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);

  const [selected, setSelected] = useState<Hotel>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const tableRef = useRef<TableEntitiesRef>({
    reload: () => {},
    reset: () => {},
  });

  const load = async (
    _: Record<string, FilterValue | null>,
    search: string,
    setDataValue: (data: Hotel[]) => void
  ) => {
    setLoading(true);

    const searchFilter: Filter = { Name: { contains: search } };

    const response = await get({
      select: ["id", "category", "name", "touristPlaceId"],
      expand: {
        touristPlace: {
          select: ["id", "name", "address"],
          expand: { image: { select: ["id", "name", "url"] } },
        },
        image: { select: ["id", "url", "name"] },
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

  const createHotel = async (form: HotelFormType) => {
    setLoading(true);
    const response = await create(form);

    if (response.ok) {
      message.success("Hotel created");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  const editHotel = async (form: HotelFormType, id: number) => {
    setLoading(true);
    const response = await edit(form, id);

    if (response.ok) {
      message.success("Hotel edited");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  const deleteHotel = async (id: number) => {
    setLoading(true);
    const response = await remove(id);

    if (response.ok) {
      message.success("Hotel deleted");
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
              <Title>Hotels</Title>
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
              title="Hotels"
              loading={loading}
              columns={[
                {
                  title: "Name",
                  key: "name",
                  render: (v: Hotel) => <>{v.name}</>,
                },
                {
                  title: "Category",
                  key: "category",
                  render: (v: Hotel) => getCategory(v.category),
                },
                {
                  title: "Place",
                  key: "place",
                  render: (v: Hotel) => (
                    <>{`${v.touristPlace.name}, ${v.touristPlace.address.country}`}</>
                  ),
                },
                {
                  title: "Actions",
                  key: "Actions",
                  render: (v: Hotel) => (
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
                              deleteHotel(v.id);
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
      <HotelForm
        onOk={(form: HotelFormType) => {
          setCreateModal(false);
          createHotel(form);
        }}
        onCancel={() => setCreateModal(false)}
        open={createModal}
      />
      {selected && (
        <HotelForm
          onOk={(form: HotelFormType) => {
            setEditModal(false);
            editHotel(form, selected.id);
          }}
          onCancel={() => setEditModal(false)}
          open={editModal}
          values={{
            name: selected.name,
            category: selected.category,
            touristPlaceId: selected.touristPlaceId,
            image: selected.image,
          }}
        />
      )}
      {selected && (
        <ShowHotel
          open={showModal}
          onOk={() => {
            setShowModal(false);
          }}
          hotel={selected}
        />
      )}
    </>
  );
};

export default HotelApp;
