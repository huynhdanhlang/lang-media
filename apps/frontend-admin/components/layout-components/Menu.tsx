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
  MenuOutlined,
} from '@ant-design/icons';
import { COMPONENTS } from 'apps/frontend-admin/constant/components.const';
import { backgroudBorder, layoutStyle } from '../shared/theme';
const keys = ['/', '/videos', '/categories'];

const menu = [
  <Menu.Item key={keys[0]}>
    <Link legacyBehavior href={keys[0]}>
      <a>
        <DashboardFilled />
        <span>{COMPONENTS.DASHBOARD}</span>
      </a>
    </Link>
  </Menu.Item>,
  <Menu.Item key={keys[1]}>
    <Link legacyBehavior href={keys[1]}>
      <a>
        <TeamOutlined />
        <span>{COMPONENTS.VIDEO_MANAGEMENT}</span>
      </a>
    </Link>
  </Menu.Item>,
  <Menu.Item key={keys[2]}>
    <Link legacyBehavior href={keys[2]}>
      <a>
        <MenuOutlined />
        <span>{COMPONENTS.CATEGORY_MANAGEMENT}</span>
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
      defaultSelectedKeys={[keys[0]]}
      style={{
        ...style,
        padding: '16px 0',
        ...backgroudBorder({
          isSetBorder: false,
          ...layoutStyle
        }),
      }}
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
