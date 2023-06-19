import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useFindAllCategoryQuery } from '@training-project/data-access';
import { Space, Typography, notification } from 'antd';
import { backgroudBorder } from '../../../../libs/data-access/src/shared/theme';
import { randomColor } from '../shared/utils';
import { useRouter } from 'next/router';

const CategoryCardList = () => {
  const router = useRouter();
  const { loading, data, error } = useFindAllCategoryQuery();
  if (error) {
    notification.error(error);
  }
  const { Text } = Typography;
  return (
    <Space wrap size={'small'}>
      {data &&
        data.findAllCategory.map((category) => (
          <ProCard
            loading={loading}
            title={<Text className="text-style">{category.name}</Text>}
            onClick={() => router.push(`/videos?categoryName=${category.name}`)}
            hoverable={true}
            className="category-list"
            style={{
              width: 260,
              ...backgroudBorder({
                background: `#${randomColor()}`,
                isSetBorder: false,
              }),
              filter: 'brightness(0.8)',
            }}
            bordered
            actions={[
              <EditOutlined key="edit" className="text-style" />,
              <EllipsisOutlined key="ellipsis" className="text-style" />,
            ]}
          >
            {/* <Image width={200} height={200} src={video.poster} /> */}
            {/* <div>{category.}</div> */}
          </ProCard>
        ))}
      <style jsx global>{`
        div.ant-pro-card-header div.ant-pro-card-title span.text-style {
          font-size: 18px;
          font-weight: bold;
        }
      `}</style>
    </Space>
  );
};

export default CategoryCardList;
