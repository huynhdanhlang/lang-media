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
import { Image, Space, notification, Layout } from 'antd';
import Loading from '../Loading';
import { backgroudBorder } from '../shared/theme';
import { colors } from './categoryStyle';

const CategoryCardList = () => {
  const { loading, data, error } = useFindAllCategoryQuery();
  if (error) {
    notification.error(error);
  }
  const length = colors.length;
  return (
    <Space wrap size={'small'}>
      {data &&
        data.findAllCategory.map((category) => (
          <ProCard
            loading={loading}
            title={category.name}
            hoverable={true}
            className="category-list"
            style={{
              width: 260,
              ...backgroudBorder({
                background: `#${colors[Math.floor(Math.random() * length)]}`,
                isSetBorder: false,
              }),
              filter: 'brightness(0.8)',
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
      <style jsx global>{`
        .ant-pro-card .ant-pro-card-title {
          font-size: 18px;
          font-weight: bold;
        }
      `}</style>
    </Space>
  );
};

export default CategoryCardList;
