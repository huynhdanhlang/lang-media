import {
  Loading,
  Logo,
  useFindOneVideoQuery,
} from '@training-project/data-access';
import { Col, Divider, Image, Row, notification } from 'antd';
import ImageSlider from 'apps/frontend/components/layout/Carousel';
import VideoCardList from 'apps/frontend/components/video/VideoCardList';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
interface IVideoDetail {
  // id: number;
}
const VideoDetail = (props: IVideoDetail) => {
  const router = useRouter();
  const { data, loading, error } = useFindOneVideoQuery({
    variables: {
      id: Number(router.query.id),
    },
  });

  if (loading) return <Loading />;
  if (error) {
    notification.error(error);
  }
  return (
    <>
      <div style={{ margin: 24 }}>
        <Row>
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
          <Col style={{ height: '200px' }}>
            <Divider type="vertical" style={{ height: '100%' }} />
          </Col>
          <Col className="text-style">
            <Col>{data.findOneVideo.name}</Col>
            <Row style={{ width: '100%' }}>
              <Col>Số tập: {'9/9'}</Col>
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
              <Col span={5}>
                Thể loại:{' '}
                {data.findOneVideo.categories
                  .map((category) => category.name)
                  .join(', ')}
              </Col>
            </Row>
          </Col>
        </Row>
        <div>
          <Divider className="text-style">Video tương tự</Divider>
          <ImageSlider
            categoryIds={data.findOneVideo.categories.map(
              (catefory) => catefory.id
            )}
            limit={10}
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
