import { FlightOfferFormType } from "../../../types/services";
import { FC } from "react";

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

export interface FlightOfferFormProps {
    onOk: (form: FlightOfferFormType) => void;
    onCancel: () => void;
    values?: FlightOfferFormData;
    open: boolean;
}

const FlightOfferForm: FC<FlightOfferFormProps> = ({ onOk, onCancel, values, open }) => { }

export default FlightOfferForm;