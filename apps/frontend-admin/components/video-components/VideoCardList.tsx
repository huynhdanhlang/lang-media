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
    <Space>
      {props?.videos?.map((video) => (
        <ProCard
          title={video.name}
          style={{ maxWidth: 300 }}
          bordered
          actions={[
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis"/>,
          ]}
        >
          {/* <Image src={}/> */}
        </ProCard>
      ))}
    </Space>
  );
};

export default VideoCardList;
