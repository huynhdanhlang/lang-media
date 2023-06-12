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
import { notificationStyle, titleFixed, titleStyle } from '../shared/theme';
import { useCreateCategoryMutation } from '@training-project/data-access';

const iconStyles = {
  marginInlineStart: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const VideoFormCreate = () => {
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
    createCategory({
      variables: {
        createCategoryInput: {
          name: values.name,
        },
      },
    });
  };

  if (data) {
    notification.success({
      message: 'Đã thêm thành công',
    });
  }

  if (error) {
    notification.error(error);
  }

  return (
    <>
      <div>
        <Text
          style={{
            ...titleStyle,
            ...titleFixed,
          }}
        >
          Thêm thể loại
        </Text>
      </div>
      <div
        style={{
          margin: '50px 24px 24px 24px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <ProForm
          onFinish={async (values: any) => {
            await handleSubmit(values);
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
          <ProForm.Group>
            <ProFormText
              width="md"
              name="name"
              label="Tên video"
              tooltip="Tên video bạn muốn thêm"
              placeholder="Nhập tên video"
              required
              rules={[
                {
                  required: true,
                  message: 'Tên video là bắt buộc!',
                },
              ]}
            />
            <ProFormTextArea
              width="lg"
              name="Disscription"
              label="Mô tả"
              placeholder="Nhập mô tả về video"
            />
          </ProForm.Group>
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
          </ProForm.Group> */}
          {/* <ProForm.Group> */}
          {/* <ProFormSelect
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
            /> */}
          <ProFormSelect
            width="md"
            initialValue={'Tiếng Việt'}
            options={[
              {
                value: 'time',
                label: 'Tiếng Việt',
              },
            ]}
            name="unusedMode"
            label="Ngôn ngữ"
            fieldProps={{
              dropdownStyle: {
                background: 'lightblue',
                color: 'black; !improtant',
              },
              mode: 'tags',
            }}
          />
          {/* </ProForm.Group> */}
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
          />
        </ProForm>
      </div>
    </>
  );
};

export default VideoFormCreate;
