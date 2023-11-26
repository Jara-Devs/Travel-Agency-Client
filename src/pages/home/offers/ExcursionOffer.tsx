import { Col, Row, Tooltip, Typography, message } from "antd";
import ShowEntities from "../../../common/ShowEntities";
import { useEffect, useState } from "react";
import { ExcursionOfferType, ReactionState } from "../../../types/offers";
import SlideCard from "../../../common/SlideCard";
import ShowExcursion, { ShowMiniExcursion } from "../../show/services/ShowExcursion";
import { EyeOutlined, LikeFilled, DislikeFilled } from "@ant-design/icons";
import { excursionOffer } from "../../../api/offers";
import ShowExcursionOffer from "../../show/offers/ShowExcursionOffer";
import { Excursion, OverNighExcursion } from "../../../types/services";
import { useSearchParams } from "react-router-dom";
import { Filter } from "odata-query";
import { excursion, overNighExcursion } from "../../../api/services";
import FilterSearch, { FilterItem } from "../../../common/FilterSearch";
import { UserContext } from "../../../context/UserProvider";
import { useContext } from "react";
import { reactionLogic, selectedReaction } from "../../../common/functions";

const ExcursionOffer = () => <>Excursion Offer</>;

export default ExcursionOffer;
