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
import { Typography, Progress, notification } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useCallback, useEffect, useState } from 'react';
import { titleFixed, titleStyle } from '../shared/theme';
import { randomColor } from '../shared/utils';
import { Uploader } from './Upload';
import { fetcher } from 'apps/frontend-admin/utils/fetcher';
import { FILE_FIELD_TYPE } from 'apps/frontend-admin/constant/upload.const';

interface IFiles {
  [key: string]: File;
}

interface IFileList {
  percentage: number;
  uploader: Uploader;
}

interface IFilePercentage {
  [key: string]: IFileList;
}

const VideoFormCreate = () => {
  const { Text } = Typography;
  const [countries, setCountries] = useState<DefaultOptionType[]>([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [uploaderList, setUploaderList] = useState<IFilePercentage>({});
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

  const processBar = useCallback(
    (fieldType: string) => {
      if (Object.keys(uploaderList).length) {
        const percentage = uploaderList[fieldType].percentage;
        return (
          <Progress
            trailColor="lightblue"
            status={percentage === 100 ? 'success' : 'active'}
            percent={percentage}
            key={fieldType}
          />
        );
      }
    },
    [uploaderList]
  );

  useEffect(() => {
    if (Object.keys(uploaderList).length) {
      const isSuccess = Object.values(uploaderList).every(
        (uploader) => uploader.percentage === 100
      );
      if (isSuccess) {
        notification.success({
          message: 'Thêm video thành công',
        });
      }
    }
  }, [uploaderList]);

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
    const files: IFiles = {
      POSTER_URL: values.poster[0].originFileObj,
      TRAILER_URL: values['video-trailer'][0].originFileObj,
      VIDEO_URL: values.video[0].originFileObj,
    };
    const { data: video } = await createVideo({
      variables: {
        createVideoDto: {
          country: values.countries.join('|'),
          description: values.description,
          name: values.name,
          language: values.languages.join('|'),
          categories: values.categories,
          tags: values.tags,
        },
      },
    });
    if (error) {
      notification.error(error);
      return;
    }
    Promise.all(
      Object.entries(files).map(([key, file]) => {
        const fieldType = FILE_FIELD_TYPE[key];
        const uploader = new Uploader({
          file: file,
          fileName: file.name,
          initializeMultipartUpload,
          getMultipartPreSignedUrl,
          finalizeMultipartUpload,
          videoId: video.createVideo.id,
          fieldType,
        });
        let percentage = undefined;
        setUploaderList((upd) => ({
          ...upd,
          [fieldType]: {
            uploader,
          },
        }));
        uploader
          .onProgress(({ percentage: newPercentage }) => {
            // to avoid the same percentage to be logged twice
            if (newPercentage !== percentage) {
              percentage = newPercentage;
              console.log(`${percentage}%`);
              setUploaderList((upd) => ({
                ...upd,
                [fieldType]: {
                  percentage,
                },
              }));
            }
          })
          .onError((error) => {
            console.error(error);
          });

        uploader.start();
      })
    );
  };

  const onCancel = () => {
    if (Object.keys(uploaderList).length) {
      setUploaderList({});
      Object.values(uploaderList).forEach((up) => {
        up.uploader.abort();
      });
    }
    setUploaderList({});
  };

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
            <div>
              <ProFormUploadButton
                max={1}
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
              {processBar(FILE_FIELD_TYPE.POSTER_URL)}
            </div>
            <div>
              <ProFormUploadButton
                max={1}
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
              {processBar(FILE_FIELD_TYPE.VIDEO_URL)}
            </div>
            <div>
              <ProFormUploadButton
                max={1}
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
              {processBar(FILE_FIELD_TYPE.TRAILER_URL)}
            </div>
          </ProForm.Group>
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
