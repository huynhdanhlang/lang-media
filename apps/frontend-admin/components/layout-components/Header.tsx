import { Layout, Dropdown, Menu, Button, notification } from 'antd';
const { Header } = Layout;
import styled from 'styled-components';
import { Logo } from './LogoTitle';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Icon, { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { siderWidthState } from 'apps/frontend-admin/stores/sider';
import { userState } from 'apps/frontend-admin/stores/user';
import Loading from '../Loading';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { backgroudBorder, layoutStyle } from '../shared/theme';
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
  const { user, signOut } = useContext(AuthContext);
  const router = useRouter();
  return (
    <Menu
      onClick={(item) => {
        if (item.key == 'logout') {
          signOut();
        } else if (item.key == 'profile') {
          router.push('/users/id/[id]', `/users/id/${user.id}`);
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
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  if (!user) {
    router.replace(router.asPath, '/login');
  }
  return (
    user && (
      <Header
        style={{
          padding: 0,
          boxShadow: '0 1px 4px rgba(0,21,41,.08)',
          display: 'flex',
          position: 'fixed',
          zIndex: 100,
          width: `calc(100% - ${siderWidth}px)`,
          ...backgroudBorder({
            isSetBorder: true,
            ...layoutStyle
          }),
        }}
      >
        {/* <Link legacyBehavior href="/">
        <a>
          <StyledImageBlock>
            <MobileLogo src="/static/transparent-logo.png" alt="logo" />
          </StyledImageBlock>
        </a>
      </Link> */}

        <TriggerBlock
          style={{
            color: 'lightblue',
          }}
          className="trigger"
          onClick={handleToggle}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </TriggerBlock>

        {/* {isAuthenticated && ( */}
        <div
          style={{
            marginLeft: 'auto',
            color: 'lightblue',
          }}
        >
          <Dropdown overlay={<MyMenu />} placement="bottomRight">
            <HeaderBlock>
              <Icon
                type="user"
                style={{ fontSize: 16, marginRight: 15 }}
                title="User"
              />
              <span>{String(user.fullname)}</span>
            </HeaderBlock>
          </Dropdown>
        </div>
        {/* )}*/}
      </Header>
    )
  );
};

export default CNHeader;
