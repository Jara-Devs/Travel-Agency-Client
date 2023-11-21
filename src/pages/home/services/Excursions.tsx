import { useEffect, useState } from "react";
import { excursion, overNighExcursion } from "../../../api/services";
import {
  Excursion,
  Hotel,
  OverNighExcursion,
  TouristActivity,
  TouristPlace,
} from "../../../types/services";
import { Col, Row, Tooltip, message, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import ShowEntities from "../../../common/ShowEntities";
import ShowExcursion from "../../show/ShowExcursion";
import { buildMessage } from "../../../common/functions";
import ShowPlace from "../../show/ShowPlace";
import ShowTouristActivity from "../../show/ShowActivity";
import ShowHotel from "../../show/ShowHotel";

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
        content={(value: Excursion) => (
          <>
            <Row>
              {value.places.map((p, idx) => (
                <Col key={idx}>
                  <Tag
                    color="blue"
                    className="home-tag-label"
                    onClick={() => setSelectedPlace(p)}
                  >
                    {p.name}
                  </Tag>
                </Col>
              ))}
            </Row>
            <Row gutter={5} className="mt-1">
              {value.activities.map((a, idx) => (
                <Col key={idx}>
                  <Tag
                    color="green"
                    className="home-tag-label"
                    onClick={() => setSelectedActivity(a)}
                  >
                    {a.name}
                  </Tag>
                </Col>
              ))}
            </Row>
            {value.isOverNight && (
              <Row className="mt-1">
                <Col>
                  <Tag
                    color="cyan"
                    className="home-tag-label"
                    onClick={() =>
                      setSelectedHotel((value as OverNighExcursion).hotel)
                    }
                  >
                    {(value as OverNighExcursion).hotel.name}
                  </Tag>
                </Col>
              </Row>
            )}
          </>
        )}
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
