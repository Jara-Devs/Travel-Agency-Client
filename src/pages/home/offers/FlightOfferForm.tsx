import { FlightOfferFormType } from "../../../types/services";

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

export interface FlightFormProps {
    onOk: (form: FlightOfferFormType) => void;
    onCancel: () => void;
    values?: FlightOfferFormData;
    open: boolean;
}