import { useEffect, useState, useCallback, createContext } from 'react';
import { useRouter } from 'next/router';
import {
  UserEntity,
  useLoginMutation,
  useLogoutMutation,
} from '@training-project/data-access';
import { RECOIL_PERSIST } from 'apps/frontend-admin/constant/keyStore.const';
import { IUser } from '../shared/user';
import Loading from '../Loading';
import Login from 'apps/frontend-admin/pages/login';
import { useRecoilState } from 'recoil';
import { userState } from 'apps/frontend-admin/stores/user';

interface IAuthContext {
  user: UserEntity;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  logIn: (username: string, password: string) => Promise<void>;
  isLoading: boolean;
}
export const AuthContext = createContext<IAuthContext>(null);

const AuthProvider = ({ children }) => {
  const { asPath, push } = useRouter();
  const [user, setUser] = useRecoilState<UserEntity>(userState);
  const [logout, {}] = useLogoutMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [loginMutation, { data, loading, error }] = useLoginMutation();
  // if you use trailing slash you'd need to add them to each route
  const isAuthRoute = [
    '/login',
    //    "/signup", "/forgot", "/reset"
  ].includes(asPath);

  const redirectToLogin = useCallback(async () => {
    try {
      setUser(null);
      await push('/login');
    } catch (e) {
      console.error('Could not redirect to login');
    }
  }, [push]);

  const signOut = async () => {
    try {
      await logout();
      await redirectToLogin();
    } catch {
      window.location.reload();
    }
  };

  const goHome = useCallback(() => push('/'), [push]);

  const logIn = async (username: string, password: string) => {
    await loginMutation({
      variables: {
        loginInput: {
          password: username,
          username: password,
        },
      },
    });
  };

  // check if user is logged in on every route changes and
  // redirect accordingly
  useEffect(() => {
    const getUser = async () => {
      const { userState: user }: IUser = JSON.parse(
        localStorage.getItem(RECOIL_PERSIST)
      );
      if (user) {
        setUser(user); // user details
        setIsLoading(false);
        if (isAuthRoute) await goHome();
      } else if (!isAuthRoute) {
        await redirectToLogin();
      }
    };
    setIsLoading(true);
    getUser();
  }, [asPath, goHome, isAuthRoute, redirectToLogin]);

  if (!user && isAuthRoute) return <Login />;
  if (!user) return <Loading />;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, signOut, logIn, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
