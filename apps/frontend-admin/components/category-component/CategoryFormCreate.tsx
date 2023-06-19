import { CheckOutlined } from '@ant-design/icons';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { useCreateCategoryMutation } from '@training-project/data-access';
import { Typography, notification } from 'antd';
import { titleFixed, titleStyle } from '../../../../libs/data-access/src/shared/theme';

const iconStyles = {
  marginInlineStart: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const CategoryFormCreate = () => {
  const { useForm } = ProForm;
  const [form] = useForm();
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
    }).then(() => {
      notification.success({
        message: 'Thêm thể loại thành công',
      });
      form.resetFields();
    });
  };

  if (error) {
    notification.error(error);
  }

  const suffix = (
    <>
      <p
        style={{ color: '#F5222D', paddingRight: '10px', cursor: 'pointer' }}
        // onClick={() => props.onRemove()}
      >
        ✕
      </p>
      <CheckOutlined
        style={{ color: '#04BAE0' }}
        // onClick={() => props.onSubmit()}
      />
    </>
  );

  return (
    <>
      <div>
        <Text
          style={{
            ...titleStyle,
            ...titleFixed,
          }}
          className="text-style"
        >
          Thêm thể loại
        </Text>
      </div>
      <div
        style={{
          margin: '50px 24px 24px 24px',
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid rgba(152, 188, 252, 0.16)',
        }}
      >
        <ProForm
          form={form}
          onFinish={async (values: any) => {
            await handleSubmit(values);
            form.resetFields();
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
          style={{
            margin: 24,
          }}
        >
          {/* <ProForm.Group> */}
          <ProFormText
            width="md"
            name="name"
            label={<Text className="text-style">Tên thể loại</Text>}
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
    </>
  );
};

export default CategoryFormCreate;
