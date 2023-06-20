import { ProCard } from '@ant-design/pro-components';
import { useFindAllVideoQuery } from '@training-project/data-access';
import { Image, Space, notification } from 'antd';
import {
  backgroudBorder,
  profileStyle,
} from '../../../../libs/data-access/src/shared/theme';
import { useRouter } from 'next/router';
interface IVideoList {}
const VideoCardList = (props: IVideoList) => {
  const router = useRouter();
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
              onClick={(e) => router.push(`${video.name}/${video.id}`)}
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
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: 150,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                      className="text-style"
                    >
                      {video.name}
                    </div>
                  </div>
                </div>
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
