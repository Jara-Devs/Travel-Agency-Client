import { Col, Row, Tooltip, message } from "antd";
import ShowEntities from "../../../common/ShowEntities";
import { useEffect, useState } from "react";
import { FlightOfferType } from "../../../types/offers";
import SlideCard from "../../../common/SlideCard";
import { ShowMiniFlight } from "../../show/services/ShowFlight";
import { EyeOutlined } from "@ant-design/icons";
import { flightOffer } from "../../../api/offers";

const FlightOffer = () => {
  const { get } = flightOffer();

  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<FlightOfferType>();
  const [data, setData] = useState<FlightOfferType[]>([]);

  const load = async () => {
    setLoading(true);

    const result = await get({
      expand: {
        image: { select: ["id", "name", "url"] },
        flight: {
          select: ["id", "company", "duration"],
          expand: {
            origin: { select: ["name"] },
            destination: { select: ["name"] },
          },
        },
        reactions: { select: ["comment", "liked"] },
      },
    });

    if (result.ok) setData(result.value || []);
    else message.error(result.message);

    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="m-5">
      {/* <Row>
            <Col span={24}>
              <FilterSearch filters={[filterItem]} loading={loading} />
            </Col>
          </Row> */}
      <Row>
        <Col span={24}>
          <ShowEntities
            loading={loading}
            data={data}
            content={(value: FlightOfferType) => {
              return (
                <SlideCard
                  data={[<ShowMiniFlight flight={value.flight} />]}
                  size="4"
                />
              );
            }}
            actions={(value: FlightOfferType) => [
              <Tooltip title="Show Offer">
                <EyeOutlined onClick={() => setSelected(value)} />
              </Tooltip>,
            ]}
            convert={(value: FlightOfferType) => ({
              title: value.name,
              image: value.image,
            })}
          />
        </Col>
      </Row>

      {/* {selected && (
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
      )} */}
    </div>
  );
};

export default FlightOffer;
