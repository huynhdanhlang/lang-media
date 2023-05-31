import { Layout, Dropdown, Menu, Button } from 'antd';
const { Header } = Layout;
import styled from 'styled-components';
import { Logo } from './LogoTitle';
import Link from 'next/link';
import nookies from 'nookies';
import Router from 'next/router';
import Icon, { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useRecoilValue } from 'recoil';
import { siderWidthState } from 'apps/frontend-admin/stores/sider';
const TriggerBlock = styled.div`
  display: inline-block;
  height: 100%;
`;

const StyledImageBlock = styled(TriggerBlock)`
  @media (min-width: 576px) {
    display: none !important;
  }

  padding-left: 24px;
  ${'' /* cursor: pointer; */}
`;

const MobileLogo = styled(Logo)`
  vertical-align: -10px;
`;

const HeaderBlock = styled(TriggerBlock)`
  padding: 0 12px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(0, 0, 0, 0.025);
  }
`;

const MyMenu = () => {
  // const { logout, user } = useAuth0();
  return (
    <Menu
      onClick={(item) => {
        if (item.key == 'logout') {
          // logout({
          //   returnTo:
          //     process.env.NODE_ENV === 'development'
          //       ? 'http://localhost:3000'
          //       : 'https://dashboard.uowac.now.sh',
          //   client_id: process.env.AUTH0_CLIENT_ID,
          // });
          nookies.destroy({}, 'auth0.is.authenticated');
          nookies.destroy({}, 'accessToken');
        } else if (item.key == 'profile') {
          // Router.push('/users/id/[id]', `/users/id/${user.sub}`);
        }
      }}
    >
      <Menu.Item key="profile">
        <Icon type="user" />
        Profile
      </Menu.Item>
      <Menu.Divider style={{ marginTop: -5, marginBottom: 0 }} />
      <Menu.Item key="logout">
        <Icon type="logout" />
        Logout
      </Menu.Item>
    </Menu>
  );
};
interface IHeader {
  collapsed: boolean;
  handleToggle: () => void;
}
const CNHeader = ({ collapsed, handleToggle }: IHeader) => {
  // const { isAuthenticated } = useAuth0();
  const siderWidth = useRecoilValue(siderWidthState);
  return (
    <Header
      style={{
        background: '#fff',
        padding: 0,
        boxShadow: '0 1px 4px rgba(0,21,41,.08)',
        display: 'flex',
        position: 'fixed',
        zIndex: 100,
        width: `calc(100% - ${siderWidth}px)`,
      }}
    >
      {/* <Link legacyBehavior href="/">
        <a>
          <StyledImageBlock>
            <MobileLogo src="/static/transparent-logo.png" alt="logo" />
          </StyledImageBlock>
        </a>
      </Link> */}

      <TriggerBlock className="trigger" onClick={handleToggle}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </TriggerBlock>

      {/* {isAuthenticated && ( */}
      <div
        style={{
          marginLeft: 'auto',
        }}
      >
        <Dropdown overlay={<MyMenu />} placement="bottomRight">
          <HeaderBlock>
            <Icon
              type="user"
              style={{ fontSize: 16, marginRight: 8 }}
              title="User"
            />
            <span>Admin</span>
          </HeaderBlock>
        </Dropdown>
      </div>
      {/* )}*/}
    </Header>
  );
};

export default CNHeader;
