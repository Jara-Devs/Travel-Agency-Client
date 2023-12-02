import { Col, Row, Tooltip, message } from "antd";
import ShowEntities from "../../../common/ShowEntities";
import { useEffect, useState } from "react";
import {
  ExcursionOfferType,
  FlightOfferType,
  HotelOfferType,
} from "../../../types/offers";
import SlideCard from "../../../common/SlideCard";
import { EyeOutlined } from "@ant-design/icons";
import {
  excursionOffer,
  flightOffer,
  hotelOffer,
  packageOffer,
} from "../../../api/offers";
import ShowExcursionOffer from "../../show/offers/ShowExcursionOffer";
import { useSearchParams } from "react-router-dom";
import { Filter } from "odata-query";
import FilterSearch, { FilterItem } from "../../../common/FilterSearch";
import { buildMessage, isGuid } from "../../../common/functions";
import dayjs from "dayjs";
import { Package } from "../../../types/packages";
import ShowMiniOffer from "../../show/offers/ShowMiniOffer";
import ShowPackage from "../../show/offers/ShowPackage";
import ShowHotelOffer from "../../show/offers/ShowHotelOffer";
import ShowFlightOffer from "../../show/offers/ShowFlightOffer";
import {
  endDate,
  getPackageAvailability,
  getPackagePrice,
  startDate,
} from "../../../common/packages/functions";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DiscountOutlinedIcon from "@mui/icons-material/DiscountOutlined";
import OfferFooterImage from "../../../common/OfferFooterImage";
import ReserveOnline from "../../../common/ReserveOnline";

