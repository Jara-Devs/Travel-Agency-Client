
export interface FlightOfferFormData {
    name: string;
    flightId: number;
    availability: number;
    description: string;
    price: number;
    startDate: Date;
    endDate: Date;
    facilities: string[];
    imageId: number;
}