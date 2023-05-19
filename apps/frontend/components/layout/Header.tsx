import { Menu, MenuProps } from 'antd';
import { RightOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { categories } from 'apps/frontend/mock/data';
import { MenuItem, getItemComponent } from 'apps/frontend/utils/menu';

export interface IBase {
  style?: React.CSSProperties;
}

export interface IHeaders extends IBase {}
export const MyHeader = (props: IHeaders) => {
  const childCategories: MenuItem[] = categories.map((value) => {
    return getItemComponent(value.name, value.id, <RightOutlined />);
  });

  const items: MenuProps['items'] = [
    getItemComponent('Hello', 'hel', <UnorderedListOutlined />, [
        getItemComponent('child-hello', 'child-hel'),
    ]),
    getItemComponent('Thể loại', 'cate', <UnorderedListOutlined />, childCategories),
  ];

  return <Menu {...props} mode="horizontal" items={items} onClick={(e)=>console.log(e.key)}></Menu>;
};
