import { Typography } from 'antd';
import { titleFixed, titleStyle } from '@training-project/data-access';
import { useRouter } from 'next/router';
import TagCardList from './TagList';
import { useCallback } from 'react';

const TagManagement = () => {
  const router = useRouter();
  const renderTagList = useCallback(() => {
    return <TagCardList />;
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
          Tag video
        </Typography.Text>
      </div>
      <div
        style={{
          marginTop: 70,
          marginLeft: 70,
          height: '100%',
          position: 'fixed',
          // display: 'flex',
          // justifyContent: 'center',
        }}
      >
        {renderTagList()}
      </div>
    </>
  );
};
export default TagManagement;
