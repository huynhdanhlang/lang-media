/**
 * Description: Drawer for page layout
 * Author: Hieu Chu
 */

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
export default ({ drawerVisible, closeDrawer, children }: IDrawer) => (
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
