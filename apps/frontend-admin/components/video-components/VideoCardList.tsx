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
import { backgroudBorder, profileStyle } from '../shared/theme';
interface IVideoList {
  videoIds?: number[];
  isEachCategory?: boolean;
}
const VideoCardList = (props: IVideoList) => {
  const buildQuery = props.isEachCategory
    ? {
        where: {
          id: props.videoIds,
        },
      }
    : {};
  const { loading, data, error } = useFindAllVideoQuery({
    variables: {
      videoFilter: {
        ...buildQuery,
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
            // title={video.name}
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
            actions={[
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Image width={200} height={250} src={video.poster} />
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                background: 'bottom',
                fontWeight: 'lighter',
              }}
            >
              {video.description}
            </div>
          </ProCard>
        ))}
    </Space>
  );
};

export default VideoCardList;
