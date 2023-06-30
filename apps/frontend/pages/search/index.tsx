import {
  Loading,
  VideoCard,
  useFindAllCategoryQuery,
  useFindAllVideoQuery,
} from '@training-project/data-access';
import { Space, notification } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const VideoSearch = () => {
  const router = useRouter();
  const [videos, setVideos] = useState([]);
  const filter = {
    where: {
      name: {
        like: String(router.query.name),
      },
    },
  };
  console.log(router.query);

  const { data, error, loading } =
    router.query.type === 'category'
      ? useFindAllCategoryQuery({
          variables: {
            categoryFilter: {
              ...filter,
              include: [
                {
                  association: 'videos',
                },
              ],
            },
          },
        })
      : useFindAllVideoQuery({
          variables: {
            videoFilter: filter,
          },
        });

  useEffect(() => {
    if (data) {
      if (data['findAllCategory'][0]['videos']) {
        setVideos(data['findAllCategory'][0]['videos']);
      }
      if (data['findAllVideo']) {
        setVideos(data['findAllVideo']);
      }
    }
  }, [data]);

  if (loading) return <Loading />;
  if (error) {
    notification.error(error);
  }
  return (
    <>
      <div
        className="text-style"
        style={{
          fontSize: 24,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        {videos.length
          ? `Tìm kiếm liên quan đến '${router.query.name}'`
          : `Không tìm thấy từ khóa ${router.query.name}`}
      </div>
      <div
        style={{
          marginTop: 70,
          marginLeft: 70,
          display: 'flex',
          justifyContent: 'start',
        }}
      >
        <Space size={'small'} style={{ marginBottom: 30 }}>
          {videos.map((video) => (
            <VideoCard video={video} />
          ))}
        </Space>
      </div>
    </>
  );
};

export default VideoSearch;
