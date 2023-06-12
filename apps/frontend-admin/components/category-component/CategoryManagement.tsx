import {
  FindAllCategoryQuery,
  useFindAllCategoryQuery,
} from '@training-project/data-access';
import Loading from '../Loading';
import { notification, Divider, FloatButton, Typography } from 'antd';
import { ProFormRadio } from '@ant-design/pro-components';
import { useCallback, useEffect, useState } from 'react';
import CategoryCardList from './CategoryCardList';
import { PlusCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { titleFixed, titleStyle } from '../shared/theme';

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
        >
          Danh mục phim
        </Typography.Text>
      </div>
      <div
        style={{
          marginTop: 50,
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
