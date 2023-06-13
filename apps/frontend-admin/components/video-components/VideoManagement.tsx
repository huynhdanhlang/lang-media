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

interface IVideoManagement {}
const VideoManagement = (props: IVideoManagement) => {
  const router = useRouter();
  const [categories, setCategories] = useState<FindAllCategoryQuery>(null);
  const { data, loading, error } = useFindAllCategoryQuery();
  const [type, setType] = useState<string>(null);

  useEffect(() => {
    if (data && data.findAllCategory) {
      setCategories(data);
      setType(options[0]);
    }
  }, [data]);

  if (loading) <Loading />;
  if (error) {
    notification.error(error);
  }

  const renderVideoList = useCallback(() => {
    const category = categories?.findAllCategory.find((cg) => cg.name === type);
    const videoIds = category?.videos.map((video) => video.id);
    return <VideoCardList videoIds={videoIds} isEachCategory={true} />;
  }, [type]);

  const options = data?.findAllCategory.map((category) => category.name);

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
          marginTop: 50,
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