import { PlusOutlined } from '@ant-design/icons';
import { ProFormRadio } from '@ant-design/pro-components';
import {
  FindAllCategoryQuery,
  Loading,
  titleFixed,
  useFindAllCategoryQuery,
} from '@training-project/data-access';
import { FloatButton, notification } from 'antd';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import VideoCardList from './VideoCardList';
interface IVideoManagement {}
const VideoManagement = (props: IVideoManagement) => {
  const router = useRouter();
  const [categories, setCategories] = useState<FindAllCategoryQuery>(null);
  const { data, loading, error } = useFindAllCategoryQuery();
  const [type, setType] = useState<string>(null);
  const [options, setOptions] = useState<string[]>([]);
  useEffect(() => {
    if (data && data.findAllCategory) {
      setCategories(data);
      setOptions(data.findAllCategory.map((category) => category.name));
    }
  }, [data]);

  useEffect(() => {
    if (options?.length) {
      if (!isEmpty(router.query)) {
        const categoryName = options.find(
          (category) => category === router.query.categoryName
        );
        setType(categoryName);
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
