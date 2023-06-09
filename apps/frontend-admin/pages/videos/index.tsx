import Head from 'next/head';
import UserList from '../../components/user-components';
import VideoManagement from 'apps/frontend-admin/components/video-components/FormCreate';
import { Space } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import VideoCardList from 'apps/frontend-admin/components/video-components/VideoCardList';

export default () => {
  //   const { isAuthenticated } = useAuth0()
  //   if (!isAuthenticated) return <AuthPage />

  return (
    <Space>
      {/* <VideoCardList /> */}
    </Space>
  );
};
