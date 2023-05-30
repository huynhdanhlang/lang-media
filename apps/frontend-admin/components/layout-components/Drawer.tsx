import { Drawer } from 'antd';
import styled from 'styled-components';

const StyledDrawer = styled(Drawer)`
  .ant-drawer-wrapper-body {
    overflow: hidden !important;
  }
`;
interface IDrawer {
  drawerVisible: boolean;
  closeDrawer: () => void;
  children: React.ReactNode;
}
const CNDrawer = ({ drawerVisible, closeDrawer, children }: IDrawer) => (
  <StyledDrawer
    placement="left"
    closable={false}
    onClose={closeDrawer}
    visible={drawerVisible}
    bodyStyle={{
      margin: 0,
      padding: 0,
    }}
  >
    {children}
  </StyledDrawer>
);

export default CNDrawer;