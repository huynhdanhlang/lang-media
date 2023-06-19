import { PlusOutlined } from '@ant-design/icons';
import { FloatButton, Typography } from 'antd';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { titleFixed, titleStyle } from '../../../../libs/data-access/src/shared/theme';
import CategoryCardList from './CategoryCardList';

interface ICategoryManagement {}
const CategoryManagement = (props: ICategoryManagement) => {
  const router = useRouter();
  const renderCategoryList = useCallback(() => {
    return <CategoryCardList />;
  }, []);

  return (
    <>
      <div>
        <Typography.Text
          style={{
            ...titleStyle,
            ...titleFixed,
          }}
          className="text-style"
        >
          Danh mục phim
        </Typography.Text>
      </div>
      <div
        style={{
          marginTop: 70,
          marginLeft: 70,
          height: '100%',
          // display: 'flex',
          // justifyContent: 'center',
        }}
      >
        {renderCategoryList()}
      </div>
      <FloatButton
        onClick={() => router.push('/categories/create')}
        shape="circle"
        type="primary"
        style={{ right: 50 }}
        icon={<PlusOutlined />}
      />
    </>
  );
};

export default CategoryManagement;
