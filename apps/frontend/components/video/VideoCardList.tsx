import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import {
  useFindAllVideoQuery,
  useFindAllVieoByCategroryQuery,
} from '@training-project/data-access';
import { Image, Space, notification } from 'antd';
import {
  backgroudBorder,
  profileStyle,
} from '../../../../libs/data-access/src/shared/theme';
interface IVideoList {}
const VideoCardList = (props: IVideoList) => {
  const { loading, data, error } = useFindAllVideoQuery();
  if (error) {
    notification.error(error);
  }
  return (
    <>
      <Space wrap size={'small'}>
        {data &&
          data.findAllVideo.map((video) => (
            <ProCard
              // title={video.name}
              className="video-list"
              loading={loading}
              style={{
                maxWidth: 500,
                ...backgroudBorder({
                  ...profileStyle,
                  isSetBorder: false,
                }),
              }}
              bordered
              bodyStyle={{
                paddingInline: 'unset',
                paddingBlock: 'unset',
              }}
            >
              <Image
                width={200}
                height={250}
                src={video.poster}
                preview={false}
                className="card-image"
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  background: 'bottom',
                  fontWeight: 'lighter',
                }}
                className="text-style"
              >
                {video.description}
              </div>
            </ProCard>
          ))}
      </Space>
      <style jsx global>
        {`
          .card-image {
            transition: transform 0.2s; /* Animation */
            position: absolute;
          }
          .card-image:hover {
            box-shadow: 0 0 4px #eee;
            transform: scale(1.2);
            z-index: 10;
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};

export default VideoCardList;
