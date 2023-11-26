import { Button, Col, Row, Tag, Tooltip, Typography, message } from "antd";
import { useContext, useRef, useState } from "react";
import Title from "antd/es/typography/Title";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { FilterValue } from "antd/es/table/interface";
import { Filter } from "odata-query";
import FlightOfferForm, { flightLabel } from "./FlightOfferForm";
import { FlightOfferFormType, FlightOfferType } from "../../../../types/offers";
import ShowFlightOffer from "../../../show/offers/ShowFlightOffer";
import TableEntities, {
  TableEntitiesRef,
} from "../../../../common/TableEntities";
import dayjs from "dayjs";
import { flightOffer } from "../../../../api/offers";
import { getFlightFacility } from "../../../../common/functions";
import { UserContext } from "../../../../context/UserProvider";
import { UserAgencyContext } from "../../../../types/auth";

const FlightOfferAgency = () => {
  const { get, create, edit, remove } = flightOffer();
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useContext(UserContext);

  const [createModal, setCreateModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);

  const [selected, setSelected] = useState<FlightOfferType>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const tableRef = useRef<TableEntitiesRef>({
    reload: () => {},
    reset: () => {},
  });

  const load = async (
    _: Record<string, FilterValue | null>,
    search: string,
    setDataValue: (data: FlightOfferType[]) => void
  ) => {
    setLoading(true);

    const searchFilter: Filter = { flight: { company: { contains: search } } };
    const finalFilter: Filter = {
      and: [
        searchFilter,
        { agencyId: { eq: (user as UserAgencyContext).agencyId } },
      ],
    };

    const response = await get({
      expand: {
        image: {
          select: ["id", "name", "url"],
        },
        flight: {
          select: ["company"],
          expand: {
            origin: {
              select: ["id", "name"],
            },
            destination: {
              select: ["id", "name"],
            },
          },
        },
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

  const createFlightOffer = async (form: FlightOfferFormType) => {
    setLoading(true);
    const response = await create(form);

    if (response.ok) {
      message.success("Flight Offer created");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  const editFlightOffer = async (form: FlightOfferFormType, id: string) => {
    setLoading(true);
    const response = await edit(form, id);

    if (response.ok) {
      message.success("Flight Offer edited");
      tableRef.current.reload();
    } else message.error(response.message);
    setLoading(false);
  };

  const deleteFlightOffer = async (id: string) => {
    setLoading(true);
    const response = await remove(id);

    if (response.ok) {
      message.success("Flight Offer deleted");
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
              <Title>Flights</Title>
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
              title="Flights"
              loading={loading}
              columns={[
                {
                  title: "Name",
                  key: "name",
                  render: (v: FlightOfferType) => <>{v.name}</>,
                },
                {
                  title: "Flight",
                  key: "flight",
                  render: (v: FlightOfferType) => <>{flightLabel(v.flight)} </>,
                },
                {
                  title: "Availability",
                  key: "availability",
                  render: (v: FlightOfferType) => <>{v.availability}</>,
                },
                {
                  title: "Description",
                  key: "description",
                  render: (v: FlightOfferType) => <>{v.description}</>,
                },
                {
                  title: "Price",
                  key: "price",
                  render: (v: FlightOfferType) => <>{v.price}</>,
                },
                {
                  title: "Initial Date",
                  key: "startDate",
                  render: (v: FlightOfferType) => (
                    <>{dayjs(v.startDate).format("DD/MM/YYYY")}</>
                  ),
                },
                {
                  title: "Final Date",
                  key: "endDate",
                  render: (v: FlightOfferType) => (
                    <>{dayjs(v.endDate).format("DD/MM/YYYY")}</>
                  ),
                },
                {
                  title: "Facilities",
                  key: "facilities",
                  render: (v: FlightOfferType) => (
                    <>
                      <Row>
                        {v.facilities.map((f, idx) => (
                          <Tag key={idx} color="blue">
                            {getFlightFacility(f)}
                          </Tag>
                        ))}
                      </Row>
                    </>
                  ),
                },

                {
                  title: "Actions",
                  key: "Actions",
                  render: (v: FlightOfferType) => (
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
                              deleteFlightOffer(v.id);
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
      <FlightOfferForm
        onOk={(form: FlightOfferFormType) => {
          setCreateModal(false);
          createFlightOffer(form);
        }}
        onCancel={() => setCreateModal(false)}
        open={createModal}
      />
      {selected && (
        <FlightOfferForm
          onOk={(form: FlightOfferFormType) => {
            setEditModal(false);
            editFlightOffer(form, selected.id);
          }}
          onCancel={() => setEditModal(false)}
          open={editModal}
          values={{
            name: selected.name,
            flightId: selected.flightId,
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
        <ShowFlightOffer
          open={showModal}
          onOk={() => {
            setShowModal(false);
          }}
          flightOffer={selected}
        />
      )}
    </>
  );
};

export default FlightOfferAgency;
