import { Filter } from "odata-query";
import { FilterItem } from "../FilterSearch";

export const anyOfferPackage: FilterItem = {
  options: [
    { key: "0", value: "0", label: "Offer" },
    { key: "1", value: "1", label: "Package" },
  ],
  name: "Offer or package",
  key: "any",
  styles: { width: "150px" },
};

export const buildFilter = (filter: Record<string, string>): Filter => {
  const f: Filter[] = [];

  if (filter?.any === "0") f.push({ offers: { any: {} } });
  if (filter?.any === "1")
    f.push({
      offers: {
        any: { packages: { any: { isSingleOffer: { eq: false } } } },
      },
    });

  return { and: f };
};
