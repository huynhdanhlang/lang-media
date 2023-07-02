import { ProCard } from '@ant-design/pro-components';
import { Image } from 'antd';
import { useRouter } from 'next/router';
import { backgroudBorder, profileStyle } from '../shared/theme';
interface IVideoCard {
  video: any;
}
const VideoCard = (props: IVideoCard) => {
  const { video } = props;
  const router = useRouter();
  return (
    <ProCard
      // title={video.name}
      className="video-list"
      style={{
        maxWidth: 500,
        ...backgroudBorder({
          ...profileStyle,
          isSetBorder: false,
        }),
        cursor: 'pointer',
      }}
      bordered
      bodyStyle={{
        paddingInline: 'unset',
        paddingBlock: 'unset',
      }}
      onClick={() => router.push(`/${video.name}/${video.id}`)}
    >
      <Image
        width={200}
        height={250}
        src={String(video.poster)}
        preview={false}
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
  );
};

export { VideoCard };
