import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { Carousel, Radio } from 'antd';
import type { DotPosition } from 'antd/es/carousel';

const contentStyle: React.CSSProperties = {
  marginTop: '20px',
  marginRight: '20px',
  marginLeft: '25px',
  height: '720px',
  width: '97%',
  lineHeight: '200px',
  justifyContent: 'center',
  display: 'flex',
};

const HomeView: React.FC = () => {


  const [dotPosition, setDotPosition] = useState<DotPosition>('bottom');

  const handlePositionChange = ({ target: { value } }: RadioChangeEvent) => {
    setDotPosition(value);
  };

  return (
    <>

      <Carousel
        autoplay
        dotPosition={dotPosition}>

        <div >
          <img style={contentStyle} src='https://viajes.nationalgeographic.com.es/medio/2022/07/13/paris_37bc088a_1280x720.jpg'></img>

        </div>

        <div>
          <img style={contentStyle} src='https://fotografias.larazon.es/clipping/cmsimages01/2019/10/24/033815A9-A128-455C-8F18-74809954CAF3/69.jpg?crop=2000,1125,x0,y105&width=1280&height=720&optimize=low&format=webply'></img>
        </div>

        <div>
          <img style={contentStyle} src='https://www.10wallpaper.com/wallpaper/1366x768/1204/venice_italy_travel-Urban_Landscape_Wallpaper_1366x768.jpg'></img>
        </div>

        <div>
          <img style={contentStyle} src='https://app.goland.la/cdn/blog/DQAHDXRSRF1A/Y0NTOOIWKIQM/uploads/palm-trees-on-the-caribbean-tropical-beach-with-boats-saona-island-dominican-republic-vacation-travel-background-1280x720.jpeg'></img>
        </div>
      </Carousel>

      <h1 className='bottom_sign'>Travel With Us!!!</h1>
    </>


  );
};

export default HomeView;