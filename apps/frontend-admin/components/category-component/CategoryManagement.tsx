import {
  FindAllCategoryQuery,
  useFindAllCategoryQuery,
} from '@training-project/data-access';
import Loading from '../Loading';
import { notification, Divider, FloatButton } from 'antd';
import { ProFormRadio } from '@ant-design/pro-components';
import { useCallback, useEffect, useState } from 'react';
import CategoryCardList from './CategoryCardList';
import { PlusCircleTwoTone, PlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

interface ICategoryManagement {}
const CategoryManagement = (props: ICategoryManagement) => {
  const router = useRouter();
  const renderCategoryList = useCallback(() => {
    return <CategoryCardList />;
  }, []);

  return (
    <>
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
