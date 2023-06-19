import { Layout, theme } from 'antd';
import { MyHeader } from '../components/layout/Header';
import ImageSlider from '../components/layout/Carousel';
import { Content, Footer } from 'antd/es/layout/layout';
import { CNLogo as LogoTitle } from '@training-project/data-access';
import { backgroudBorder, layoutStyle } from '@training-project/data-access';

interface ILayout {
  children: React.ReactNode;
}
const LayoutCPN = (props: ILayout) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      className="site-layout"
      style={{
        marginLeft: 200,
        marginRight: 200,
        backgroundColor: 'rgb(21, 25, 33)',
      }}
    >
      <MyHeader
        style={{
          padding: 0,
          position: 'sticky',
          top: '0',
          height: 80,
          zIndex: 10,
          alignItems: 'center',
          ...backgroudBorder({
            isSetBorder: true,
            background: layoutStyle.background,
          }),
        }}
      >
        <LogoTitle />
      </MyHeader>
      <ImageSlider />
      <Content
        style={{
          margin: '24px 16px 0',
          overflow: 'initial',
          flex: 1,
          minHeight: 'calc(100vh - 550px)', // 550px comming from header + footer
        }}
      >
        {props.children}
      </Content>
      <Footer
        style={{
          textAlign: 'center',
          position: 'sticky',
          top: '0',
          ...layoutStyle,
        }}
        className="text-style"
      >
        Làng Media ©2023 Created by @huynhdanhlang
      </Footer>
    </Layout>
  );
};

export default LayoutCPN;
