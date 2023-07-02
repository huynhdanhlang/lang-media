import { MenuProps } from 'antd';
import { MenuItemType, SubMenuType } from 'antd/es/menu/hooks/useItems';
import React from 'react';
export type MenuItem = Required<MenuProps>['items'][number];
export const getItemComponent = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
  props?: Partial<MenuItemType>
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
    ...props,
  } as unknown as MenuItem;
};
