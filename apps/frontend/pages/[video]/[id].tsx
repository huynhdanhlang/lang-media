import {
  Loading,
  randomColor,
  useFindOneVideoQuery
} from '@training-project/data-access';
import {
  Button,
  Col,
  Divider,
  Image,
  Row,
  Space,
  Tag,
  notification,
} from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import ImageSlider from 'apps/frontend/components/layout/Carousel';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
interface IVideoDetail {
  // id: number;
}
interface IVideoPlayer {
  playing: boolean;
  url: string;
  props?: ReactPlayerProps;
}
const VideoDetail = (props: IVideoDetail) => {
  const router = useRouter();
  const [countries, setCountries] = useState<DefaultOptionType[]>([]);
  const [isPlay, setIsPlay] = useState(false);
  const [isPlayTrailer, setIsPlayTrailer] = useState(false);
  const { data, loading, error } = useFindOneVideoQuery({
    variables: {
      id: Number(router.query.id),
    },
  });

  const renderVideoPlayer = (options: IVideoPlayer) => {
    return (
      <ReactPlayer
        url={options.url}
        playing={options.playing}
        controls={true}
        width={'100%'}
        height={500}
        {...options.props}
      />
    );
  };

  if (loading) return <Loading />;
  if (error) {
    notification.error(error);
  }
  return (
    <>
      <div style={{ margin: 24 }}>
        {isPlay &&
          renderVideoPlayer({
            playing: isPlay,
            url: data.findOneVideo.url,
          })}
        {isPlayTrailer &&
          renderVideoPlayer({
            playing: isPlayTrailer,
            url: data.findOneVideo.trailerUrl,
          })}
        <Row>
          {!isPlay && !isPlayTrailer && (
            <>
              <Col className="text-style" span={5}>
                {data.findOneVideo.description}
              </Col>
              <Col style={{ height: '200px' }}>
                <Divider type="vertical" style={{ height: '100%' }} />
              </Col>
              <Col span={5} className="text-style">
                <Image
                  width={200}
                  height={250}
                  src={data.findOneVideo.poster}
                  preview={false}
                  className="card-image-static"
                />{' '}
              </Col>
            </>
          )}

          <Col style={{ height: '200px' }}>
            <Divider type="vertical" style={{ height: '100%' }} />
          </Col>
          <Col className="text-style">
            <Col
              style={{
                fontSize: 24,
                width: 500,
                wordWrap: 'break-word',
                display: 'flex',
              }}
            >
              {data.findOneVideo.name}
            </Col>
            <Row style={{ width: '100%' }}>
              <Col>
                Ngôn ngữ: {data.findOneVideo.language.split('|').join(', ')}
              </Col>
              <Col>
                <Divider
                  type="vertical"
                  style={{ height: '100%', margin: 30 }}
                />
              </Col>
              <Col>Lượt xem: {data.findOneVideo.view}</Col>
              <Col>
                <Divider
                  type="vertical"
                  style={{ height: '100%', margin: 30 }}
                />
              </Col>
              <Col style={{ width: 200, wordWrap: 'break-word' }}>
                Thể loại:{' '}
                {data.findOneVideo.categories
                  .map((category) => category.name)
                  .join(', ')}
              </Col>
            </Row>
            <Col
              style={{
                position: 'absolute',
                height: '10px',
                bottom: 0,
                right: 0,
                margin: '20px',
                left: 0,
              }}
            >
              <Space size={'large'}>
                {!isPlay && (
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsPlay(true);
                      setIsPlayTrailer(false);
                    }}
                  >
                    Xem phim
                  </Button>
                )}
                {!isPlayTrailer && (
                  <Button
                    type="primary"
                    onClick={() => {
                      setIsPlayTrailer(true);
                      setIsPlay(false);
                    }}
                  >
                    Xem trailer phim
                  </Button>
                )}
              </Space>
            </Col>
          </Col>
          <Col style={{ marginTop: isPlay || isPlayTrailer ? 35 : 0 }}>
            <span className="text-style">Tags : </span>
            {data.findOneVideo.tags.map((tag) => (
              <Tag
                style={{
                  background: `#${randomColor()}`,
                  cursor: 'pointer',
                }}
                // onClick={()=> push}
              >
                {tag.name}
              </Tag>
            ))}
          </Col>
        </Row>
        <div>
          <Divider className="text-style">Video tương tự</Divider>
          <ImageSlider
            categoryIds={data.findOneVideo.categories.map(
              (catefory) => catefory.id
            )}
            limit={15}
            numberOfCol={5}
            style={{
              height: 300,
            }}
            onClick={(video) => router.push(`/${video.name}/${video.id}`)}
            currentVideoId={data.findOneVideo.id}
          />
        </div>

        {/* <Row>
    </Row> */}
      </div>
    </>
  );
};

export default VideoDetail;
