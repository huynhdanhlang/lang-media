import {
  Logo,
  VideoEntity,
  useFindAllVideoQuery,
} from '@training-project/data-access';
import { Carousel } from 'antd';
import { chunk } from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { IBase } from './Header';
const contentStyle: CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  // background: '#364d79',
};

interface IImageSlider extends IBase {
  categoryIds?: number[];
  numberOfCol?: number;
  limit?: number;
  style?: CSSProperties;
  onClick?: (video: VideoEntity) => void;
  currentVideoId?: number;
}

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

const ImageSlider = (props: IImageSlider) => {
  const [videoList, setVideoList] = useState<any[][]>([]);
  const router = useRouter();
  const whereToQuery = props.categoryIds?.length
    ? {
        variables: {
          videoFilter: {
            include: [
              {
                association: 'categories',
                where: {
                  id: props.categoryIds,
                },
              },
            ],
          },
        },
      }
    : {
        variables: {
          videoFilter: {
            limit: props.limit ?? 6,
            order: [['view', 'DESC']],
          },
        },
      };
  const { data: videos, loading } = useFindAllVideoQuery(whereToQuery);
  useEffect(() => {
    if (videos?.findAllVideo.length) {
      const videoSlice = chunk(
        videos.findAllVideo.filter(
          (video) => video.id !== props.currentVideoId
        ),
        props.numberOfCol ?? 2
      );
      setVideoList(videoSlice);
    }
  }, [videos]);

  const handleOnClick = (video: VideoEntity) => {
    if (props.onClick) {
      props.onClick(video);
    } else {
      router.push(`/${video.name}/${video.id}`);
    }
  };

  const renderVideoCarousel = useCallback(() => {
    return videoList.map((videos) => (
      <div className="wrapper-img">
        {videos.map((video: VideoEntity) => {
          return (
            <Logo
              key={video.id}
              className="logo-image"
              src={video.poster}
              style={{ ...props.style }}
              onClick={() => handleOnClick(video)}
            />
          );
        })}
      </div>
    ));
  }, [videoList]);

  return (
    <>
      <ImagesViewerWrapper>
        <Carousel {...props} autoplay infinite>
          {renderVideoCarousel()}
        </Carousel>
      </ImagesViewerWrapper>
      <style jsx global>
        {`
          .wrapper-img {
            display: flex !important;
          }
          .logo-image {
            transition: transform 0.2s; /* Animation */
            cursor: pointer;
          }
           {
            /* .logo-image:hover {
            box-shadow: 0 0 4px #eee;
            transform: scale(1.2);
            z-index: 10;
            cursor: pointer;
          } */
          }
        `}
      </style>
    </>
  );
};

export default ImageSlider;
