import { useContext, useRef, useState } from "react";
import { FilterValue } from "antd/es/table/interface";
import { Filter } from "odata-query";
import { Button, Col, Row, Tooltip, Typography, message, Tag } from "antd";
import Title from "antd/es/typography/Title";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { hotelOffer } from "../../../../api/offers";
import TableEntities, {
  TableEntitiesRef,
} from "../../../../common/TableEntities";
import HotelOfferForm from "./HotelOfferForm";
import ShowHotelOffer from "../../../show/offers/ShowHotelOffer";
import { UserAgencyContext } from "../../../../types/auth";
import { UserContext } from "../../../../context/UserProvider";
import { HotelOfferType, HotelOfferFormType } from "../../../../types/offers";
import { HotelCategoryComp } from "../../../../common/service/HotelCategory";

const HotelOfferAgency = () => {
  const { get, create, edit, remove } = hotelOffer();
  const [loading, setLoading] = useState<boolean>(false);

  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);

  const [selected, setSelected] = useState<HotelOfferType>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { user } = useContext(UserContext);

  const tableRef = useRef<TableEntitiesRef>({
    reload: () => {},
    reset: () => {},
  });

  const load = async (
    _: Record<string, FilterValue | null>,
    search: string,

    setDataValue: (data: HotelOfferType[]) => void
  ) => {
    setLoading(true);

    const searchFilter: Filter = { name: { contains: search } };
    const finalFilter: Filter = {
      and: [
        searchFilter,
        {
          agencyId: {
            eq: { type: "guid", value: (user as UserAgencyContext).agencyId },
          },
        },
      ],
    };
    const response = await get({
      select: [
        "id",
        "name",
        "description",
        "price",
        "image",
        "startDate",
        "endDate",
        "availability",
      ],
      expand: {
        image: { select: ["id", "name", "url"] },
        hotel: {
          select: ["id", "category", "name", "touristPlace"],
          expand: { image: { select: ["id", "name", "url"] } },
        },
        facilities: { select: ["id", "name"] },
      },
      filter: finalFilter,
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

  const editHotelOffer = async (form: HotelOfferFormType, id: string) => {
    setLoading(true);
    const response = await edit(form, id);

    if (response.ok) {
      message.success("Hotel offer edited");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  const deleteHotelOffer = async (id: string) => {
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
                  render: (v: HotelOfferType) => <>{v.name}</>,
                },
                {
                  title: "Hotel",
                  key: "hotel",
                  render: (v: HotelOfferType) => <>{`${v.hotel.name} `}</>,
                },
                {
                  title: "Category",
                  key: "category",
                  render: (v: HotelOfferType) => (
                    <HotelCategoryComp x={v.hotel.category} />
                  ),
                },
                {
                  title: "Cant",
                  key: "availability",
                  render: (v: HotelOfferType) => <>{v.availability}</>,
                },
                {
                  title: "Description",
                  key: "description",
                  render: (v: HotelOfferType) => <>{v.description}</>,
                },
                {
                  title: "Initial Date",
                  key: "startDate",
                  render: (v: HotelOfferType) => (
                    <>{dayjs(v.startDate).format("DD/MM/YYYY")}</>
                  ),
                },
                {
                  title: "Final Date",
                  key: "endDate",
                  render: (v: HotelOfferType) => (
                    <>{dayjs(v.endDate).format("DD/MM/YYYY")}</>
                  ),
                },
                {
                  title: "Price",
                  key: "price",
                  render: (v: HotelOfferType) => <>$ {v.price.toFixed(2)}</>,
                },
                {
                  title: "Facilities",
                  key: "facilities",
                  render: (v: HotelOfferType) => (
                    <>
                      <Row>
                        {v.facilities.map((f, idx) => (
                          <Tag key={idx} color="blue">
                            {f.name}
                          </Tag>
                        ))}
                      </Row>
                    </>
                  ),
                },

                {
                  title: "Actions",
                  key: "Actions",
                  render: (v: HotelOfferType) => (
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
            facilities: selected.facilities.map((f) => f.id),
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

export default HotelOfferAgency;
