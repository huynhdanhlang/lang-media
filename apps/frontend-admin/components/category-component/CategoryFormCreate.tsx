import {
  AlipayCircleOutlined,
  LockOutlined,
  PlusOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import {
  ProForm,
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Button, message, notification, Space, Typography } from 'antd';
import { useState } from 'react';
import { notificationStyle } from '../shared/theme';
import { useCreateCategoryMutation } from '@training-project/data-access';

const iconStyles = {
  marginInlineStart: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const CategoryFormCreate = () => {
  const { Text } = Typography;
  const [createCategory, { data, loading, error }] =
    useCreateCategoryMutation();
  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const handleSubmit = async (values: any) => {
    await createCategory({
      variables: {
        createCategoryInput: {
          name: values.name,
        },
      },
    }).then(() => {
      notification.success({
        message: 'Đã thêm thành công',
        style: {
          ...notificationStyle,
        },
      });
    });
  };

  if (error) {
    notification.info({
      ...error,
      style: {
        ...notificationStyle,
      },
    });
  }

  return (
    <>
      <div>
        <Text
          style={{
            fontSize: 28,
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 'bold',
          }}
        >
          Thêm thể loại
        </Text>
        <div
          style={{
            margin: 24,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <ProForm
            onFinish={async (values: any) => {
              handleSubmit(values);
            }}
            submitter={{
              searchConfig: {
                submitText: 'Thêm',
                resetText: 'Hoàn tác',
              },
              resetButtonProps: {
                style: {
                  background: 'gray',
                },
              },
            }}
          >
            {/* <ProForm.Group> */}
            <ProFormText
              width="md"
              name="name"
              label="Tên thể loại"
              tooltip="Tên thể loại bạn muốn thêm"
              placeholder="Nhập tên thể loại"
              required
              rules={[
                {
                  required: true,
                  message: 'Tên người dùng không hợp lệ!',
                },
              ]}
            />
            {/* <ProFormText
              width="md"
              name="company"
              label="我方公司名称"
              placeholder="请输入名称"
            /> */}
            {/* </ProForm.Group> */}
            {/* <ProForm.Group>
            <ProFormText
              name={['contract', 'name']}
              width="md"
              label="合同名称"
              placeholder="请输入名称"
            />
            <ProFormDateRangePicker
              width="md"
              name={['contract', 'createTime']}
              label="合同生效时间"
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              options={[
                {
                  value: 'chapter',
                  label: '盖章后生效',
                },
              ]}
              readonly
              width="xs"
              name="useMode"
              label="合同约定生效方式"
            />
            <ProFormSelect
              width="xs"
              options={[
                {
                  value: 'time',
                  label: '履行完终止',
                },
              ]}
              name="unusedMode"
              label="合同约定失效效方式"
            />
          </ProForm.Group>
          <ProFormText width="sm" name="id" label="主合同编号" />
          <ProFormText
            name="project"
            width="md"
            disabled
            label="项目名称"
            initialValue="xxxx项目"
          />
          <ProFormText
            width="xs"
            name="mangerName"
            disabled
            label="商务经理"
            initialValue="启途"
          /> */}
          </ProForm>
        </div>
      </div>
    </>
  );
};

export default CategoryFormCreate;
