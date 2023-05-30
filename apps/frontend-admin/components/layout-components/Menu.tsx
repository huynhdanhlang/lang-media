import { Menu } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CSSProperties } from 'react';
import {
  DashboardFilled,
  TrophyFilled,
  CodeSandboxCircleFilled,
  TeamOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
const keys = ['/', '/sculptures', '/makers', '/users', '/recent-activity'];

const menu = [
  <Menu.Item key={keys[0]}>
    <Link legacyBehavior href={keys[0]}>
      <a>
        <DashboardFilled />
        <span>Dashboard</span>
      </a>
    </Link>
  </Menu.Item>,
  <Menu.Item key={keys[1]}>
    <Link legacyBehavior href={keys[1]}>
      <a>
        <TrophyFilled />
        <span>Sculptures</span>
      </a>
    </Link>
  </Menu.Item>,
  <Menu.Item key={keys[2]}>
    <Link legacyBehavior href={keys[2]}>
      <a>
        <CodeSandboxCircleFilled />
        <span>Makers</span>
      </a>
    </Link>
  </Menu.Item>,
  <Menu.Item key={keys[3]}>
    <Link legacyBehavior href={keys[3]}>
      <a>
        <TeamOutlined />
        <span>Users</span>
      </a>
    </Link>
  </Menu.Item>,
  <Menu.Item key={keys[4]}>
    <Link legacyBehavior href={keys[4]}>
      <a>
        <HistoryOutlined />
        <span>Recent Activity</span>
      </a>
    </Link>
  </Menu.Item>,
];

interface IMenu {
  style?: CSSProperties;
  closeDrawer: () => void;
}

const CNMenu = ({ style, closeDrawer }: IMenu) => {
  const router = useRouter();
  const currentPath = router.route;
  let selectedKeys = [];

  for (let i = keys.length - 1; i >= 0; i--) {
    if (currentPath.includes(keys[i])) {
      selectedKeys = [keys[i]];
      break;
    }
  }

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={selectedKeys}
      style={{ ...style, padding: '16px 0' }}
      onClick={({ key }) => {
        closeDrawer();
        router.push(key);
      }}
    >
      {menu}
    </Menu>
  );
};

export default CNMenu;
