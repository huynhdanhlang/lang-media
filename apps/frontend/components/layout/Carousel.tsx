import React, { useCallback, useEffect, useState } from 'react';
import { Card, Carousel, Image } from 'antd';
import { IBase } from './Header';
import { CSSProperties } from 'styled-components';
import styled from 'styled-components';
import {
  Logo,
  VideoEntity,
  useFindAllVideoQuery,
} from '@training-project/data-access';
import { chunk } from 'lodash';
const contentStyle: CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  // background: '#364d79',
};

interface IImageSlider extends IBase {}

const ImagesViewerWrapper = styled.div`
  .ant-carousel img {
    width: 100%;
    object-fit: cover;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;
    zindex: 10;
  }

  .ant-carousel .slick-track {
    height: inherit !important;
  }
`;

const imageStyle = {
  height: 400,
  border: 'unset',
};

const ImageSlider = (props: IImageSlider) => {
  const [videoList, setVideoList] = useState<any[][]>([]);
  const { data: videos, loading } = useFindAllVideoQuery({
    variables: {
      videoFilter: {
        limit: 6,
        order: [['view', 'DESC']],
      },
    },
  });
  useEffect(() => {
    if (videos?.findAllVideo.length) {
      const videoSlice = chunk(videos.findAllVideo, 2);
      console.log(
        '🚀 ~ file: Carousel.tsx:51 ~ useEffect ~ videoSlice:',
        videoSlice
      );
      setVideoList(videoSlice);
    }
  }, [videos]);

  const renderVideoCarousel = useCallback(() => {
    return videoList.map((videos) => (
      <div className="wrapper-img">
        {videos.map((video) => {
          return <Logo src={video.url} style={{ ...imageStyle }} />;
        })}
      </div>
    ));
  }, [videoList]);

  return (
    <>
      <ImagesViewerWrapper>
        <Carousel {...props}>{renderVideoCarousel()}</Carousel>
      </ImagesViewerWrapper>
      <style jsx global>
        {`
          .wrapper-img {
            display: flex !important;
          }
        `}
      </style>
    </>
  );
};

export default ImageSlider;
