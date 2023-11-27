import { useEffect, useState } from "react";
import { flight, touristPlace } from "../../../api/services";
import { Flight, TouristPlace } from "../../../types/services";
import { Tooltip, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import ShowEntities from "../../../common/ShowEntities";
import ShowPlace, { ShowMiniPlace } from "../../show/services/ShowPlace";
import SlideCard from "../../../common/SlideCard";
import ShowFlight, { buildDuration } from "../../show/services/ShowFlight";
import FilterSearch, { FilterItem } from "../../../common/FilterSearch";
import { Filter } from "odata-query";
import { useSearchParams } from "react-router-dom";
import { isGuid } from "../../../common/functions";

const Flights = () => {
  const { get } = flight();
  const { get: getPlaces } = touristPlace();

  const [searchParams] = useSearchParams();

  const [data, setData] = useState<Flight[]>([]);
  const [selected, setSelected] = useState<Flight>();
  const [places, setPlaces] = useState<TouristPlace[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<TouristPlace>();

  const [loading, setLoading] = useState<boolean>(false);

  const buildFilter = (): Filter => {
    const f: Filter[] = [];

    const search = searchParams.get("search");
    if (search) f.push({ company: { contains: search } });

    const origin = searchParams.get("origin");
    if (origin && isGuid(origin)) {
      f.push({
        origin: { id: { eq: { type: "guid", value: origin } } },
      });
    }

    const destination = searchParams.get("destination");
    if (destination && isGuid(destination)) {
      f.push({
        destination: { id: { eq: { type: "guid", value: destination } } },
      });
    }

    return { and: f };
  };

  const load = async (filter: Filter) => {
    setLoading(true);
    const result = await get({
      select: ["id", "company", "duration"],
      expand: {
        origin: {
          select: ["name", "description", "address"],
          expand: { image: { select: ["id", "name", "url"] } },
        },
        destination: {
          select: ["name", "description", "address"],
          expand: { image: { select: ["id", "name", "url"] } },
        },
      },
      filter: filter,
    });

    if (result.ok) setData(result.value!);
    else message.error(result.message);

    setLoading(false);
  };

  const loadPlaces = async () => {
    setLoading(true);
    const result = await getPlaces({ select: ["id", "name"] });

    if (result.ok) setPlaces(result.value!);
    else message.error(result.message);

    setLoading(false);
  };

  useEffect(() => {
    loadPlaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    load(buildFilter());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const originFilter: FilterItem = {
    name: "Origin",
    options: places.map((p, idx) => ({
      key: idx,
      label: p.name,
      value: p.id,
    })),
    search: true,
    styles: { width: "150px" },
  };

  const destinationFilter: FilterItem = {
    name: "Destination",
    options: places.map((p, idx) => ({
      key: idx,
      label: p.name,
      value: p.id,
    })),
    search: true,
    styles: { width: "150px" },
  };

  return (
    <div className="m-5">
      <FilterSearch
        filters={[originFilter, destinationFilter]}
        loading={loading}
      />
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
            <EyeOutlined
              style={{ fontSize: "20px" }}
              onClick={() => setSelected(value)}
            />
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
