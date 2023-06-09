import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import {
  VideoEntity,
  useFindAllVideoQuery,
} from '@training-project/data-access';
import { Image, Space, notification } from 'antd';
import Loading from '../Loading';
import { backgroudBorder } from '../shared/theme';
interface IVideoList {
  videoIds: number[];
}
const VideoCardList = (props: IVideoList) => {
  const { loading, data, error } = useFindAllVideoQuery({
    variables: {
      videoFilter: {
        where: {
          id: props.videoIds,
        },
      },
    },
  });
  if (loading) return <Loading />;
  if (error) {
    notification.error(error);
  }
  return (
    <Space wrap size={'small'}>
      {data &&
        data.findAllVideo.map((video) => (
          <ProCard
            title={video.name}
            style={{
              maxWidth: 500,
              ...backgroudBorder({
                background: 'rgba(220, 220, 242, 0.65)',
                isSetBorder: false,
              }),
            }}
            bordered
            actions={[
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Image width={200} height={200} src={video.poster} />
            <div>{video.description}</div>
          </ProCard>
        ))}
    </Space>
  );
};

export default VideoCardList;
