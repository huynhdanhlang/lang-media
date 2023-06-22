import { Button, Menu, MenuProps, Typography } from 'antd';
import {
  RightOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { MenuItem, getItemComponent } from 'apps/frontend/utils/menu';
import { HEADER_CONSTANT } from 'apps/frontend/constant/header.const';
import { useEffect, useState } from 'react';
import {
  CNLogo,
  FindAllCategoryQuery,
  useFindAllCategoryQuery,
  useFindAllVideoQuery,
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

  const handleOnSearch = (value: string) => {
    router.push(`/search?name=${value}`);
  };


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
        enterButton={
          <Button icon={<SearchOutlined />}>
            Tìm kiếm
          </Button>
        }
        size="middle"
        styles={{
          input: {
            lineHeight: '22.5px',
          },
        }}
        onSearch={handleOnSearch}
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
