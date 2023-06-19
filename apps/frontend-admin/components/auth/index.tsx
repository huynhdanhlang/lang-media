import {
  LockOutlined,
  UserOutlined
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormText
} from '@ant-design/pro-components';
import { useLoginMutation } from '@training-project/data-access';
import { Tabs, notification } from 'antd';
import { userState } from 'apps/frontend-admin/stores/user';
import { useRouter } from 'next/router';
import { CSSProperties, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

type LoginType = 'phone' | 'account';

const iconStyles: CSSProperties = {
  color: 'rgba(0, 0, 0, 0.2)',
  fontSize: '18px',
  verticalAlign: 'middle',
  cursor: 'pointer',
};
interface IAuthPage {}
interface ILoginUser {
  username: string;
  password: string;
}
const AuthPage = (props: IAuthPage) => {
  const [loginType, setLoginType] = useState<LoginType>('account');
  const image =
    'https://www.pixel4k.com/wp-content/uploads/2019/10/joker-movie-artwork_1570919664.jpg';
  const [imageUrl, setImageUrl] = useState(image);
  const [loginMutation, { data, loading, error }] = useLoginMutation();
  const setUser = useSetRecoilState(userState);
  const [textColor, setTextColor] = useState('#ffff');
  const router = useRouter();
  useEffect(() => {
    const handleResize = () => {
      // console.log(window.innerHeight, window.innerWidth);
      if (window.innerWidth < 770) {
        // console.log(['dadd']);
        // setImageUrl(
        //   'https://i0.wp.com/www.3wallpapers.fr/wp-content/uploads/2015/09/DeadPool-dark-3Wallpapers-iPhone-Parallax.jpg?ssl=1'
        // );
        setTextColor('#000000');
      } else {
        setTextColor('#ffff');
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    if (data) {
      setUser(data.login);
      router.replace(router.asPath, '/');
      router.reload();
    }
  }, [data]);
  const onSubmit = async (user: ILoginUser) => {
    await loginMutation({
      variables: {
        loginInput: {
          password: user.password,
          username: user.username,
        },
      },
    });
  };

  if (error) {
    notification.error(error);
  }

  return (
    <div
      style={{
        // backgroundColor: 'white',
        height: 'calc(100vh - 0px)',
      }}
    >
      <LoginFormPage
        backgroundImageUrl={imageUrl}
        logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
        title="Làng Media"
        subTitle="Trang xem video xuyên vũ trụ"
        size="large"
        submitter={{
          searchConfig: {
            submitText: 'Gét go',
          },
        }}
        onFinish={onSubmit}
        // activityConfig={{
        //   style: {
        //     boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.2)',
        //     color: '#fff',
        //     borderRadius: 8,
        //     backgroundColor: '#1677FF',
        //   },
        //   title: '活动标题，可配置图片',
        //   subTitle: '活动介绍说明文字',
        //   action: (
        //     <Button
        //       size="large"
        //       style={{
        //         borderRadius: 20,
        //         background: '#fff',
        //         color: '#1677FF',
        //         width: 120,
        //       }}
        //     >
        //       去看看
        //     </Button>
        //   ),
        // }}
        // actions={
        //   <div
        //     style={{
        //       display: 'flex',
        //       justifyContent: 'center',
        //       alignItems: 'center',
        //       flexDirection: 'column',
        //     }}
        //   >
        //     <Divider plain>
        //       <span
        //         style={{ color: '#CCC', fontWeight: 'normal', fontSize: 14 }}
        //       >
        //         其他登录方式
        //       </span>
        //     </Divider>
        //     <Space align="center" size={24}>
        //       <div
        //         style={{
        //           display: 'flex',
        //           justifyContent: 'center',
        //           alignItems: 'center',
        //           flexDirection: 'column',
        //           height: 40,
        //           width: 40,
        //           border: '1px solid #D4D8DD',
        //           borderRadius: '50%',
        //         }}
        //       >
        //         <AlipayOutlined style={{ ...iconStyles, color: '#1677FF' }} />
        //       </div>
        //       <div
        //         style={{
        //           display: 'flex',
        //           justifyContent: 'center',
        //           alignItems: 'center',
        //           flexDirection: 'column',
        //           height: 40,
        //           width: 40,
        //           border: '1px solid #D4D8DD',
        //           borderRadius: '50%',
        //         }}
        //       >
        //         <TaobaoOutlined style={{ ...iconStyles, color: '#FF6A10' }} />
        //       </div>
        //       <div
        //         style={{
        //           display: 'flex',
        //           justifyContent: 'center',
        //           alignItems: 'center',
        //           flexDirection: 'column',
        //           height: 40,
        //           width: 40,
        //           border: '1px solid #D4D8DD',
        //           borderRadius: '50%',
        //         }}
        //       >
        //         <WeiboOutlined style={{ ...iconStyles, color: '#333333' }} />
        //       </div>
        //     </Space>
        //   </div>
        // }
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
        >
          <Tabs.TabPane key={'account'} tab={'Đăng nhập'} />
          {/* <Tabs.TabPane key={'phone'} tab={'手机号登录'} /> */}
        </Tabs>
        {loginType === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={'prefixIcon'} />,
              }}
              placeholder={'Tên người dùng: admin'}
              rules={[
                {
                  required: true,
                  message: 'Tên người dùng không hợp lệ!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              placeholder={'Mật khẩu: your password'}
              rules={[
                {
                  required: true,
                  message: 'Mật khẩu không hợp lệ!',
                },
              ]}
            />
          </>
        )}
        {/* {loginType === 'phone' && (
          <>
            <ProFormText
              fieldProps={{
                size: 'large',
                prefix: <MobileOutlined className={'prefixIcon'} />,
              }}
              name="mobile"
              placeholder={'手机号'}
              rules={[
                {
                  required: true,
                  message: '请输入手机号！',
                },
                {
                  pattern: /^1\d{10}$/,
                  message: '手机号格式错误！',
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={'prefixIcon'} />,
              }}
              captchaProps={{
                size: 'large',
              }}
              placeholder={'请输入验证码'}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${'获取验证码'}`;
                }
                return '获取验证码';
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: '请输入验证码！',
                },
              ]}
              onGetCaptcha={async () => {
                message.success('获取验证码成功！验证码为：1234');
              }}
            />
          </>
        )} */}
        <div
          style={{
            marginBlockEnd: 24,
            color: 'white',
          }}
        >
          {/* <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox> */}
          <a
            style={{
              float: 'right',
              marginBottom: 10,
            }}
          >
            Quên mật khẩu
          </a>
        </div>
      </LoginFormPage>
      <style jsx global>{`
        .ant-pro-form-login-page-container {
          background: unset !important;
        }
        .ant-pro-form-login-page-title,
        .ant-pro-form-login-page-desc,
        .ant-tabs-tab-btn {
          color: ${textColor} !important;
        }
         {
          /* @media (max-width: 768px) {
          .ant-pro-form-login-page {
            background-size: contain !important;
          }
        } */
        }
      `}</style>
    </div>
  );
};
export default AuthPage;
