import { Layout, notification, theme } from 'antd';
import { MyHeader } from '../components/layout/Header';
import ImageSlider from '../components/layout/Carousel';
import { Content, Footer } from 'antd/es/layout/layout';
import { CNLogo as LogoTitle } from '@training-project/data-access';
import { backgroudBorder, layoutStyle } from '@training-project/data-access';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { isSupported } from 'firebase/messaging';
import { onMessageListener, requestForToken } from '../public/firebase-messaging-sw';

interface ILayout {
  children: React.ReactNode;
}
const LayoutCPN = (props: ILayout) => {
  const router = useRouter();
  const [isShowImageSidler, setIsShowImageSidler] = useState(false);
  useEffect(() => {
    (async () => {
      const hasFirebaseMessagingSupport = await isSupported();
      if (hasFirebaseMessagingSupport) {
        await requestForToken();
      }
    })();
  }, []);
  useEffect(() => {
    onMessageListener().then((data: any) => {
      console.log("🚀 ~ file: Layout.tsx:28 ~ onMessageListener ~ data:", data)
      notification.info({
        message: data,
      });
    });
  });
  useEffect(() => {
    console.log(router.asPath);

    if (router.asPath === '/' || router.asPath === 'videos') {
      setIsShowImageSidler(true);
    }
  }, [router]);
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
      <Content
        style={{
          margin: '24px 16px 0',
          overflow: 'initial',
          flex: 1,
          minHeight: 'calc(100vh - 550px)', // 550px comming from header + footer
        }}
      >
        {isShowImageSidler && (
          <ImageSlider style={{ height: 400, border: 'unset' }} />
        )}
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
