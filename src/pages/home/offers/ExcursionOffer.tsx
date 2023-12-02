import { Col, Row, Tooltip, message } from "antd";
import ShowEntities from "../../../common/ShowEntities";
import { useEffect, useState } from "react";
import { ExcursionOfferType, ReactionState } from "../../../types/offers";
import SlideCard from "../../../common/SlideCard";
import ShowExcursion, {
  ShowMiniExcursion,
} from "../../show/services/ShowExcursion";
import { EyeOutlined, LikeFilled, DislikeFilled } from "@ant-design/icons";
import { excursionOffer } from "../../../api/offers";
import ShowExcursionOffer from "../../show/offers/ShowExcursionOffer";
import { Excursion } from "../../../types/services";
import { useSearchParams } from "react-router-dom";
import { Filter } from "odata-query";
import { excursion } from "../../../api/services";
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
import OfferFooterImage from "../../../common/OfferFooterImage";
import ReserveOnline from "../../../common/ReserveOnline";

const ExcursionOffer = () => {
  const { get } = excursionOffer();
  const { get: getExcursion } = excursion();

  const [searchParams] = useSearchParams();
  const { user } = useContext(UserContext);

  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<ExcursionOfferType>();
  const [selectedExcursion, setSelectedExcursion] = useState<Excursion>();
  const [data, setData] = useState<ExcursionOfferType[]>([]);

  const [excursions, setExcursions] = useState<Excursion[]>([]);

  const buildFilter = (): Filter => {
    const f: Filter[] = [];

    const excursion = searchParams.get("excursion");
    if (excursion && isGuid(excursion)) {
      f.push({ excursion: { id: { eq: { type: "guid", value: excursion } } } });
    }

    const search = searchParams.get("search");
    if (search) f.push({ name: { contains: search } });

    return { and: f };
  };

  const reactionFunc = (
    offer: ExcursionOfferType,
    reactionState: ReactionState
  ) => {
    reactionLogic(
      offer,
      (offer) =>
        setData(
          data.map((x) =>
            x.id === offer.id ? (offer as ExcursionOfferType) : x
          )
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
        excursion: {
          select: ["id", "name"],
          expand: {
            image: { select: ["id", "name", "url"] },
            places: {
              select: ["id", "name"],
              expand: {
                image: { select: ["id", "name", "url"] },
              },
            },
            activities: {
              select: ["id", "name"],
              expand: {
                image: { select: ["id", "name", "url"] },
              },
            },
            hotels: {
              select: ["id", "name"],
              expand: {
                image: { select: ["id", "name", "url"] },
              },
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

  const loadExcursion = async () => {
    setLoading(true);

    const result = await getExcursion({
      select: ["id", "name"],
    });

    if (result.ok) setExcursions(result.value || []);
    else message.error(result.message);

    setLoading(false);
  };

  useEffect(() => {
    loadExcursion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load(buildFilter());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filterExcursion: FilterItem = {
    options: excursions.map((x) => ({
      label: x.name,
      value: x.id,
    })),
    name: "Excursion",
    search: true,
    styles: { width: "200px" },
  };

  return (
    <div className="m-5">
      <Row>
        <Col span={24}>
          <FilterSearch filters={[filterExcursion]} loading={loading} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ShowEntities
            loading={loading}
            data={data}
            content={(value: ExcursionOfferType) => {
              return (
                <SlideCard
                  data={[
                    <div onClick={() => setSelectedExcursion(value.excursion)}>
                      <ShowMiniExcursion excursion={value.excursion} />
                    </div>,
                  ]}
                  size="4"
                />
              );
            }}
            actions={(value: ExcursionOfferType) => [
              <Tooltip title="Show Offer">
                <EyeOutlined
                  style={{ fontSize: "20px" }}
                  onClick={() => setSelected(value)}
                />
              </Tooltip>,
              <Tooltip title="Availability">
                <Row gutter={2}>
                  <Col>
                    <LocalOfferIcon
                      style={{ paddingTop: "3px" }}
                      fontSize="small"
                    />
                  </Col>
                  <Col>{offerAvailability(value)}</Col>
                </Row>
              </Tooltip>,
              <>
                <LikeFilled
                  style={
                    selectedReaction(user, value, ReactionState.Like)
                      ? { color: "gold", fontSize: "20px" }
                      : { fontSize: "20px" }
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
                      ? { color: "gold", fontSize: "20px" }
                      : { fontSize: "20px" }
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
            convert={(value: ExcursionOfferType) => ({
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
        <ShowExcursionOffer
          excursionOffer={selected}
          open={true}
          onOk={() => setSelected(undefined)}
        />
      )}
      {selectedExcursion && (
        <ShowExcursion
          excursion={selectedExcursion}
          open={true}
          onOk={() => setSelectedExcursion(undefined)}
        />
      )}
    </div>
  );
};

export default ExcursionOffer;
