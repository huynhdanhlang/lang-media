import { Layout, theme } from 'antd';
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
    <StyledPage>
      <VideoCardList/>
    </StyledPage>
  );
}

export default Index;
