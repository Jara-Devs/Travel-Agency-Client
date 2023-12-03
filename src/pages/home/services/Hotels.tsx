import { useEffect, useState } from "react";
import { hotel } from "../../../api/services";
import { Hotel, HotelCategory, TouristPlace } from "../../../types/services";
import { Col, Row, Tooltip, message } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import ShowEntities from "../../../common/ShowEntities";
import { buildMessage } from "../../../common/functions";
import ShowPlace, { ShowMiniPlace } from "../../show/services/ShowPlace";
import ShowHotel from "../../show/services/ShowHotel";
import FilterSearch, { FilterItem } from "../../../common/FilterSearch";
import { useSearchParams } from "react-router-dom";
import { Filter } from "odata-query";
import SlideCard from "../../../common/SlideCard";
import { HotelCategoryComp } from "../../../common/service/HotelCategory";

const Hotels = () => {
  const { get } = hotel();

  const [searchParams] = useSearchParams();

  const [data, setData] = useState<Hotel[]>([]);
  const [selected, setSelected] = useState<Hotel>();
  const [selectedPlace, setSelectedPlace] = useState<TouristPlace>();

  const [loading, setLoading] = useState<boolean>(false);

  const buildFilter = (): Filter => {
    const f: Filter[] = [];

    const search = searchParams.get("search");
    if (search) f.push({ name: { contains: search } });

    const category = searchParams.get("category");
    if (category) {
      const categoryValue = Number(category);
      if (Number.isInteger(categoryValue)) {
        f.push({ category: HotelCategory[categoryValue] });
      }
    }

    return { and: f };
  };

  const load = async (filter: Filter) => {
    setLoading(true);
    const result = await get({
      select: ["id", "name", "category"],
      expand: {
        image: {
          select: ["id", "name", "url"],
        },
        touristPlace: {
          select: ["name", "description", "address"],
          expand: {
            image: {
              select: ["id", "name", "url"],
            },
            city: { select: ["name", "country"] },
          },
        },
      },
      filter: { and: [filter] },
    });

    if (result.ok) {
      setData(result.value!);
    } else message.error(buildMessage([result]));

    setLoading(false);
  };

  useEffect(() => {
    load(buildFilter());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filterItem: FilterItem = {
    options: [
      {
        label: <HotelCategoryComp x={HotelCategory.OneStar} />,
        value: "0",
        key: 1,
      },
      {
        label: <HotelCategoryComp x={HotelCategory.TwoStars} />,
        value: "1",
        key: 2,
      },
      {
        label: <HotelCategoryComp x={HotelCategory.ThreeStars} />,
        value: "2",
        key: 3,
      },
      {
        label: <HotelCategoryComp x={HotelCategory.FourStars} />,
        value: "3",
        key: 4,
      },
      {
        label: <HotelCategoryComp x={HotelCategory.FiveStars} />,
        value: "4",
        key: 5,
      },
    ],
    name: "Category",
    styles: { width: "120px" },
  };

  return (
    <div className="m-5">
      <Row>
        <Col span={24}>
          <FilterSearch filters={[filterItem]} loading={loading} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <ShowEntities
            loading={loading}
            data={data}
            content={(value: Hotel) => {
              const place = (
                <div onClick={() => setSelectedPlace(value.touristPlace)}>
                  <ShowMiniPlace place={value.touristPlace} />
                </div>
              );

              return <SlideCard data={[place]} size="4" />;
            }}
            actions={(value: Hotel) => [
              <Tooltip title="Show Hotel">
                <EyeOutlined
                  style={{ fontSize: "20px" }}
                  onClick={() => setSelected(value)}
                />
              </Tooltip>,
            ]}
            convert={(value: Hotel) => ({
              title: value.name,
              description: <HotelCategoryComp x={value.category} />,
              image: value.image,
            })}
          />
        </Col>
      </Row>

      {selected && (
        <ShowHotel
          open={true}
          onOk={() => setSelected(undefined)}
          hotel={selected}
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

export default Hotels;
