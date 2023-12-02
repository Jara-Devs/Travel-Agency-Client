import { useEffect, useState } from "react";
import { flight, city } from "../../../api/services";
import { City, Flight } from "../../../types/services";
import { Tooltip, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import ShowEntities from "../../../common/ShowEntities";
import SlideCard from "../../../common/SlideCard";
import ShowFlight, { buildDuration } from "../../show/services/ShowFlight";
import FilterSearch, { FilterItem } from "../../../common/FilterSearch";
import { Filter } from "odata-query";
import { useSearchParams } from "react-router-dom";
import { isGuid } from "../../../common/functions";
import ShowCity, { ShowMiniCity } from "../../show/services/ShowCity";

const Flights = () => {
  const { get } = flight();
  const { get: getCities } = city();

  const [searchParams] = useSearchParams();

  const [data, setData] = useState<Flight[]>([]);
  const [selected, setSelected] = useState<Flight>();
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City>();

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
          select: ["name", "country"],
          expand: { image: { select: ["id", "name", "url"] } },
        },
        destination: {
          select: ["name", "country"],
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
    const result = await getCities({ select: ["id", "name", "country"] });

    if (result.ok) setCities(result.value!);
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
    options: cities.map((p, idx) => ({
      key: idx,
      label: `${p.name}, ${p.country}`,
      value: p.id,
    })),
    search: true,
    styles: { width: "150px" },
  };

  const destinationFilter: FilterItem = {
    name: "Destination",
    options: cities.map((p, idx) => ({
      key: idx,
      label: `${p.name}, ${p.country}`,
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
            <div onClick={() => setSelectedCity(value.origin)}>
              <ShowMiniCity city={value.origin} ribbon="Origin" />
            </div>,
            <div onClick={() => setSelectedCity(value.destination)}>
              <ShowMiniCity city={value.destination} ribbon="Destination" />
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
      {selectedCity && (
        <ShowCity
          city={selectedCity}
          open={true}
          onOk={() => setSelectedCity(undefined)}
        />
      )}
    </div>
  );
};

export default Flights;
