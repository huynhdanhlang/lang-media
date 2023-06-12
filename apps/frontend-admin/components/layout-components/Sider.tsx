import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { siderWidthState } from '../../stores/sider';
import { backgroudBorder, layoutStyle } from '../shared/theme';

const { Sider } = Layout;

const FixedSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);

  // @media (max-width: 575.98px) {
  //   display: none;
  // }
`;
interface ISider {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  children: React.ReactNode;
}
const CNFixedSider = ({ collapsed, setCollapsed, children }: ISider) => {
  let firstMounted = useRef(false);
  const [widthSider, setWidthSider] = useRecoilState(siderWidthState);

  useEffect(() => {
    setWidthSider(collapsed ? 80 : 256);
  }, [collapsed]);

  useEffect(() => {
    firstMounted.current = true;
  }, []);

  return (
    <FixedSider
      trigger={null}
      width={widthSider}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      style={{
        position: 'sticky',
        top: 0,
        ...backgroudBorder({
          isSetBorder: true,
          ...layoutStyle
        }),
      }}
      onBreakpoint={(collapsed) => {
        firstMounted.current && setCollapsed(collapsed);
      }}
    >
      {children}
    </FixedSider>
  );
};

export default CNFixedSider;
