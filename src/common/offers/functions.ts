import {
  ExcursionFacility,
  FlightFacility,
  HotelFacility,
  OfferType,
} from "../../types/offers";

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
};

export const offerTypeLabel = (type: OfferType) => {
  switch (type) {
    case OfferType.Flight:
      return "Flight Offer";
    case OfferType.Hotel:
      return "Hotel Offer";
    case OfferType.Excursion:
      return "Excursion Offer";
  }
};
