import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { VideoEntity } from '@training-project/data-access';
import { Image, Space } from 'antd';
interface IVideoList {
  videos: Omit<VideoEntity, 'tags'>[];
}
const VideoCardList = (props: IVideoList) => {
  return (
    <Space wrap size={'large'}>
      {props?.videos?.map((video) => (
        <ProCard
          title={video.name}
          style={{ maxWidth: 500 }}
          bordered
          actions={[
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Image width={300} height={300} src={video.poster} />
          <div>{video.url}</div>
        </ProCard>
      ))}
    </Space>
  );
};

export default VideoCardList;
