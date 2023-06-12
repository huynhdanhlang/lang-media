import React, { useState } from 'react';
import { Layout } from 'antd';
const { Content } = Layout;
import FixedSider from '../layout-components/Sider';
import MainLayout from '../layout-components/Main';
import Header from '../layout-components/Header';
import LogoTitle from '../layout-components/LogoTitle';
import Menu from '../layout-components/Menu';
interface IMyLayout {
  children: React.ReactNode;
}

const MyLayout = (props: IMyLayout) => {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    if (window.innerWidth >= 576) {
      setCollapsed(!collapsed);
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
      <>
        <FixedSider
          collapsed={collapsed}
          setCollapsed={(collapsed) => {
            setCollapsed(collapsed);
          }}
        >
          <LogoTitle />

          <Menu closeDrawer={() => setCollapsed(false)} style={{}} />
        </FixedSider>

        <MainLayout collapsed={collapsed}>
          <Header collapsed={collapsed} handleToggle={toggle} />
          <Content
            style={{
              margin: '70px 16px 15px 16px',
              overflowX: 'auto',
              height: '100%',
              // backgroundImage: `url(${'https://m.media-amazon.com/images/I/81F5PF9oHhL._AC_UF894,1000_QL80_.jpg'})`
            }}
            className="content-layout"
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
      </>
    </Layout>
  );
};

export default MyLayout;
