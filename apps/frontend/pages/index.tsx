import { Layout, theme } from 'antd';
import styled from 'styled-components';

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
      <div>djfisbf jndejjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
        ejjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj
        emmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
        ejjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjju</div>
    </StyledPage>
  );
}

export default Index;
