import { Col, message, Row, Tag, Tooltip, Typography } from "antd";
import { FilterValue } from "antd/es/table/interface";
import { Filter } from "odata-query";
import { useState, useRef, useContext } from "react";
import { EyeOutlined } from "@ant-design/icons";
import {
  endDate,
  getPackageAvailability,
  getPackagePrice,
  startDate,
} from "../../common/packages/functions";
import { packageOffer } from "../../api/offers";
import TableEntities, { TableEntitiesRef } from "../../common/TableEntities";
import { UserContext } from "../../context/UserProvider";
import { UserAgencyContext } from "../../types/auth";
import { Package } from "../../types/packages";
import ShowPackage from "../show/offers/ShowPackage";
import dayjs from "dayjs";
import ReserveForm from "../reserve/ReserveForm";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { reserveTicket } from "../../api/reserves";
import { ReserveFormType } from "../../types/reserves";

const TicketAgency = () => {
  const { get } = packageOffer();
  const { create } = reserveTicket();
  const [loading, setLoading] = useState<boolean>(false);

  const [reserveModal, setReserveModal] = useState<boolean>(false);

  const [selected, setSelected] = useState<Package>();
  const [showModal, setShowModal] = useState<boolean>(false);

  const tableRef = useRef<TableEntitiesRef>({
    reload: () => {},
    reset: () => {},
  });
  const { user } = useContext(UserContext);
  const toDate = dayjs().toDate().valueOf();

  const reserve = async (form: ReserveFormType) => {
    setLoading(true);

    const response = await create(form);

    if (response.ok) {
      message.success("Reserve created");
      tableRef.current.reload();
    } else message.error(response.message);

    setLoading(false);
  };

  const load = async (
    _: Record<string, FilterValue | null>,
    search: string,
    setDataValue: (data: Package[]) => void
  ) => {
    setLoading(true);
    const searchFilter: Filter = { Name: { contains: search } };
    const finalFilter: Filter = {
      and: [
        searchFilter,
        {
          flightOffers: {
            all: {
              agencyId: {
                eq: {
                  type: "guid",
                  value: (user as UserAgencyContext).agencyId,
                },
              },
              startDate: {
                ge: toDate,
              },
            },
          },
        },
        {
          excursionOffers: {
            all: {
              agencyId: {
                eq: {
                  type: "guid",
                  value: (user as UserAgencyContext).agencyId,
                },
              },
              startDate: {
                ge: toDate,
              },
            },
          },
        },
        {
          hotelOffers: {
            all: {
              agencyId: {
                eq: {
                  type: "guid",
                  value: (user as UserAgencyContext).agencyId,
                },
              },
              startDate: {
                ge: toDate,
              },
            },
          },
        },
      ],
    };

    const response = await get({
      select: ["id", "description", "name", "discount", "isSingleOffer"],
      expand: {
        flightOffers: {
          select: [
            "id",
            "name",
            "description",
            "availability",
            "price",
            "type",
            "startDate",
            "endDate",
          ],
          expand: {
            image: { select: ["id", "name", "url"] },
            reserves: { select: ["cant"] },
          },
        },
        hotelOffers: {
          select: [
            "id",
            "name",
            "description",
            "availability",
            "price",
            "type",
            "startDate",
            "endDate",
          ],
          expand: {
            image: { select: ["id", "name", "url"] },
            reserves: { select: ["cant"] },
          },
        },
        excursionOffers: {
          select: [
            "id",
            "name",
            "description",
            "availability",
            "price",
            "type",
            "startDate",
            "endDate",
          ],
          expand: {
            image: { select: ["id", "name", "url"] },
            reserves: { select: ["cant"] },
          },
        },
      },
      filter: finalFilter,
    });

    if (response.ok) {
      const data = response.value || [];
      console.log(data);

      setDataValue(data.filter((x) => getPackageAvailability(x) > 0));
    } else {
      message.error(response.message);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="m-5">
        <Row justify="space-between" className="app-header">
          <Col>
            <Typography>
              <Typography.Title>Ticket</Typography.Title>
            </Typography>
          </Col>
        </Row>
        <Row className="content-center m-10">
          <Col span={24}>
            <TableEntities
              ref={tableRef}
              title="Packages - Offers"
              loading={loading}
              columns={[
                {
                  title: "Name",
                  key: "name",
                  render: (v: Package) => <>{v.name}</>,
                },
                {
                  title: "Description",
                  key: "description",
                  render: (v: Package) => <>{v.description}</>,
                },
                {
                  title: "Discount",
                  key: "discount",
                  render: (v: Package) => <>{`${v.discount}% `}</>,
                },
                {
                  title: "Availability",
                  key: "availability",
                  render: (v: Package) => <>{getPackageAvailability(v)}</>,
                },
                {
                  title: "Type",
                  key: "type",
                  render: (v: Package) => (
                    <>
                      {v.isSingleOffer ? (
                        <Tag color="blue">Package</Tag>
                      ) : (
                        <Tag color="green">Offer</Tag>
                      )}
                    </>
                  ),
                },
                {
                  key: "start",
                  title: "Initial Date",
                  render: (v: Package) => (
                    <>{dayjs(startDate(v)).format("DD/MM/YYYY")}</>
                  ),
                },
                {
                  key: "end",
                  title: "Final Date",
                  render: (v: Package) => (
                    <>{dayjs(endDate(v)).format("DD/MM/YYYY")}</>
                  ),
                },
                {
                  title: "Hotel Offers",
                  key: "hotelOffers",
                  render: (v: Package) => (
                    <>
                      <Row>
                        {v.hotelOffers.map((f, idx) => (
                          <Tag key={idx} color="blue">
                            {f.name}
                          </Tag>
                        ))}
                      </Row>
                    </>
                  ),
                },
                {
                  title: "Flight Offers",
                  key: "flightOffers",
                  render: (v: Package) => (
                    <>
                      <Row>
                        {v.flightOffers.map((f, idx) => (
                          <Tag key={idx} color="green">
                            {f.name}
                          </Tag>
                        ))}
                      </Row>
                    </>
                  ),
                },
                {
                  title: "Excursion Offers",
                  key: "excursionOffers",
                  render: (v: Package) => (
                    <>
                      <Row>
                        {v.excursionOffers.map((f, idx) => (
                          <Tag key={idx} color="yellow">
                            {f.name}
                          </Tag>
                        ))}
                      </Row>
                    </>
                  ),
                },

                {
                  title: "Price",
                  key: "price",
                  render: (v: Package) => <>{`$ ${getPackagePrice(v)}`}</>,
                },

                {
                  title: "Actions",
                  key: "Actions",
                  render: (v: Package) => (
                    <Row gutter={5}>
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
                        <Tooltip title="Reserve">
                          <ShoppingCartOutlinedIcon
                            style={{ fontSize: "14px", cursor: "pointer" }}
                            onClick={() => {
                              setSelected(v);
                              setReserveModal(true);
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

      {selected && (
        <ShowPackage
          open={showModal}
          onOk={() => {
            setShowModal(false);
            setSelected(undefined);
          }}
          packageOffer={selected}
        />
      )}
      {selected && (
        <ReserveForm
          isOnline={false}
          availability={getPackageAvailability(selected)}
          open={reserveModal}
          onOk={(form) => {
            let p = selected;
            setReserveModal(false);
            setSelected(undefined);
            reserve({
              userIdentities: form.userIdentities,
              id: p.id,
              isSingleOffer: false,
              userIdentity: form.userIdentities[0],
            });
          }}
          onCancel={() => {
            setReserveModal(false);
            setSelected(undefined);
          }}
        />
      )}
    </>
  );
};

export default TicketAgency;
