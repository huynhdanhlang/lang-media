import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import {
  VideoEntity,
  useFindAllVieoByCategroryQuery,
  Loading,
} from '@training-project/data-access';
import { Image, Space, notification } from 'antd';
import {
  backgroudBorder,
  profileStyle,
} from '../../../../libs/data-access/src/shared/theme';
interface IVideoList {
  videoIds?: number[];
  isEachCategory?: boolean;
  categoryId: number;
}
const VideoCardList = (props: IVideoList) => {
  const { loading, data, error } = useFindAllVieoByCategroryQuery({
    variables: {
      categoryId: props.categoryId,
    },
  });
  if (error) {
    notification.error(error);
  }
  return (
    <Space wrap size={'small'}>
      {data &&
        data.findAllVieoByCategrory.map((video) => (
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
            actions={[
              <EditOutlined key="edit" className="text-style" />,
              <EllipsisOutlined key="ellipsis" className="text-style" />,
            ]}
          >
            <Image width={200} height={250} src={video.poster} />
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
  );
};

export default VideoCardList;
