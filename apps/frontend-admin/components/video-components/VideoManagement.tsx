import {
  FindAllCategoryQuery,
  useFindAllCategoryQuery,
} from '@training-project/data-access';
import Loading from '../Loading';
import { notification, Divider, FloatButton } from 'antd';
import { ProFormRadio } from '@ant-design/pro-components';
import { useCallback, useEffect, useState } from 'react';
import VideoCardList from './VideoCardList';
import { titleFixed } from '../shared/theme';
import { useRouter } from 'next/router';
import { PlusOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
interface IVideoManagement {}
const VideoManagement = (props: IVideoManagement) => {
  const router = useRouter();
  const [categories, setCategories] = useState<FindAllCategoryQuery>(null);
  const { data, loading, error } = useFindAllCategoryQuery();
  const [type, setType] = useState<string>(null);

  useEffect(() => {
    if (data && data.findAllCategory) {
      setCategories(data);
    }
  }, [data]);
  const options = data?.findAllCategory.map((category) => category.name);

  useEffect(() => {
    if (options?.length) {
      if (!isEmpty(router.query)) {
        const t = options.find(
          (category) => category === router.query.categoryName
        );
        setType(
          options.find((category) => category === router.query.categoryName)
        );
      } else {
        setType(options[0]);
      }
    }
  }, [router, categories, options]);

  if (loading) <Loading />;
  if (error) {
    notification.error(error);
  }

  const renderVideoList = useCallback(() => {
    const category = categories?.findAllCategory.find((cg) => cg.name === type);
    const videoIds = category?.videos.map((video) => video.id);
    return (
      category && (
        <VideoCardList
          videoIds={videoIds}
          isEachCategory={true}
          categoryId={category.id}
        />
      )
    );
  }, [type]);

  return (
    <>
      <ProFormRadio.Group
        style={{
          margin: 16,
        }}
        options={options}
        radioType="button"
        formItemProps={{
          className: 'category-group',
          style: {
            ...titleFixed,
          },
        }}
        fieldProps={{
          value: type,
          onChange: (e) => setType(e.target.value),
          className: 'category-selection',
        }}
      />
      <div
        style={{
          marginTop: 70,
          marginLeft: 70,
          display: 'flex',
          justifyContent: 'start',
        }}
      >
        {renderVideoList()}
      </div>
      <FloatButton
        onClick={() => router.push('/videos/create')}
        shape="circle"
        type="primary"
        style={{ right: 50 }}
        icon={<PlusOutlined />}
      />
    </>
  );
};

export default VideoManagement;
