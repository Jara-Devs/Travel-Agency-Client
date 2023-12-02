import { Col, message, Row, Tooltip } from "antd";
import { Filter } from "odata-query";
import { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { hotelOffer } from "../../../api/offers";
import { hotel } from "../../../api/services";
import FilterSearch, { FilterItem } from "../../../common/FilterSearch";
import { isGuid } from "../../../common/functions";
import ShowEntities from "../../../common/ShowEntities";
import SlideCard from "../../../common/SlideCard";
import { UserContext } from "../../../context/UserProvider";
import { HotelOfferType, ReactionState } from "../../../types/offers";
import { Hotel } from "../../../types/services";
import ShowHotelOffer from "../../show/offers/ShowHotelOffer";
import { ShowMiniHotel } from "../../show/services/ShowHotel";
import { EyeOutlined, LikeFilled, DislikeFilled } from "@ant-design/icons";
import ShowHotel from "../../show/services/ShowHotel";
import {
  reactionLogic,
  selectedReaction,
} from "../../../common/offers/reactions";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import dayjs from "dayjs";
import { offerAvailability } from "../../../common/offers/functions";
import ReserveOnline from "../../../common/ReserveOnline";
import OfferFooterImage from "../../../common/OfferFooterImage";

const HotelOffer = () => {
  const { get } = hotelOffer();
  const { get: getHotel } = hotel();

  const [searchParams] = useSearchParams();
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<HotelOfferType>();
  const [selectedHotel, setSelectedHotel] = useState<Hotel>();
  const [data, setData] = useState<HotelOfferType[]>([]);

  const [hotels, setHotels] = useState<Hotel[]>([]);

  const buildFilter = (): Filter => {
    const f: Filter[] = [];

    const hotel = searchParams.get("hotel");
    if (hotel && isGuid(hotel)) {
      f.push({ hotel: { id: { eq: { type: "guid", value: hotel } } } });
    }

    const search = searchParams.get("search");
    if (search) f.push({ name: { contains: search } });
    return { and: f };
  };
  const reactionFunc = (
    offer: HotelOfferType,
    reactionState: ReactionState
  ) => {
    reactionLogic(
      offer,
      (offer) =>
        setData(
          data.map((x) => (x.id === offer.id ? (offer as HotelOfferType) : x))
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
        hotel: {
          select: ["id", "name", "category"],
          expand: {
            image: { select: ["id", "name", "url"] },

            touristPlace: {
              select: ["name", "description"],
              expand: { image: { select: ["id", "name", "url"] } },
            },
          },
        },
        reactions: { select: ["reactionState", "touristId", "id"] },
        facilities: { select: ["id", "name"] },
        reserves: { select: ["id"] },
      },
      filter: finalFilter,
    });

    if (result.ok)
      setData(
        (result.value || []).filter((x) => x.availability > x.reserves.length)
      );
    else message.error(result.message);

    setLoading(false);
  };
  const loadHotel = async () => {
    setLoading(true);

    const result = await getHotel({
      select: ["id", "name"],
      expand: {
        touristPlace: { select: ["name"] },
      },
    });

    if (result.ok) setHotels(result.value || []);
    else message.error(result.message);

    setLoading(false);
  };
  useEffect(() => {
    loadHotel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load(buildFilter());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filterHotel: FilterItem = {
    options: hotels.map((x) => ({
      label: x.name,
      value: x.id,
    })),
    name: "Hotel",
    search: true,
    styles: { width: "200px" },
  };

  return (
    <div className="m-5">
      <Row>
        <Col span={24}>
          <FilterSearch filters={[filterHotel]} loading={loading} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ShowEntities
            loading={loading}
            data={data}
            content={(value: HotelOfferType) => {
              return (
                <SlideCard
                  data={[
                    <div onClick={() => setSelectedHotel(value.hotel)}>
                      <ShowMiniHotel hotel={value.hotel} />
                    </div>,
                  ]}
                  size="4"
                />
              );
            }}
            actions={(value: HotelOfferType) => [
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
            convert={(value: HotelOfferType) => ({
              title: value.name,
              image: value.image,
              description: value.description,
              footerImage: (
                <OfferFooterImage
                  reserveBtn={
                    <ReserveOnline
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
        <ShowHotelOffer
          hoteloffer={selected}
          open={true}
          onOk={() => setSelected(undefined)}
        />
      )}
      {selectedHotel && (
        <ShowHotel
          hotel={selectedHotel}
          open={true}
          onOk={() => setSelectedHotel(undefined)}
        />
      )}
    </div>
  );
};

export default HotelOffer;
