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
import {
  OfferFooterImage,
  isGuid,
  reactionLogic,
  selectedReaction,
} from "../../../common/functions";

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

    const result = await get({
      expand: {
        image: { select: ["id", "name", "url"] },
        excursion: {
          select: ["id", "name", "isOverNight"],
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
            hotel: {
              select: ["id", "name"],
              expand: {
                image: { select: ["id", "name", "url"] },
              },
            },
          },
        },
        reactions: { select: ["reactionState", "touristId", "id"] },
      },
      filter: filter,
    });

    if (result.ok) setData(result.value || []);
    else message.error(result.message);

    setLoading(false);
  };

  const loadExcursion = async () => {
    setLoading(true);

    const result = await getExcursion({
      expand: {
        image: { select: ["id", "name", "url"] },
      },
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
              footerImage: <OfferFooterImage value={value} />,
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
