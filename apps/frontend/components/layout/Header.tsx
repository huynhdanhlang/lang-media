import { Menu, MenuProps, Typography } from 'antd';
import { RightOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { MenuItem, getItemComponent } from 'apps/frontend/utils/menu';
import { HEADER_CONSTANT } from 'apps/frontend/constant/header.const';
import { useEffect, useState } from 'react';
import {
  CNLogo,
  FindAllCategoryQuery,
  useFindAllCategoryQuery,
} from '@training-project/data-access';
import { useRouter } from 'next/router';
import Search from 'antd/es/input/Search';
export interface IBase {
  style?: React.CSSProperties;
}

export interface IHeaders extends IBase {
  children: React.ReactNode;
}
export const MyHeader = (props: IHeaders) => {
  const router = useRouter();
  const [categories, setCategories] = useState<FindAllCategoryQuery>(null);
  const { data, error, loading } = useFindAllCategoryQuery();
  useEffect(() => {
    if (data && data.findAllCategory) {
      setCategories(data);
    }
  }, [data]);

  const childCategories: MenuItem[] = categories?.findAllCategory?.map(
    (value) => {
      return getItemComponent(
        value.name,
        value.id,
        <RightOutlined />,
        null,
        null,
        {
          className: 'category-item',
          style: {
            color: 'white',
            maxHeight: 200,
          },
        }
      );
    }
  );

  const items: MenuProps['items'] = [
    getItemComponent(<CNLogo />, 'logo', null, null, null, {
      disabled: true,
      onClick: () => router.replace('/'),
    }),
    getItemComponent(
      <Typography.Text className="text-style">
        {HEADER_CONSTANT.CATEGORY}
      </Typography.Text>,
      'cate',
      <UnorderedListOutlined className="text-style" />,
      childCategories
    ),
    getItemComponent(
      <Search
        placeholder="Nhập tên video muốn tìm"
        allowClear
        enterButton="Tìm kiếm"
        size="middle"
        onSearch={(e) => {}}
      />,
      'logo',
      null,
      null,
      null,
      {
        style: {
          marginLeft: 'auto',
        },
        disabled: true,
      }
    ),
  ];

  return (
    <>
      <Menu
        {...props}
        mode="horizontal"
        items={items}
        onClick={(e) => console.log(e.key)}
      ></Menu>
      <style jsx global>
        {`
          .ant-menu-submenu-popup .ant-menu-sub:has(.category-item) {
            background: #1d1d1d;
          }
        `}
      </style>
    </>
  );
};
