import { Col, Row } from "antd";
import { ApiResponse } from "../types/api";
import {
  FlightFacility,
  HotelCategory,
  HotelFacility,
} from "../types/services";
import { FlightFacility, HotelCategory, ExcursionFacility } from "../types/services";
import { HotelCategory } from "../types/services";
import { FlightFacility } from "../types/offers";
import { StarFilled } from "@ant-design/icons";
import { CSSProperties } from "react";

export const buildMessage = (responses: ApiResponse<any>[]) => {
  let msg = "";

  const aux = (response: ApiResponse<any>) => {
    if (!response.ok) {
      if (msg.length === 0) msg = response.message;
      else msg = `${msg}, ${response.message}`;
    }
  };

  responses.map((r) => aux(r));

  return msg;
};

export const getCategory = (x: HotelCategory, styles?: CSSProperties) => {
  const renderStars = (n: number) => {
    let stars = [];
    for (let i = 0; i < n; i++) {
      stars.push(i);
    }
    return (
      <Row gutter={1}>
        {stars.map((i) => (
          <Col key={i}>
            <StarFilled style={{ ...styles, color: "gold" }} />
          </Col>
        ))}
      </Row>
    );
  };

  switch (x) {
    case HotelCategory.OneStar:
      return renderStars(1);
    case HotelCategory.TwoStars:
      return renderStars(2);
    case HotelCategory.ThreeStars:
      return renderStars(3);
    case HotelCategory.FourStars:
      return renderStars(4);
    case HotelCategory.FiveStars:
      return renderStars(5);
  }
};

export const getFlightFacility = (x: FlightFacility) => {
  switch (x) {
    case FlightFacility.FreeAirportTaxi:
      return "Free Airport Taxi";
    case FlightFacility.FreeBaggage:
      return "Free Baggage";
    case FlightFacility.FreeMeals:
      return "Free Meals";
    case FlightFacility.FreeWifi:
      return "Free Wifi";
    case FlightFacility.FreeDrinks:
      return "Free Drinks";
    case FlightFacility.FreeEntertainment:
      return "Free Entertainment";
    case FlightFacility.FreeSeatSelection:
      return "Free Seat Selection";
    case FlightFacility.PetTransportation:
      return "Pet Transportation";
  }
};

export const getHotelFacility = (x: HotelFacility) => {
  switch (x) {
    case HotelFacility.AirConditioning:
      return "AirConditioning";
    case HotelFacility.AirportShuttle:
      return "Airport Shuttle";
    case HotelFacility.Bar:
      return "Bar";
    case HotelFacility.ChildCare:
      return "ChildCare";
    case HotelFacility.FacilitiesForDisabledGuests:
      return "Facilities For Disabled Guests";
    case HotelFacility.Garden:
      return "Garden";
    case HotelFacility.Gym:
      return "Gym";
    case HotelFacility.Parking:
      return "Parking";
    case HotelFacility.PetFriendly:
      return "PetFriendly";
    case HotelFacility.Pool:
      return "Pool";
    case HotelFacility.Restaurant:
      return "Restaurant";
    case HotelFacility.RoomService:
      return "RoomService";
    case HotelFacility.Shops:
      return "Shops";
    case HotelFacility.Spa:
      return "Spa";
    case HotelFacility.Wifi:
      return "Wifi";
  }
};
export const getExcursionFacility = (x: ExcursionFacility) => {
  switch (x) {
    case ExcursionFacility.TourGuides:
      return "Tour Guides";
    case ExcursionFacility.Transportation:
      return "Transportation";
    case ExcursionFacility.Equipment:
      return "Equipment";
    case ExcursionFacility.Meals:
      return "Meals";
    case ExcursionFacility.Drinks:
      return "Drinks";
    case ExcursionFacility.EntranceTickets:
      return "Entrance Tickets";
    case ExcursionFacility.RecreationalActivities:
      return "Recreational Activities";
    case ExcursionFacility.FreeTime:
      return "Free Time";
    case ExcursionFacility.Communication:
      return "Communication";
    case ExcursionFacility.EnvironmentalEducation:
      return "Environmental Education";
    case ExcursionFacility.SafetyAndFirstAid:
      return "Safety And First Aid";
  }
}
