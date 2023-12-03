import { useEffect, useState } from "react";
import { ReserveOnline, ReserveTicket } from "../../../types/reserves";
import { reserveOnline, reserveTicket } from "../../../api/reserves";
import { Col, Row, Tag, Typography, message } from "antd";
import TableEntities from "../../../common/TableEntities";
import { FilterItem } from "../../../common/FilterSearch";
import { Filter } from "odata-query";
import { city } from "../../../api/services";
import { City } from "../../../types/services";

const ReservesAgency = () => {
  const [loadingTicket, setLoadingTicket] = useState<boolean>(false);
  const [loadingOnline, setLoadingOnline] = useState<boolean>(false);

  const [ticket, setTicket] = useState<number[]>([]);
  const [online, setOnline] = useState<number[]>([]);

  const [cities, setCities] = useState<City[]>([]);

  const { get: getTicket } = reserveTicket();
  const { get: getOnline } = reserveOnline();
  const { get: getCities } = city();

  const loadCities = async () => {
    setLoadingTicket(true);
    const result = await getCities({ select: ["id", "name", "country"] });

    if (result.ok) setCities(result.value!);
    else message.error(result.message);

    setLoadingTicket(false);
  };

  useEffect(() => {
    loadCities();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filterTypeReservation: FilterItem = {
    options: [
      { key: "0", value: "0", label: "Single Reservation" },
      { key: "1", value: "1", label: "Set Reservation" },
    ],
    name: "Reservation type",
    key: "typeReservation",
    styles: { width: "160px" },
  };

  const cityFilter: FilterItem = {
    name: "City",
    options: cities.map((p, idx) => ({
      key: idx,
      label: `${p.name}, ${p.country}`,
      value: p.id,
    })),
    key: "city",
    search: true,
    styles: { width: "150px" },
  };

  const buildFilter = (filter: Record<string, string>): Filter => {
    const f: Filter[] = [];

    if (filter?.typeReservation === "0") f.push({ cant: { eq: 1 } });
    if (filter?.typeReservation === "1") f.push({ cant: { ne: 1 } });

    if (filter?.city) {
      const x = { cityId: { eq: { type: "guid", value: filter.city } } };

      f.push({
        package: {
          or: [
            {
              hotelOffers: {
                any: { hotel: { touristPlace: x } },
              },
            },
            {
              flightOffers: {
                any: {
                  flight: {
                    destinationId: { eq: { type: "guid", value: filter.city } },
                  },
                },
              },
            },
            {
              excursionOffers: {
                any: {
                  excursion: { places: { any: x } },
                },
              },
            },
          ],
        },
      });
    }

    return { and: f };
  };

  const loadTicket = async (
    filter: Record<string, string>,
    search: string,
    setDataValue: (data: ReserveTicket[]) => void
  ) => {
    setLoadingTicket(true);

    const filterSearch = { package: { name: { contains: search } } };
    const finalFilter = { and: [filterSearch, buildFilter(filter)] };

    const response = await getTicket({
      select: ["id", "cant"],
      expand: {
        user: { select: ["name", "email"] },
        payment: {
          select: ["price"],
          expand: {
            userIdentity: {
              select: ["name"],
            },
          },
        },
        package: {
          select: ["name", "isSingleOffer"],
        },
      },
      filter: finalFilter,
    });

    if (response.ok) {
      setDataValue(response.value!);
      setTicket(response.value!.map((x) => x.payment.price));
    } else message.error(response.message);

    setLoadingTicket(false);
  };

  const loadOnline = async (
    filter: Record<string, string>,
    search: string,
    setDataValue: (data: ReserveOnline[]) => void
  ) => {
    setLoadingOnline(true);

    const filterSearch = { package: { name: { contains: search } } };
    const finalFilter = { and: [filterSearch, buildFilter(filter)] };

    const response = await getOnline({
      select: ["id", "cant"],
      expand: {
        user: { select: ["name", "email"] },
        payment: {
          select: ["price", "creditCard"],
        },
        package: {
          select: ["name", "isSingleOffer"],
        },
      },
      filter: finalFilter,
    });

    if (response.ok) {
      setDataValue(response.value!);
      setOnline(response.value!.map((x) => x.payment.price));
    } else message.error(response.message);

    setLoadingOnline(false);
  };

  const footerTicket = () => (
    <Row gutter={10}>
      <Col>
        <Typography.Title
          level={5}
        >{`Cant: ${ticket.length}`}</Typography.Title>
      </Col>
      <Col>
        <Typography.Title level={5}>{`Total: $ ${ticket
          .reduce((acc, current) => acc + current, 0)
          .toFixed(2)}`}</Typography.Title>
      </Col>
    </Row>
  );

  const footerOnline = () => (
    <Row gutter={10}>
      <Col>
        <Typography.Title
          level={5}
        >{`Cant: ${online.length}`}</Typography.Title>
      </Col>
      <Col>
        <Typography.Title level={5}>{`Total: $ ${online
          .reduce((acc, current) => acc + current, 0)
          .toFixed(2)}`}</Typography.Title>
      </Col>
    </Row>
  );

  return (
    <>
      <div className="m-5">
        <Row className="app-header">
          <Col>
            <Typography>
              <Typography.Title>Reserves</Typography.Title>
            </Typography>
          </Col>
        </Row>
        <Row className="content-center m-10">
          <Col span={24}>
            <TableEntities
              footer={footerTicket}
              filters={[filterTypeReservation, cityFilter]}
              loading={loadingTicket}
              title="Reserves Ticket"
              load={loadTicket}
              columns={[
                {
                  title: "Package",
                  key: "package",
                  render: (v: ReserveTicket) => <>{v.package.name}</>,
                },
                {
                  title: "Price",
                  key: "price",
                  render: (v: ReserveTicket) => (
                    <>{`$ ${v.payment.price.toFixed(2)}`}</>
                  ),
                },
                {
                  title: "Type",
                  key: "type",
                  render: (v: ReserveTicket) => (
                    <>
                      {v.package.isSingleOffer ? (
                        <Tag color="blue">Offer</Tag>
                      ) : (
                        <Tag color="green">Package</Tag>
                      )}
                    </>
                  ),
                },
                {
                  title: "Tourist",
                  key: "tourist",
                  render: (v: ReserveTicket) => (
                    <>{v.payment.userIdentity.name}</>
                  ),
                },
                {
                  title: "User agency",
                  key: "userAgency",
                  render: (v: ReserveTicket) => <>{v.user.name}</>,
                },
                {
                  title: "User agency email",
                  key: "email",
                  render: (v: ReserveTicket) => <>{v.user.email}</>,
                },
                {
                  title: "Cant",
                  key: "cant",
                  render: (v: ReserveTicket) => <>{v.cant}</>,
                },
              ]}
            />
          </Col>
        </Row>
        <Row className="content-center m-10">
          <Col span={24}>
            <TableEntities
              footer={footerOnline}
              filters={[filterTypeReservation, cityFilter]}
              loading={loadingOnline}
              title="Reserves Online"
              load={loadOnline}
              columns={[
                {
                  title: "Package",
                  key: "package",
                  render: (v: ReserveOnline) => <>{v.package.name}</>,
                },
                {
                  title: "Price",
                  key: "price",
                  render: (v: ReserveOnline) => (
                    <>{`$ ${v.payment.price.toFixed(2)}`}</>
                  ),
                },
                {
                  title: "Type",
                  key: "type",
                  render: (v: ReserveOnline) => (
                    <>
                      {v.package.isSingleOffer ? (
                        <Tag color="blue">Offer</Tag>
                      ) : (
                        <Tag color="green">Package</Tag>
                      )}
                    </>
                  ),
                },
                {
                  title: "Tourist",
                  key: "tourist",
                  render: (v: ReserveOnline) => <>{v.user.name}</>,
                },
                {
                  title: "Tourist email",
                  key: "email",
                  render: (v: ReserveOnline) => <>{v.user.email}</>,
                },
                {
                  title: "Credit card",
                  key: "creditCard",
                  render: (v: ReserveOnline) => <>{v.payment.creditCard}</>,
                },
                {
                  title: "Cant",
                  key: "cant",
                  render: (v: ReserveOnline) => <>{v.cant}</>,
                },
              ]}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ReservesAgency;
