/**
 * Description: Main layout component of the app
 * Author: Hieu Chu
 */

import React, { useState } from 'react';
import { Layout } from 'antd';
const { Content } = Layout;
import nookies from 'nookies';

import FixedSider from './layout-components/Sider';
import MainLayout from './layout-components/Main';
import Header from './layout-components/Header';
import LogoTitle from './layout-components/LogoTitle';
import Drawer from './layout-components/Drawer';
import Menu from './layout-components/Menu';

interface IMyLayout {
  children: React.ReactNode;
}

const MyLayout = (props: IMyLayout) => {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    if (window.innerWidth >= 576) {
      setCollapsed(!collapsed);
      nookies.set({}, 'collapsed', JSON.stringify(collapsed), {
        path: '/',
      });
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <FixedSider
        collapsed={collapsed}
        setCollapsed={(collapsed) => {
          setCollapsed(collapsed);
          nookies.set({}, 'collapsed', JSON.stringify(collapsed), {
            path: '/',
          });
        }}
      >
        <LogoTitle />

        <Menu closeDrawer={() => setCollapsed(false)} style={{}} />
      </FixedSider>

      <MainLayout collapsed={collapsed}>
        <Header collapsed={collapsed} handleToggle={toggle} />
        <Content
          style={{
            margin: '20px 16px 15px 16px',
          }}
        >
          {children}
        </Content>
      </MainLayout>
      {/* 
      <Drawer
        drawerVisible={drawerVisible}
        closeDrawer={() => setDrawerVisible(false)}
      >
        <LogoTitle />

        <Menu
          style={{ minHeight: '100vh' }}
          closeDrawer={() => setDrawerVisible(false)}
        />
      </Drawer> */}
    </Layout>
  );
};

export default MyLayout;
