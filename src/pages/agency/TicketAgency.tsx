import { Col, message, Row, Tag, Tooltip, Typography } from "antd";
import { FilterValue } from "antd/es/table/interface";
import { Filter } from "odata-query";
import { useState, useRef, useContext } from "react";
import { EyeOutlined } from "@ant-design/icons";
import {
  endDate,
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

const TicketAgency = () => {
  const { get } = packageOffer();
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
      expand: {
        flightOffers: {
          select: [
            "id",
            "name",
            "description",
            "price",
            "type",
            "startDate",
            "endDate",
          ],
          expand: { image: { select: ["id", "name", "url"] } },
        },
        hotelOffers: {
          select: [
            "id",
            "name",
            "description",
            "price",
            "type",
            "startDate",
            "endDate",
          ],
          expand: { image: { select: ["id", "name", "url"] } },
        },
        excursionOffers: {
          select: [
            "id",
            "name",
            "description",
            "price",
            "type",
            "startDate",
            "endDate",
          ],
          expand: { image: { select: ["id", "name", "url"] } },
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
              title="Packages"
              loading={loading}
              columns={[
                {
                  title: "Name",
                  key: "name",
                  render: (v: Package) => <>{v.name}</>,
                },
                {
                  title: "Discount",
                  key: "discount",
                  render: (v: Package) => <>{`${v.discount}% `}</>,
                },
                {
                  key: "start",
                  title: "Initial Date",
                  render: (v: Package) => <>{startDate(v)}</>,
                },
                {
                  key: "end",
                  title: "Final Date",
                  render: (v: Package) => <>{endDate(v)}</>,
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
                          <EyeOutlined
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
          }}
          packageOffer={selected}
        />
      )}
    </>
  );
};

export default TicketAgency;
