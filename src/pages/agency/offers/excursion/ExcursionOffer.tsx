import { Button, Col, Row, Tag, Tooltip, Typography, message } from "antd";
import { useContext, useRef, useState } from "react";
import Title from "antd/es/typography/Title";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { FilterValue } from "antd/es/table/interface";
import ExcursionOfferForm from "./ExcursionOfferForm";
import {
  ExcursionOfferFormType,
  ExcursionOfferType,
} from "../../../../types/offers";
import ShowExcursionOffer from "../../../show/offers/ShowExcursionOffer";
import TableEntities, {
  TableEntitiesRef,
} from "../../../../common/TableEntities";
import dayjs from "dayjs";
import { excursionOffer } from "../../../../api/offers";
import { Filter } from "odata-query";
import { UserContext } from "../../../../context/UserProvider";
import { UserAgencyContext } from "../../../../types/auth";
import { getExcursionFacility } from "../../../../common/offers/functions";

const ExcursionOffer = () => {
  const { get, create, edit, remove } = excursionOffer();
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useContext(UserContext);

  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);

  const [selected, setSelected] = useState<ExcursionOfferType>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const tableRef = useRef<TableEntitiesRef>({
    reload: () => {},
    reset: () => {},
  });

  const load = async (
    _: Record<string, FilterValue | null>,
    search: string,
    setDataValue: (data: ExcursionOfferType[]) => void
  ) => {
    setLoading(true);

    const searchFilter: Filter = {
      and: [
        { excursion: { name: { contains: search } } },
        {
          agencyId: {
            eq: { type: "guid", value: (user as UserAgencyContext).agencyId },
          },
        },
      ],
    };

    const response = await get({
      expand: {
        image: {
          select: ["id", "name", "url"],
        },
        excursion: {
          select: ["name"],
          expand: {
            image: {
              select: ["id", "name", "url"],
            },
            places: {
              select: ["id", "name"],
            },
            activities: {
              select: ["id", "name"],
            },
            hotels: {
              select: ["id", "name"],
            },
          },
        },
      },

      filter: searchFilter,
    });

    console.log(response.value);

    if (response.ok) {
      const data = response.value || [];
      setDataValue(data);
    } else {
      message.error(response.message);
    }
    setLoading(false);
  };

  const createexcursionOffer = async (form: ExcursionOfferFormType) => {
    setLoading(true);
    const response = await create(form);

    if (response.ok) {
      message.success("Excursion Offer created");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  const editexcursionOffer = async (
    form: ExcursionOfferFormType,
    id: string
  ) => {
    setLoading(true);
    const response = await edit(form, id);

    if (response.ok) {
      message.success("Excursion Offer edited");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  const deleteexcursionOffer = async (id: string) => {
    setLoading(true);
    const response = await remove(id);

    if (response.ok) {
      message.success("Excursion Offer deleted");
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
              <Title>Excursion Offers</Title>
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
              title="Excursion Offers"
              loading={loading}
              columns={[
                {
                  title: "Name",
                  key: "name",
                  render: (v: ExcursionOfferType) => <>{v.name}</>,
                },
                {
                  title: "Excursion",
                  key: "excursion",
                  render: (v: ExcursionOfferType) => <>{v.excursion.name} </>,
                },
                {
                  title: "Type",
                  key: "excursion",
                  render: (v: ExcursionOfferType) => (
                    <>
                      {v.excursion.hotels.length !== 0 ? (
                        <Tag color="cyan">Over Night Excursion</Tag>
                      ) : (
                        <Tag color="green">Excursion</Tag>
                      )}{" "}
                    </>
                  ),
                },
                {
                  title: "Availability",
                  key: "availability",
                  render: (v: ExcursionOfferType) => <>{v.availability}</>,
                },
                {
                  title: "Description",
                  key: "description",
                  render: (v: ExcursionOfferType) => <>{v.description}</>,
                },
                {
                  title: "Price",
                  key: "price",
                  render: (v: ExcursionOfferType) => (
                    <>$ {v.price.toFixed(2)}</>
                  ),
                },
                {
                  title: "Initial Date",
                  key: "startDate",
                  render: (v: ExcursionOfferType) => (
                    <>{dayjs(v.startDate).format("DD/MM/YYYY")}</>
                  ),
                },
                {
                  title: "Final Date",
                  key: "endDate",
                  render: (v: ExcursionOfferType) => (
                    <>{dayjs(v.endDate).format("DD/MM/YYYY")}</>
                  ),
                },
                {
                  title: "Facilities",
                  key: "facilities",
                  render: (v: ExcursionOfferType) => (
                    <>
                      <Row>
                        {v.facilities.map((f, idx) => (
                          <Tag key={idx} color="blue">
                            {getExcursionFacility(f)}
                          </Tag>
                        ))}
                      </Row>
                    </>
                  ),
                },

                {
                  title: "Actions",
                  key: "Actions",
                  render: (v: ExcursionOfferType) => (
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
                              deleteexcursionOffer(v.id);
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
      <ExcursionOfferForm
        onOk={(form: ExcursionOfferFormType) => {
          setCreateModal(false);
          createexcursionOffer(form);
        }}
        onCancel={() => setCreateModal(false)}
        open={createModal}
      />
      {selected && (
        <ExcursionOfferForm
          onOk={(form: ExcursionOfferFormType) => {
            setEditModal(false);
            editexcursionOffer(form, selected.id);
          }}
          onCancel={() => setEditModal(false)}
          open={editModal}
          values={{
            name: selected.name,
            excursionId: selected.excursionId,
            availability: selected.availability,
            description: selected.description,
            price: selected.price,
            startDate: dayjs(selected.startDate),
            endDate: dayjs(selected.endDate),
            facilities: selected.facilities,
            image: selected.image,
          }}
        />
      )}
      {selected && (
        <ShowExcursionOffer
          open={showModal}
          onOk={() => {
            setShowModal(false);
          }}
          excursionOffer={selected}
        />
      )}
    </>
  );
};

export default ExcursionOffer;
