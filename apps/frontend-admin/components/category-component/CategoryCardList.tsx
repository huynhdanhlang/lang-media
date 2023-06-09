import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import {
  VideoEntity,
  useFindAllCategoryQuery,
  useFindAllVideoQuery,
} from '@training-project/data-access';
import { Image, Space, notification } from 'antd';
import Loading from '../Loading';
import { backgroudBorder } from '../shared/theme';

const CategoryCardList = () => {
  const { loading, data, error } = useFindAllCategoryQuery();
  if (loading) return <Loading />;
  if (error) {
    notification.error(error);
  }
  return (
    <Space wrap size={'small'}>
      {data &&
        data.findAllCategory.map((category) => (
          <ProCard
            title={category.name}
            style={{
              // maxWidth: 500,
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
            {/* <Image width={200} height={200} src={video.poster} /> */}
            {/* <div>{category.}</div> */}
          </ProCard>
        ))}
    </Space>
  );
};

export default CategoryCardList;
