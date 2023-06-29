import { Layout, theme, Divider } from 'antd';
import styled from 'styled-components';
import VideoCardList from '../components/video/VideoCardList';

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
    <>
      <StyledPage>
        <Divider className="text-style">Mới cập nhật</Divider>
        <VideoCardList />
      </StyledPage>{' '}
      <style jsx global>
        {``}
      </style>
    </>
  );
}

export default Index;
