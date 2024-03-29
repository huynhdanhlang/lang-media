/**
 * Description: User profile component
 * Author: Hieu Chu
 */

import { Descriptions, Row } from 'antd';
import { CardStyled, ColStyled } from './style';
// import api from '../../api'
import { backgroudBorder, profileStyle } from '@training-project/data-access';
import { userState } from 'apps/frontend-admin/stores/user';
import Head from 'next/head';
import { useRecoilState } from 'recoil';
const UserProfile = () => {
  const [user, setUser] = useRecoilState(userState);

  return (
    user && (
      <>
        <Head>
          <title>{user.username} - UOW Sculptures</title>
        </Head>

        <Row gutter={16}>
          <ColStyled xs={24} lg={12}>
            <CardStyled
              title="User Profile"
              style={{
                ...backgroudBorder({
                  ...profileStyle,
                  isSetBorder: true,
                }),
              }}
            >
              <div
                style={{
                  marginBottom: 12,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div style={{ marginRight: 16 }}>
                  <img
                    src={
                      'https://2.bp.blogspot.com/-XXggkpZn2sk/Wvrz7f9CXkI/AAAAAAAAF3Q/KgR4rqvWXfccZT32gnG3AuZuv30E3Dl7ACLcBGAs/s1600/Sg9zzD4.jpg'
                    }
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 500,
                      // color: 'black',
                    }}
                  >
                    {user.username}
                  </div>
                  {/* <SculptureCardDescription
                  totalLikes={likes.length}
                  totalComments={comments.length}
                  totalVisits={visits.length}
                /> */}
                </div>
              </div>

              <Descriptions
                layout="vertical"
                colon={false}
                style={{ maxWidth: 600 }}
              >
                <Descriptions.Item label="Name" className="text-style">
                  {user.username}
                </Descriptions.Item>
                <Descriptions.Item
                  label="Email"
                  span={2}
                  className="text-style"
                >
                  {user.email}
                </Descriptions.Item>
                {/* <Descriptions.Item label="Connection type">
                  {connection}
                </Descriptions.Item> */}
                {/* <Descriptions.Item label="Join date">
                {moment(joinDate).format('D MMMM YYYY')}
              </Descriptions.Item> */}
              </Descriptions>
            </CardStyled>

            {/* <UserVisit visits={visits} /> */}
          </ColStyled>

          {/* <ColStyled xs={24} lg={12}>
          <UserComments comments={comments} deleteComment={deleteComment} />
          <UserLikes likes={likes} />
        </ColStyled> */}
        </Row>
      </>
    )
  );
};

export default UserProfile;
