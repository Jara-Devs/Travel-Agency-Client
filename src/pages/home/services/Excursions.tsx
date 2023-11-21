import { ReactNode, useEffect, useState } from "react";
import { excursion, overNighExcursion } from "../../../api/services";
import {
  Excursion,
  Hotel,
  OverNighExcursion,
  TouristActivity,
  TouristPlace,
} from "../../../types/services";
import { Tooltip, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import ShowEntities from "../../../common/ShowEntities";
import ShowExcursion from "../../show/ShowExcursion";
import { buildMessage } from "../../../common/functions";
import ShowPlace, { ShowMiniPlace } from "../../show/ShowPlace";
import ShowTouristActivity, {
  ShowMiniTouristActivity,
} from "../../show/ShowActivity";
import ShowHotel, { ShowMiniHotel } from "../../show/ShowHotel";
import SlideCard from "../../../common/SlideCard";

const Excursions = () => {
  const { get } = excursion();
  const { get: getOverNight } = overNighExcursion();

  const [data, setData] = useState<Excursion[]>([]);
  const [selected, setSelected] = useState<Excursion>();
  const [selectedPlace, setSelectedPlace] = useState<TouristPlace>();
  const [selectedActivity, setSelectedActivity] = useState<TouristActivity>();
  const [selectedHotel, setSelectedHotel] = useState<Hotel>();

  const [loading, setLoading] = useState<boolean>(false);

  const load = async () => {
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
      filter: { isOverNight: { eq: false } },
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
    });

    if (result.ok && resultOverNight.ok)
      setData(result.value!.concat(resultOverNight.value!));
    else message.error(buildMessage([result, resultOverNight]));

    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="m-5">
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
