import { message, Row, Col, Typography, Tag } from "antd";
import { Filter } from "odata-query";
import { useState, useEffect } from "react";
import { reserveOnline } from "../../api/reserves";
import { city } from "../../api/services";
import { FilterItem } from "../../common/FilterSearch";
import TableEntities from "../../common/TableEntities";
import { ReserveOnline } from "../../types/reserves";
import { City } from "../../types/services";
import { endDate, startDate } from "../../common/packages/functions";
import dayjs from "dayjs";

const ReservesTourist = () => {
  const [loadingOnline, setLoadingOnline] = useState<boolean>(false);

  const [online, setOnline] = useState<number[]>([]);

  const [cities, setCities] = useState<City[]>([]);

  const { get: getOnline } = reserveOnline();
  const { get: getCities } = city();

  const loadCities = async () => {
    const result = await getCities({ select: ["id", "name", "country"] });

    if (result.ok) setCities(result.value!);
    else message.error(result.message);
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
        payment: {
          select: ["price"],
        },
        package: {
          select: ["name", "isSingleOffer"],
          expand: ["excursionOffers", "flightOffers", "hotelOffers"],
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
                  title: "Start Date",
                  key: "startDate",
                  render: (v: ReserveOnline) => (
                    <>
                      {dayjs(startDate(v.package)).format("YYYY-MM-DD HH:mm")}
                    </>
                  ),
                },
                {
                  title: "End Date",
                  key: "endDate",
                  render: (v: ReserveOnline) => (
                    <>{dayjs(endDate(v.package)).format("YYYY-MM-DD HH:mm")}</>
                  ),
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

export default ReservesTourist;
