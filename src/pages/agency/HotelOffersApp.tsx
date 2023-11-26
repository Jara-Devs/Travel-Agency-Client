import { useRef, useState } from "react";
import { hotelOffer } from "../../api/services";
import { HotelOffer, HotelOfferFormType } from "../../types/offers";
import TableEntities, { TableEntitiesRef } from "../../common/TableEntities";
import { FilterValue } from "antd/es/table/interface";
import { Filter } from "odata-query";
import { Button, Col, Row, Tooltip, Typography, message } from "antd";
import Title from "antd/es/typography/Title";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import HotelOfferForm from "./HotelOfferForm";
import { getCategory } from "../../common/functions";
import ShowHotelOffer from "../show/ShowHotelOffer";
import dayjs from "dayjs";

const HotelOffers = () => {
  const { get, create, edit, remove } = hotelOffer();
  const [loading, setLoading] = useState<boolean>(false);

  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);

  const [selected, setSelected] = useState<HotelOffer>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const tableRef = useRef<TableEntitiesRef>({
    reload: () => {},
    reset: () => {},
  });

  const load = async (
    _: Record<string, FilterValue | null>,
    search: string,

    setDataValue: (data: HotelOffer[]) => void
  ) => {
    setLoading(true);

    const searchFilter: Filter = { Name: { contains: search } };

    const response = await get({
      select: [
        "id",
        "name",
        "startDate",
        "endDate",
        "availability",
        "description",
        "price",
      ],
      expand: {
        image: { select: ["id", "name", "url"] },
        hotel: {
          select: ["id", "category", "name", "touristPlace"],
          expand: { image: { select: ["id", "name", "url"] } },
        },
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

  const createHotelOffer = async (form: HotelOfferFormType) => {
    setLoading(true);
    const response = await create(form);

    if (response.ok) {
      message.success("Hotel offer created");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  const editHotelOffer = async (form: HotelOfferFormType, id: number) => {
    setLoading(true);
    const response = await edit(form, id);

    if (response.ok) {
      message.success("Hotel offer edited");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  const deleteHotelOffer = async (id: number) => {
    setLoading(true);
    const response = await remove(id);

    if (response.ok) {
      message.success("Hotel offer deleted");
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
              <Title>Hotel Offers</Title>
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
              title="Hotel Offers"
              loading={loading}
              columns={[
                {
                  title: "Name",
                  key: "name",
                  render: (v: HotelOffer) => <>{v.name}</>,
                },
                {
                  title: "Hotel",
                  key: "hotel",
                  render: (v: HotelOffer) => <>{`${v.hotel.name} `}</>,
                },
                {
                  title: "Category",
                  key: "category",
                  render: (v: HotelOffer) => getCategory(v.hotel.category),
                },

                {
                  title: "StartDate",
                  key: "startDate",
                  render: (v: HotelOffer) =>
                    new Date(v.startDate).toDateString(),
                },
                {
                  title: "EndDate",
                  key: "endDate",
                  render: (v: HotelOffer) => new Date(v.endDate).toDateString(),
                },
                {
                  title: "Price",
                  key: "price",
                  render: (v: HotelOffer) => <>${v.price}</>,
                },

                {
                  title: "Actions",
                  key: "Actions",
                  render: (v: HotelOffer) => (
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
                              deleteHotelOffer(v.id);
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
      <HotelOfferForm
        onOk={(form: HotelOfferFormType) => {
          setCreateModal(false);
          console.log(form.startDate);

          createHotelOffer(form);
        }}
        onCancel={() => setCreateModal(false)}
        open={createModal}
      />
      {selected && (
        <HotelOfferForm
          onOk={(form: HotelOfferFormType) => {
            setEditModal(false);
            editHotelOffer(form, selected.id);
          }}
          onCancel={() => setEditModal(false)}
          open={editModal}
          values={{
            name: selected.name,
            description: selected.description,
            price: selected.price,
            image: selected.image,
            startDate: dayjs(selected.startDate),
            endDate: dayjs(selected.endDate),
            availability: selected.availability,
            hotelId: selected.hotel.id,
            facilities: selected.facilities,
          }}
        />
      )}
      {selected && (
        <ShowHotelOffer
          open={showModal}
          onOk={() => {
            setShowModal(false);
          }}
          hoteloffer={selected}
        />
      )}
    </>
  );
};

export default HotelOffers;
