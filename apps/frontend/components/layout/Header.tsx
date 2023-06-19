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
      return getItemComponent(value.name, value.id, <RightOutlined />);
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
  ];

  return (
    <Menu
      {...props}
      mode="horizontal"
      items={items}
      onClick={(e) => console.log(e.key)}
    ></Menu>
  );
};
