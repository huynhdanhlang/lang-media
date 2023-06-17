import {
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import {
  useCreateVideoMutation,
  useFinalizeMultipartUploadMutation,
  useFindAllCategoryQuery,
  useFindAllTagQuery,
  useGetMultipartPreSignedUrlsMutation,
  useInitializeMultipartUploadMutation,
} from '@training-project/data-access';
import { Typography } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { UploadFile } from 'antd/lib/upload';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { titleFixed, titleStyle } from '../shared/theme';
import { randomColor } from '../shared/utils';
import { Uploader } from './Upload';
import { fetcher } from 'apps/frontend-admin/utils/fetcher';

const iconStyles = {
  marginInlineStart: '16px',
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '24px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};

const VideoFormCreate = () => {
  const { Text } = Typography;
  const [countries, setCountries] = useState<DefaultOptionType[]>([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [uploader, setUploader] = useState<Uploader[]>([]);
  const {
    loading: tagLoading,
    data: tagData,
    error: tagError,
  } = useFindAllTagQuery();
  const {
    loading: categoryLoading,
    data: categoryData,
    error: categoryError,
  } = useFindAllCategoryQuery();

  const [createVideo, { data, error, loading }] = useCreateVideoMutation();
  const [
    initializeMultipartUpload,
    { data: multiPartData, error: multiPartError },
  ] = useInitializeMultipartUploadMutation();
  const [
    getMultipartPreSignedUrl,
    { data: multiPartDataSigned, error: multiPartErrorSinged },
  ] = useGetMultipartPreSignedUrlsMutation();
  const [
    finalizeMultipartUpload,
    { data: multiPartDataFinal, error: multiPartErrorFinal },
  ] = useFinalizeMultipartUploadMutation();

  const mapSelectOption = (data: any[]) => {
    return data.map((val) => ({
      label: val.name,
      value: val.id,
    }));
  };

  useEffect(() => {
    if (tagData && tagData.findAllTag) {
      setTags(mapSelectOption(tagData.findAllTag));
    }
    if (categoryData && categoryData.findAllCategory) {
      setCategories(mapSelectOption(categoryData.findAllCategory));
    }
  }, [tagData, categoryData]);

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  useEffect(() => {
    async function getCountries() {
      const { data } = await fetcher({
        url: 'https://trial.mobiscroll.com/content/countries.json',
        method: 'GET',
        data: {},
        isApiServer: false,
      });
      const countries: any = [];
      for (let i = 0; i < data.length; ++i) {
        const country = data[i];
        countries.push({ label: country.text, value: country.value });
      }
      setCountries(countries);
    }
    getCountries();
  }, []);

  const handleSubmit = async (values: any) => {
    const files: File[] = [
      values.poster[0].originFileObj,
      values['video-trailer'][0].originFileObj,
      values.video[0].originFileObj,
    ];

    Promise.all(
      files.map((file) => {
        const uploader = new Uploader({
          file: file,
          fileName: file.name,
          initializeMultipartUpload,
          getMultipartPreSignedUrl,
          finalizeMultipartUpload,
        });
        let percentage = undefined;
        setUploader((upd) => [...upd, uploader]);
        uploader
          .onProgress(({ percentage: newPercentage }) => {
            // to avoid the same percentage to be logged twice
            if (newPercentage !== percentage) {
              percentage = newPercentage;
              console.log(`${percentage}%`);
            }
          })
          .onError((error) => {
            console.error(error);
          });

        uploader.start();
      })
    );

    // initializeMultipartUpload({
    //   variables:{
    //     initMultiPart:{
    //       fileExt,
    //       filename
    //     }
    //   }
    // })
    // createVideo({
    //   variables: {
    //     createVideoDto: {
    //       country: values.countries.join('|'),
    //       description: values.description,
    //       name: values.name,
    //       posterImage: values.poster[0].originFileObj,
    //       trailerVideo: values['video-trailer'][0].originFileObj,
    //       video: values.video[0].originFileObj,
    //       language: values.languages.join('|'),
    //       categories: values.categories.join('|'),
    //       tags: values.tags.join('|'),
    //     },
    //   },
    // });
  };

  const onCancel = () => {
    if (uploader) {
      uploader.forEach((up) => {
        up.abort();
      });
    }
  };

  // if (data) {
  //   notification.success({
  //     message: 'Đã thêm thành công',
  //   });
  // }

  // if (error) {
  //   notification.error(error);
  // }
  const fileList: UploadFile[] = [
    {
      uid: '0',
      name: 'xxx.png',
      status: 'uploading',
      percent: 33,
    },
    {
      uid: '-1',
      name: 'yyy.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl:
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'zzz.png',
      status: 'error',
    },
  ];
  return (
    <>
      <div>
        <Text
          className="text-style"
          style={{
            ...titleStyle,
            ...titleFixed,
          }}
        >
          Thêm video
        </Text>
      </div>
      <div
        style={{
          margin: '50px 24px 24px 24px',
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid rgba(152, 188, 252, 0.16)',
          // background: 'lightslategray',
          borderRadius: 30,
        }}
      >
        <ProForm
          onFinish={async (values: any) => {
            await handleSubmit(values);
          }}
          onReset={() => onCancel()}
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
          <ProForm.Group>
            <ProFormText
              width="md"
              name="name"
              label={<Text className="text-style">Tên video</Text>}
              tooltip={{
                title: 'Tên video bạn muốn thêm',
                className: 'text-style',
              }}
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
              name="description"
              label={<Text className="text-style">Mô tả</Text>}
              placeholder="Nhập mô tả về video"
              required
              rules={[
                {
                  required: true,
                  message: 'Mô tả là bắt buộc!',
                },
              ]}
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
          <ProForm.Group>
            <ProFormSelect
              showSearch
              options={countries}
              width="md"
              name="countries"
              label={<Text className="text-style">Quốc gia</Text>}
              fieldProps={{
                dropdownStyle: {
                  background: 'lightblue',
                  color: 'black; !improtant',
                },
                mode: 'tags',
              }}
              placeholder={'Chọn quốc gia cho video'}
              required
              rules={[
                {
                  required: true,
                  message: 'Quốc gia là bắt buộc!',
                },
              ]}
            />
            <ProFormSelect
              showSearch
              width="md"
              options={countries}
              name="languages"
              label={<Text className="text-style">Ngôn ngữ</Text>}
              fieldProps={{
                dropdownStyle: {
                  background: 'lightblue',
                  color: 'black; !improtant',
                },
                mode: 'tags',
                className: 'select-item-video-form',
              }}
              placeholder={'Chọn ngôn ngữ dùng trong video'}
              required
              rules={[
                {
                  required: true,
                  message: 'Ngôn ngữ là bắt buộc!',
                },
              ]}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              showSearch
              options={categories}
              width="md"
              name="categories"
              label={<Text className="text-style">Thể loại</Text>}
              fieldProps={{
                dropdownStyle: {
                  background: 'lightblue',
                  color: 'black; !improtant',
                },
                mode: 'tags',
              }}
              placeholder={'Chọn thể loại cho video'}
              required
              rules={[
                {
                  required: true,
                  message: 'Thể loại là bắt buộc!',
                },
              ]}
            />
            <ProFormSelect
              showSearch
              width="md"
              options={tags}
              name="tags"
              label={<Text className="text-style">Tag</Text>}
              fieldProps={{
                dropdownStyle: {
                  background: 'lightblue',
                  color: 'black; !improtant',
                },
                mode: 'tags',
                className: 'select-item-video-form',
              }}
              placeholder={'Chọn tag'}
              required
              rules={[
                {
                  required: true,
                  message: 'Tag là bắt buộc!',
                },
              ]}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormUploadButton
              max={1}
              // fileList={fileList}
              listType="picture"
              name={'poster'}
              title={'Tải lên poster'}
              label={<Text className="text-style">Poster</Text>}
              fieldProps={{
                className: 'text-style',
              }}
              required
              rules={[
                {
                  required: true,
                  message: 'Poster là bắt buộc!',
                },
              ]}
            />
            <ProFormUploadButton
              max={1}
              // fileList={fileList}
              listType="picture"
              name="video"
              title={'Tải lên video'}
              label={<Text className="text-style">Video</Text>}
              fieldProps={{
                className: 'text-style',
              }}
              required
              rules={[
                {
                  required: true,
                  message: 'Video là bắt buộc!',
                },
              ]}
            />
            <ProFormUploadButton
              max={1}
              // fileList={fileList}
              listType="picture"
              name={'video-trailer'}
              title={'Tải lên trailer video'}
              label={<Text className="text-style">Trailer video</Text>}
              fieldProps={{
                className: 'text-style',
              }}
              required
              rules={[
                {
                  required: true,
                  message: 'Trailer video là bắt buộc!',
                },
              ]}
            />
          </ProForm.Group>
          {/* <ProFormText width="sm" name="id" label="主合同编号" />
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
      <style jsx global>
        {`
          div.select-item-video-form span.ant-select-selection-item {
            background: #${randomColor()};
          }
        `}
      </style>
    </>
  );
};

export default VideoFormCreate;
