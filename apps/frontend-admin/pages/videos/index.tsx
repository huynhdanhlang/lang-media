import Head from 'next/head';
import UserList from '../../components/user-components';
import { Space } from 'antd';
import { ProCard } from '@ant-design/pro-components';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import VideoManagement from 'apps/frontend-admin/components/video-components/VideoManagement';

export default () => {
  //   const { isAuthenticated } = useAuth0()
  //   if (!isAuthenticated) return <AuthPage />

  return <VideoManagement />;
};
