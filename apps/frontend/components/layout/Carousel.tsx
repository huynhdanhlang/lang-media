import React from 'react';
import { Carousel } from 'antd';
import { IBase } from './Header';
import { CSSProperties } from 'styled-components';

const contentStyle: CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};


interface IImageSlider extends IBase {}

const ImageSlider = (props: IImageSlider) => (
  <Carousel {...props} autoplay >
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
);

export default ImageSlider;
