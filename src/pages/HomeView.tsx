import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import { Image } from "../types/api";
import { getRandomImage } from "../api/image";

const contentStyle: React.CSSProperties = {
  padding: "25px",
};

const HomeView: React.FC = () => {
  const initial = [
    {
      id: "",
      name: "img1",
      url: "https://viajes.nationalgeographic.com.es/medio/2022/07/13/paris_37bc088a_1280x720.jpg",
    },
    {
      id: "",
      name: "img2",
      url: "https://fotografias.larazon.es/clipping/cmsimages01/2019/10/24/033815A9-A128-455C-8F18-74809954CAF3/69.jpg?crop=2000,1125,x0,y105&width=1280&height=720&optimize=low&format=webply",
    },
    {
      id: "",
      name: "img3",
      url: "https://www.10wallpaper.com/wallpaper/1366x768/1204/venice_italy_travel-Urban_Landscape_Wallpaper_1366x768.jpg",
    },
    {
      id: "",
      name: "img4",
      url: "https://app.goland.la/cdn/blog/DQAHDXRSRF1A/Y0NTOOIWKIQM/uploads/palm-trees-on-the-caribbean-tropical-beach-with-boats-saona-island-dominican-republic-vacation-travel-background-1280x720.jpeg",
    },
  ];

  const [images, setImages] = useState<Image[]>(initial);
  const load = async () => {
    const response = await getRandomImage();

    if (response.ok) {
      setImages((x) => {
        let l = x.concat(response.value!);
        l.sort(() => Math.random() - 0.5);
        return l;
      });
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="home-view">
      <Carousel autoplay>
        {images.map((i, idx) => (
          <div key={idx}>
            <img style={contentStyle} alt={i.name} src={i.url}></img>
          </div>
        ))}
      </Carousel>

      <h1 className="bottom_sign">Travel With Us!!!</h1>
    </div>
  );
};

export default HomeView;
