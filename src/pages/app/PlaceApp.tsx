import { touristPlace } from "../../api/services";
import { useEffect } from "react";

const PlaceApp = () => {
  const { get } = touristPlace();

  const load = async () => {
    const response = await get({
      select: ["address", "id", "name", "description"],
    });

    if (response.ok) console.log(response.value);
  };

  useEffect(() => {
    load();
  }, []);

  return <>Place App</>;
};

export default PlaceApp;
