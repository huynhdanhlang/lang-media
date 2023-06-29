import { Layout } from 'antd';
import styled, { css } from 'styled-components';

const MainLayout = styled(({ collapsed: _, ...props }) => (
  <Layout {...props} />
))`
  transition: 0.2s all;
  ${({ collapsed }) =>
    collapsed
      ? css`
          // margin-left: 0px;
        `
      : css`
          // margin-left: 40px;
        `};

  @media (max-width: 575.98px) {
    margin-left: 0;
  }
  background-color: rgb(21, 25, 33);
`;
interface IMain {
  children: React.ReactNode;
  collapsed: boolean;
}

const CNMain = ({ children, collapsed }: IMain) => (
  <MainLayout collapsed={collapsed}>{children}</MainLayout>
);

export default CNMain;
