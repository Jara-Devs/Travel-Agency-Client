import { Col, Row, message } from "antd";
import { ApiResponse } from "../types/api";
import { FlightFacility, HotelCategory, ExcursionFacility } from "../types/services";
import { HotelCategory } from "../types/services";
import { FlightFacility, Offer, ReactionState } from "../types/offers";
import { StarFilled } from "@ant-design/icons";
import { CSSProperties } from "react";
import { User } from "../types/auth";
import { reaction } from "../api/offers";

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

export const reactionLogic = async (
  offer: Offer,
  setOffer: (offer: Offer) => void,
  user: User | null,
  reactionState: ReactionState
) => {
  const { create, edit, remove } = reaction();
  if (user?.role !== "Tourist")
    return message.error("Only tourists can react to offers");

  const touristId = user?.id!;

  const reactionV = offer.reactions?.find((x) => x.touristId === touristId);
  let changed = false;

  if (reactionV && reactionV.reactionState === reactionState) {
    const result = await remove(reactionV.id);

    if (result.ok) {
      offer.reactions = offer.reactions?.filter((x) => x.id !== reactionV.id);
      changed = true;
    } else message.error(result.message);
  }

  if (!reactionV) {
    const result = await create({
      offerId: offer.id,
      reactionState,
      touristId,
    });
    if (result.ok) {
      offer.reactions.push({
        id: (result.value as any).id,
        reactionState,
        touristId,
        offerId: offer.id,
      });
      changed = true;
    } else message.error(result.message);
  }

  if (reactionV && reactionV.reactionState !== reactionState) {
    const result = await edit(
      { reactionState, touristId, offerId: offer.id },
      reactionV.id
    );
    if (result.ok) {
      offer.reactions = offer.reactions?.map((x) =>
        x.id === reactionV.id ? { ...x, reactionState } : x
      );
      changed = true;
    } else message.error(result.message);
  }

  if (changed) setOffer(offer);
};

export const selectedReaction = (
  user: User | null,
  offer: Offer,
  reactionState: ReactionState
) => {
  if (user?.role !== "Tourist") return false;
  const touristId = user?.id!;

  const reaction = offer.reactions?.find((x) => x.touristId === touristId);

  if (reaction) return reaction.reactionState === reactionState;

  return false;
};


