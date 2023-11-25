import { ReactNode, useEffect, useState } from "react";
import { excursion, overNighExcursion } from "../../../api/services";
import {
  Excursion,
  Hotel,
  OverNighExcursion,
  TouristActivity,
  TouristPlace,
} from "../../../types/services";
import { Col, Row, Tooltip, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import ShowEntities from "../../../common/ShowEntities";
import ShowExcursion from "../../show/services/ShowExcursion";
import { buildMessage } from "../../../common/functions";
import ShowPlace, { ShowMiniPlace } from "../../show/services/ShowPlace";
import ShowTouristActivity, {
  ShowMiniTouristActivity,
} from "../../show/services/ShowActivity";
import ShowHotel, { ShowMiniHotel } from "../../show/services/ShowHotel";
import SlideCard from "../../../common/SlideCard";
import FilterSearch, { FilterItem } from "../../../common/FilterSearch";
import { useSearchParams } from "react-router-dom";
import { Filter } from "odata-query";

const Excursions = () => {
  const { get } = excursion();
  const { get: getOverNight } = overNighExcursion();

  const [searchParams] = useSearchParams();

  const [data, setData] = useState<Excursion[]>([]);
  const [selected, setSelected] = useState<Excursion>();
  const [selectedPlace, setSelectedPlace] = useState<TouristPlace>();
  const [selectedActivity, setSelectedActivity] = useState<TouristActivity>();
  const [selectedHotel, setSelectedHotel] = useState<Hotel>();

  const [loading, setLoading] = useState<boolean>(false);

  const buildFilter = (): Filter => {
    const f: Filter[] = [];

    const type = searchParams.get("Type");
    if (type)
      f.push({ isOverNight: { eq: type === "excursion" ? false : true } });

    const search = searchParams.get("Search");
    if (search) f.push({ name: { contains: search } });

    return { and: f };
  };

  const load = async (filter: Filter) => {
    setLoading(true);
    const result = await get({
      select: ["id", "name", "isOverNight"],
      expand: {
        places: {
          select: ["name", "description", "address"],
          expand: { image: { select: ["id", "name", "url"] } },
        },
        activities: {
          select: ["name", "description"],
          expand: { image: { select: ["id", "name", "url"] } },
        },
        image: { select: ["id", "name", "url"] },
      },
      filter: { and: [{ isOverNight: { eq: false } }, filter] },
    });

    const resultOverNight = await getOverNight({
      select: ["id", "name", "isOverNight"],
      expand: {
        places: {
          select: ["name", "description", "address"],
          expand: { image: { select: ["id", "name", "url"] } },
        },
        activities: {
          select: ["name", "description"],
          expand: { image: { select: ["id", "name", "url"] } },
        },
        hotel: {
          select: ["name", "category"],
          expand: {
            image: {
              select: ["id", "name", "url"],
            },
            touristPlace: {
              select: ["name", "description"],
              expand: {
                image: {
                  select: ["id", "name", "url"],
                },
              },
            },
          },
        },
        image: { select: ["id", "name", "url"] },
      },
      filter: filter,
    });

    if (result.ok && resultOverNight.ok)
      setData(result.value!.concat(resultOverNight.value!));
    else message.error(buildMessage([result, resultOverNight]));

    setLoading(false);
  };

  useEffect(() => {
    load(buildFilter());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filterItem: FilterItem = {
    options: [
      { key: 1, label: "Excursion", value: "excursion" },
      { key: 2, label: "OverNight", value: "overNight" },
    ],
    name: "Type",
    styles: { width: "120px" },
  };

  return (
    <div className="m-5">
      <Row>
        <Col span={24}>
          <FilterSearch filters={[filterItem]} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ShowEntities
            loading={loading}
            data={data}
            content={(value: Excursion) => {
              let node: ReactNode[] = [];

              const places = value.places.map((p) => (
                <div onClick={() => setSelectedPlace(p)}>
                  <ShowMiniPlace place={p} />
                </div>
              ));
              const activities = value.activities.map((a) => (
                <div onClick={() => setSelectedActivity(a)}>
                  <ShowMiniTouristActivity touristActivity={a} />
                </div>
              ));

              node = node.concat(places);
              node = node.concat(activities);

              if (value.isOverNight) {
                node.push(
                  <div
                    onClick={() =>
                      setSelectedHotel((value as OverNighExcursion).hotel)
                    }
                  >
                    <ShowMiniHotel hotel={(value as OverNighExcursion).hotel} />
                  </div>
                );
              }

              return <SlideCard data={node} size="4" />;
            }}
            actions={(value: Excursion) => [
              <Tooltip title="Show Excursion">
                <EyeOutlined onClick={() => setSelected(value)} />
              </Tooltip>,
            ]}
            convert={(value: Excursion) => ({
              title: value.name,
              image: value.image,
            })}
          />
        </Col>
      </Row>

      {selected && (
        <ShowExcursion
          open={true}
          onOk={() => setSelected(undefined)}
          excursion={selected}
        />
      )}
      {selectedPlace && (
        <ShowPlace
          place={selectedPlace}
          open={true}
          onOk={() => setSelectedPlace(undefined)}
        />
      )}
      {selectedActivity && (
        <ShowTouristActivity
          open={true}
          touristActivity={selectedActivity}
          onOk={() => setSelectedActivity(undefined)}
        />
      )}
      {selectedHotel && (
        <ShowHotel
          open={true}
          hotel={selectedHotel}
          onOk={() => setSelectedHotel(undefined)}
        />
      )}
    </div>
  );
};

export default Excursions;
