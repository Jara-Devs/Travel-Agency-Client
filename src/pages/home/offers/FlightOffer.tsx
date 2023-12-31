import { Col, Row, Tooltip, message } from "antd";
import ShowEntities from "../../../common/ShowEntities";
import { useEffect, useState } from "react";
import { FlightOfferType, ReactionState } from "../../../types/offers";
import SlideCard from "../../../common/SlideCard";
import ShowFlight, { ShowMiniFlight } from "../../show/services/ShowFlight";
import { EyeOutlined, LikeFilled, DislikeFilled } from "@ant-design/icons";
import { flightOffer } from "../../../api/offers";
import ShowFlightOffer from "../../show/offers/ShowFlightOffer";
import { Flight } from "../../../types/services";
import { useSearchParams } from "react-router-dom";
import { Filter } from "odata-query";
import { flight } from "../../../api/services";
import FilterSearch, { FilterItem } from "../../../common/FilterSearch";
import { UserContext } from "../../../context/UserProvider";
import { useContext } from "react";
import { isGuid } from "../../../common/functions";
import {
  reactionLogic,
  selectedReaction,
} from "../../../common/offers/reactions";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import dayjs from "dayjs";
import { offerAvailability } from "../../../common/offers/functions";
import ReserveOnline from "../../../common/ReserveOnline";
import OfferFooterImage from "../../../common/OfferFooterImage";

const FlightOffer = () => {
  const { get } = flightOffer();
  const { get: getFlight } = flight();

  const [searchParams] = useSearchParams();
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<FlightOfferType>();
  const [selectedFlight, setSelectedFlight] = useState<Flight>();
  const [data, setData] = useState<FlightOfferType[]>([]);

  const [flights, setFlights] = useState<Flight[]>([]);

  const buildFilter = (): Filter => {
    const f: Filter[] = [];

    const flight = searchParams.get("flight");
    if (flight && isGuid(flight)) {
      f.push({ flight: { id: { eq: { type: "guid", value: flight } } } });
    }

    const search = searchParams.get("search");
    if (search) f.push({ name: { contains: search } });

    const start = searchParams.get("start");
    const end = searchParams.get("end");

    if (start && end) {
      const a = parseInt(start);
      const b = parseInt(end);
      if (dayjs(a).isValid() && dayjs(b).isValid())
        f.push({
          and: [{ startDate: { ge: a } }, { endDate: { le: b } }],
        });
    }

    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    if (minPrice && maxPrice) {
      const a = parseInt(minPrice);
      const b = parseInt(maxPrice);
      if (a > 0 && b > 0)
        f.push({
          and: [{ price: { ge: a } }, { price: { le: b } }],
        });
    }

    return { and: f };
  };

  const reactionFunc = (
    offer: FlightOfferType,
    reactionState: ReactionState
  ) => {
    reactionLogic(
      offer,
      (offer) =>
        setData(
          data.map((x) => (x.id === offer.id ? (offer as FlightOfferType) : x))
        ),
      user,
      reactionState
    );
  };

  const load = async (filter: Filter) => {
    setLoading(true);

    const toDate = dayjs().toDate().valueOf();
    const finalFilter = { and: [filter, { startDate: { ge: toDate } }] };

    const result = await get({
      select: [
        "id",
        "availability",
        "name",
        "description",
        "startDate",
        "endDate",
        "price",
      ],
      expand: {
        image: { select: ["id", "name", "url"] },
        flight: {
          select: ["id", "company", "duration"],
          expand: {
            origin: {
              select: ["name", "country"],
              expand: { image: { select: ["id", "name", "url"] } },
            },
            destination: {
              select: ["name", "country"],
              expand: { image: { select: ["id", "name", "url"] } },
            },
          },
        },
        reactions: { select: ["reactionState", "touristId", "id"] },
        facilities: { select: ["id", "name"] },
        reserves: { select: ["cant"] },
      },
      filter: finalFilter,
    });

    if (result.ok)
      setData((result.value || []).filter((x) => offerAvailability(x) > 0));
    else message.error(result.message);

    setLoading(false);
  };

  const loadFlight = async () => {
    setLoading(true);

    const result = await getFlight({
      select: ["id", "company"],
      expand: {
        origin: {
          select: ["name"],
        },
        destination: {
          select: ["name"],
        },
      },
    });

    if (result.ok) setFlights(result.value || []);
    else message.error(result.message);

    setLoading(false);
  };

  useEffect(() => {
    loadFlight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load(buildFilter());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filterFlight: FilterItem = {
    options: flights.map((x) => ({
      label: `Company ${x.company}, From ${x.origin.name} to ${x.destination.name}`,
      value: x.id,
    })),
    name: "Flight",
    search: true,
    styles: { width: "200px" },
  };

  return (
    <div className="m-5">
      <Row>
        <Col span={24}>
          <FilterSearch
            filters={[filterFlight]}
            loading={loading}
            packageOrOffer={true}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ShowEntities
            loading={loading}
            data={data}
            content={(value: FlightOfferType) => {
              return (
                <SlideCard
                  data={[
                    <div onClick={() => setSelectedFlight(value.flight)}>
                      <ShowMiniFlight flight={value.flight} />
                    </div>,
                  ]}
                  size="4"
                />
              );
            }}
            actions={(value: FlightOfferType) => [
              <Tooltip title="Show Offer">
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
                {offerAvailability(value)}
              </Tooltip>,
              <>
                <LikeFilled
                  style={
                    selectedReaction(user, value, ReactionState.Like)
                      ? { color: "gold", fontSize: "18px" }
                      : { fontSize: "18px" }
                  }
                  onClick={() => reactionFunc(value, ReactionState.Like)}
                />{" "}
                {
                  value.reactions?.filter(
                    (x) => x.reactionState === ReactionState.Like
                  ).length
                }
              </>,
              <>
                <DislikeFilled
                  style={
                    selectedReaction(user, value, ReactionState.Dislike)
                      ? { color: "gold", fontSize: "18px" }
                      : { fontSize: "18px" }
                  }
                  onClick={() => reactionFunc(value, ReactionState.Dislike)}
                />{" "}
                {
                  value.reactions?.filter(
                    (x) => x.reactionState === ReactionState.Dislike
                  ).length
                }
              </>,
            ]}
            convert={(value: FlightOfferType) => ({
              title: value.name,
              image: value.image,
              description: value.description,
              footerImage: (
                <OfferFooterImage
                  reserveBtn={
                    <ReserveOnline
                      reload={() => load(buildFilter())}
                      isSingleOffer={true}
                      loading={loading}
                      setLoading={setLoading}
                      id={value.id}
                      availability={offerAvailability(value)}
                    />
                  }
                  price={value.price}
                  startDate={value.startDate}
                  endDate={value.endDate}
                />
              ),
            })}
          />
        </Col>
      </Row>

      {selected && (
        <ShowFlightOffer
          flightOffer={selected}
          open={true}
          onOk={() => setSelected(undefined)}
        />
      )}
      {selectedFlight && (
        <ShowFlight
          flight={selectedFlight}
          open={true}
          onOk={() => setSelectedFlight(undefined)}
        />
      )}
    </div>
  );
};

export default FlightOffer;
