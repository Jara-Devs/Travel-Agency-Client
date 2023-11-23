import { useEffect, useState } from "react";
import { flight } from "../../../api/services";
import { Flight, TouristPlace } from "../../../types/services";
import { Tooltip, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import ShowEntities from "../../../common/ShowEntities";
import ShowPlace, { ShowMiniPlace } from "../../show/ShowPlace";
import SlideCard from "../../../common/SlideCard";
import ShowFlight, { buildDuration } from "../../show/ShowFlight";

const Flights = () => {
  const { get } = flight();

  const [data, setData] = useState<Flight[]>([]);
  const [selected, setSelected] = useState<Flight>();
  const [selectedPlace, setSelectedPlace] = useState<TouristPlace>();

  const [loading, setLoading] = useState<boolean>(false);

  const load = async () => {
    setLoading(true);
    const result = await get({
      select: ["id", "company"],
      expand: {
        origin: {
          select: ["name", "description", "address"],
          expand: { image: { select: ["id", "name", "url"] } },
        },
        destination: {
          select: ["name", "description"],
          expand: { image: { select: ["id", "name", "url"] } },
        },
      },
    });

    if (result.ok) setData(result.value!);
    else message.error(result.message);

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
        content={(value: Flight) => {
          const places = [
            <div onClick={() => setSelectedPlace(value.origin)}>
              <ShowMiniPlace place={value.origin} ribbon="Origin" />
            </div>,
            <div onClick={() => setSelectedPlace(value.destination)}>
              <ShowMiniPlace place={value.destination} ribbon="Destination" />
            </div>,
          ];

          return <SlideCard data={places} size="4" />;
        }}
        actions={(value: Flight) => [
          <Tooltip title="Show Flight">
            <EyeOutlined onClick={() => setSelected(value)} />
          </Tooltip>,
        ]}
        convert={(value: Flight) => ({
          title: value.company,
          description: `From ${value.origin.name} to ${
            value.destination.name
          }, Duration: ${buildDuration(value)}`,
          image: value.origin.image,
        })}
      />
      {selected && (
        <ShowFlight
          open={true}
          onOk={() => setSelected(undefined)}
          flight={selected}
        />
      )}
      {selectedPlace && (
        <ShowPlace
          place={selectedPlace}
          open={true}
          onOk={() => setSelectedPlace(undefined)}
        />
      )}
    </div>
  );
};

export default Flights;
