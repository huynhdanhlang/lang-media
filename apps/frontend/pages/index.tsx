import { Layout, theme } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { MyHeader } from '../components/layout/Header';
import ImageSlider from '../components/layout/Carousel';

const StyledPage = styled.div`
  .page {
  }
`;

const { Content, Footer } = Layout;

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <StyledPage>
      <Layout
        className="site-layout"
        style={{ marginLeft: 200, marginRight: 200 }}
      >
        <MyHeader style={{ padding: 0, background: colorBgContainer }} />
        <ImageSlider />
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </StyledPage>
  );
}

export default Index;