const PackageOffer = () => {
  const { get } = packageOffer();

  const { get: getExcursionOffer } = excursionOffer();
  const { get: getHotelOffer } = hotelOffer();
  const { get: getFlightOffer } = flightOffer();

  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<Package>();

  const [selectedHotelOffer, setSelectedHotelOffer] =
    useState<HotelOfferType>();
  const [selectedExcursionOffer, setSelectedExcursionOffer] =
    useState<ExcursionOfferType>();
  const [selectedFlightOffer, setSelectedFlightOffer] =
    useState<FlightOfferType>();
  const [data, setData] = useState<Package[]>([]);

  const [hotelOffers, setHotelOffers] = useState<HotelOfferType[]>([]);
  const [excursionOffers, setExcursionOffers] = useState<ExcursionOfferType[]>(
    []
  );
  const [flightOffers, setFlightOffers] = useState<FlightOfferType[]>([]);

  const buildFilter = (): Filter => {
    const f: Filter[] = [];

    const excursion = searchParams.get("excursionOffer");
    if (excursion && isGuid(excursion)) {
      f.push({
        excursionOffers: {
          any: { id: { eq: { type: "guid", value: excursion } } },
        },
      });
    }

    const hotel = searchParams.get("hotelOffer");
    if (hotel && isGuid(hotel)) {
      f.push({
        hotelOffers: {
          any: { id: { eq: { type: "guid", value: hotel } } },
        },
      });
    }

    const flight = searchParams.get("flightOffer");
    if (flight && isGuid(flight)) {
      f.push({
        flightOffers: {
          any: { id: { eq: { type: "guid", value: flight } } },
        },
      });
    }

    const search = searchParams.get("search");
    if (search) f.push({ name: { contains: search } });

    return { and: f };
  };

  const toDate = dayjs().toDate().valueOf();

  const load = async (filter: Filter) => {
    setLoading(true);

    const finalFilter = {
      and: [
        filter,
        {
          isSingleOffer: { eq: false },
        },
        {
          hotelOffers: {
            all: {
              startDate: {
                ge: toDate,
              },
            },
          },
          excursionOffers: {
            all: {
              startDate: {
                ge: toDate,
              },
            },
          },
          flightOffers: {
            all: {
              startDate: {
                ge: toDate,
              },
            },
          },
        },
      ],
    };

    const result = await get({
      select: ["id", "description", "name", "discount"],
      expand: {
        flightOffers: {
          select: [
            "price",
            "startDate",
            "description",
            "endDate",
            "type",
            "availability",
          ],
          expand: {
            image: { select: ["id", "name", "url"] },
            flight: {
              select: ["company", "duration"],
              expand: {
                origin: {
                  select: ["name", "description"],
                  expand: { image: { select: ["id", "name", "url"] } },
                },
                destination: {
                  select: ["name", "description"],
                  expand: { image: { select: ["id", "name", "url"] } },
                },
              },
            },
            facilities: { select: ["name"] },
            reserves: { select: ["id"] },
          },
        },
        hotelOffers: {
          select: [
            "price",
            "startDate",
            "description",
            "endDate",
            "type",
            "availability",
          ],
          expand: {
            image: { select: ["id", "name", "url"] },
            hotel: {
              select: ["name", "category"],
              expand: { image: { select: ["id", "name", "url"] } },
            },
            facilities: { select: ["name"] },
            reserves: { select: ["id"] },
          },
        },
        excursionOffers: {
          select: [
            "price",
            "startDate",
            "description",
            "endDate",
            "type",
            "availability",
          ],
          expand: {
            image: { select: ["id", "name", "url"] },
            excursion: {
              select: ["name"],
              expand: {
                hotels: { select: ["id"] },
                image: { select: ["id", "name", "url"] },
              },
            },
            facilities: { select: ["name"] },
            reserves: { select: ["id"] },
          },
        },
      },
      filter: finalFilter,
    });

    if (result.ok)
      setData(
        (result.value || []).filter((x) => getPackageAvailability(x) > 0)
      );
    else message.error(result.message);

    setLoading(false);
  };

  const loadOffers = async () => {
    setLoading(true);

    const resultExcursion = await getExcursionOffer({
      select: ["id", "name"],
      filter: { startDate: { ge: toDate } },
    });

    const resultHotel = await getHotelOffer({
      select: ["id", "name"],
      filter: { startDate: { ge: toDate } },
    });

    const resultFlight = await getFlightOffer({
      select: ["id", "name"],
      filter: { startDate: { ge: toDate } },
    });

    if (resultExcursion.ok && resultFlight.ok && resultHotel.ok) {
      setExcursionOffers(resultExcursion.value!);
      setHotelOffers(resultHotel.value!);
      setFlightOffers(resultFlight.value!);
    } else
      message.error(buildMessage([resultExcursion, resultFlight, resultHotel]));

    setLoading(false);
  };

  useEffect(() => {
    loadOffers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load(buildFilter());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filterExcursionOffer: FilterItem = {
    options: excursionOffers.map((x) => ({
      label: x.name,
      value: x.id,
    })),
    name: "Excursion Offer",
    key: "excursionOffer",
    search: true,
    styles: { width: "150px" },
  };

  const filterHotelOffer: FilterItem = {
    options: hotelOffers.map((x) => ({
      label: x.name,
      value: x.id,
    })),
    name: "Hotel Offer",
    key: "hotelOffer",
    search: true,
    styles: { width: "150px" },
  };

  const filterFlightOffer: FilterItem = {
    options: flightOffers.map((x) => ({
      label: x.name,
      value: x.id,
    })),
    name: "Flight Offer",
    key: "flightOffer",
    search: true,
    styles: { width: "150px" },
  };

  const getOffers = (x: Package) => [
    ...x.hotelOffers,
    ...x.excursionOffers,
    ...x.flightOffers,
  ];

  return (
    <div className="m-5">
      <Row>
        <Col span={24}>
          <FilterSearch
            filters={[
              filterExcursionOffer,
              filterFlightOffer,
              filterHotelOffer,
            ]}
            loading={loading}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ShowEntities
            loading={loading}
            data={data}
            content={(value: Package) => {
              const hotelOffers = value.hotelOffers.map((x) => (
                <div onClick={() => setSelectedHotelOffer(x)}>
                  <ShowMiniOffer offer={x} />
                </div>
              ));
              const excursionOffers = value.excursionOffers.map((x) => (
                <div onClick={() => setSelectedExcursionOffer(x)}>
                  <ShowMiniOffer offer={x} />
                </div>
              ));
              const flightOffers = value.flightOffers.map((x) => (
                <div onClick={() => setSelectedFlightOffer(x)}>
                  <ShowMiniOffer offer={x} />
                </div>
              ));

              return (
                <SlideCard
                  data={[...hotelOffers, ...excursionOffers, ...flightOffers]}
                  size="4"
                />
              );
            }}
            actions={(value: Package) => [
              <Tooltip title="Show Package">
                <EyeOutlined
                  style={{ fontSize: "20px" }}
                  onClick={() => setSelected(value)}
                />
              </Tooltip>,
              <Tooltip title="Availability">
                <LocalOfferIcon
                  style={{ paddingTop: "3px" }}
                  fontSize="small"
                />{" "}
                {getPackageAvailability(value)}
              </Tooltip>,

              <Tooltip title="Discount">
                <DiscountOutlinedIcon
                  style={{ paddingTop: "3px" }}
                  fontSize="small"
                />{" "}
                {value.discount} %
              </Tooltip>,
            ]}
            convert={(value: Package) => ({
              title: value.name,
              image: getOffers(value)[0].image,
              description: value.description,
              footerImage: (
                <OfferFooterImage
                  reserveBtn={
                    <ReserveOnline
                      reload={() => load(buildFilter())}
                      isSingleOffer={false}
                      loading={loading}
                      setLoading={setLoading}
                      id={value.id}
                      availability={getPackageAvailability(value)}
                    />
                  }
                  price={getPackagePrice(value)}
                  startDate={startDate(value)}
                  endDate={endDate(value)}
                />
              ),
            })}
          />
        </Col>
      </Row>

      {selected && (
        <ShowPackage
          packageOffer={selected}
          open={true}
          onOk={() => setSelected(undefined)}
        />
      )}
      {selectedHotelOffer && (
        <ShowHotelOffer
          hoteloffer={selectedHotelOffer}
          onOk={() => setSelectedHotelOffer(undefined)}
          open={true}
        />
      )}
      {selectedExcursionOffer && (
        <ShowExcursionOffer
          excursionOffer={selectedExcursionOffer}
          onOk={() => setSelectedExcursionOffer(undefined)}
          open={true}
        />
      )}
      {selectedFlightOffer && (
        <ShowFlightOffer
          flightOffer={selectedFlightOffer}
          onOk={() => setSelectedFlightOffer(undefined)}
          open={true}
        />
      )}
    </div>
  );
};

export default PackageOffer;
