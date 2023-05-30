/**
 * Description: User profile component
 * Author: Hieu Chu
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Row, Descriptions } from 'antd';
import { ColStyled, CardStyled } from './style';
// import api from '../../api'
import Loading from '../Loading';
import Error from 'next/error';
import Head from 'next/head';
import moment from 'moment';
import {
  useFindOneUserQuery,
  FindOneUserQuery,
} from '@training-project/data-access';
const UserProfile = () => {
  const router = useRouter();
  const id = router.query.id;
  const { data, loading, error } = useFindOneUserQuery({
    variables: {
      id: Number(id),
    },
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // const userPromise = api.get(`/user/${id}`)
      // const commentPromise = api.get(`/comment/user-id/${id}`)
      // const visitPromise = api.get(`/visit/user-id/${id}`)
      // const likePromise = api.get(`/like/user-id/${id}`)

      // const [rawUser, rawComments, rawVisits, rawLikes] = await Promise.all([
      //   userPromise,
      //   commentPromise,
      //   visitPromise,
      //   likePromise
      // ])

      // setComments(rawComments.data);
      // setVisits(rawVisits.data);
      // setLikes(rawLikes.data);

      // console.log('comments', rawComments.data)
      // console.log('visits', rawVisits.data)
      // console.log('likes', rawLikes.data)
      if (data) {
        console.log(data);

        setUser(data.findOneUser);
      }
    };

    fetchData();
  }, [data]);

  if (loading && !user && !user?.findOneUser) return <Loading />;
  if (error) return <Error statusCode={500} title={error.message} />;

  // const { email, fullname, username } = user;

  // let displayName = fullname;
  // // if (userId.includes('auth0')) {
  // //   displayName = nickname;
  // // }

  // let connection = 'Email';
  // // if (userId.includes('google')) {
  // //   connection = 'Google';
  // // } else if (userId.includes('facebook')) {
  // //   connection = 'Facebook';
  // // }

  return (
    user && (
      <>
        <Head>
          <title>{user.username} - UOW Sculptures</title>
        </Head>

        <Row gutter={16}>
          <ColStyled xs={24} lg={12}>
            <CardStyled title="User Profile">
              <div
                style={{
                  marginBottom: 12,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div style={{ marginRight: 16 }}>
                  {/* <img
                  src={picture}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                /> */}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 500,
                      color: 'black',
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
                <Descriptions.Item label="Name">
                  {user.username}
                </Descriptions.Item>
                <Descriptions.Item label="Email" span={2}>
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
