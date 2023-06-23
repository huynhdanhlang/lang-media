import {
  Loading,
  VideoCard,
  useFindAllVideoQuery,
} from '@training-project/data-access';
import { Space, notification } from 'antd';
import { useRouter } from 'next/router';

export const VideoSearch = () => {
  const router = useRouter();

  const { data, error, loading } = useFindAllVideoQuery({
    variables: {
      videoFilter: {
        where: {
          name: String(router.query.name),
        },
      },
    },
  });

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
        {data.findAllVideo.length
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
          {data.findAllVideo.map((video) => (
            <VideoCard video={video} />
          ))}
        </Space>
      </div>
    </>
  );
};

export default VideoSearch;
