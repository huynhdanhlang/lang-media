import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { InputRef, notification } from 'antd';
import { Space, Input, Tag, Tooltip, theme } from 'antd';
import {
  useCreateTagMutation,
  useFindAllTagQuery,
  Loading,
  randomColor
} from '@training-project/data-access';

const TagList: React.FC = () => {
  const { loading, data, error } = useFindAllTagQuery();
  const [
    createTag,
    { data: tagResults, error: tagError, loading: tagLoading },
  ] = useCreateTagMutation();
  if (error) {
    notification.error(error);
  }
  const { token } = theme.useToken();
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (data && data.findAllTag) {
      setTags(data.findAllTag.map((tag) => tag.name));
    }
  }, [data]);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
      createTag({
        variables: {
          createTagInput: {
            name: inputValue,
          },
        },
      });
    }
    setInputVisible(false);
    setInputValue('');
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newTags = [...tags];
    newTags[editInputIndex] = editInputValue;
    setTags(newTags);
    setEditInputIndex(-1);
    setInputValue('');
  };

  const tagInputStyle: React.CSSProperties = {
    width: 78,
    verticalAlign: 'top',
  };

  const tagPlusStyle: React.CSSProperties = {
    background: token.colorBgContainer,
    borderStyle: 'dashed',
  };

  if (tagResults) {
    notification.success({
      message: 'Đã thêm thành công',
    });
  }
  if (tagError) {
    notification.error(tagError);
  }
  if (loading) return <Loading />;

  return (
    <Space size={[0, 8]} wrap>
      <Space size={[0, 8]} wrap>
        {tags.length &&
          tags.map((tag, index) => {
            console.log(['tag'], tag);

            if (editInputIndex === index) {
              return (
                <Input
                  ref={editInputRef}
                  key={tag}
                  size="small"
                  style={tagInputStyle}
                  value={editInputValue}
                  onChange={handleEditInputChange}
                  onBlur={handleEditInputConfirm}
                  onPressEnter={handleEditInputConfirm}
                />
              );
            }
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag
                className="tag-list"
                key={tag}
                closable={index !== 0}
                style={{ userSelect: 'none', filter: 'brightness(0.8)' }}
                onClose={() => handleClose(tag)}
                color={`#${randomColor()}`}
              >
                <span
                  onDoubleClick={(e) => {
                    if (index !== 0) {
                      setEditInputIndex(index);
                      setEditInputValue(tag);
                      e.preventDefault();
                    }
                  }}
                >
                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                </span>
              </Tag>
            );
            return isLongTag ? (
              <Tooltip title={tag} key={tag}>
                {tagElem}
              </Tooltip>
            ) : (
              tagElem
            );
          })}
      </Space>
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={tagInputStyle}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Tag style={tagPlusStyle} onClick={showInput}>
          <PlusOutlined
            style={{
              display: 'inline-flex',
              alignItems: 'center',
            }}
          />{' '}
          Thêm tag
        </Tag>
      )}
    </Space>
  );
};

export default TagList;
