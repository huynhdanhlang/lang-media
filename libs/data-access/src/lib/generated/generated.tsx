import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type CategoryEntity = {
  __typename?: 'CategoryEntity';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type CreateCategoryInput = {
  name: Scalars['String']['input'];
};

export type CreateRoleInput = {
  /** Name of role */
  name: Scalars['String']['input'];
};

export type CreateTagInput = {
  name: Scalars['String']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  fullname: Scalars['String']['input'];
  /** user's password */
  password: Scalars['String']['input'];
  /** user's name */
  username: Scalars['String']['input'];
};

export type CreateVideoInput = {
  country: Scalars['String']['input'];
  language?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  trailerUrl?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
  view?: InputMaybe<Scalars['Int']['input']>;
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: CategoryEntity;
  createRole: RoleEntity;
  createTag: TagEntity;
  createUser: UserEntity;
  createVideo: VideoEntity;
  login: UserEntity;
  removeCategory: CategoryEntity;
  removeRole: RoleEntity;
  removeTag: TagEntity;
  removeUser: UserEntity;
  removeVideo: VideoEntity;
  updateCategory: CategoryEntity;
  updateRole: RoleEntity;
  updateTag: TagEntity;
  updateUser: UserEntity;
  updateVideo: VideoEntity;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationCreateRoleArgs = {
  createRoleInput: CreateRoleInput;
};


export type MutationCreateTagArgs = {
  createTagInput: CreateTagInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationCreateVideoArgs = {
  createVideoInput: CreateVideoInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveRoleArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveTagArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationRemoveVideoArgs = {
  id: Scalars['Int']['input'];
};


export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput;
};


export type MutationUpdateRoleArgs = {
  updateRoleInput: UpdateRoleInput;
};


export type MutationUpdateTagArgs = {
  updateTagInput: UpdateTagInput;
};


export type MutationUpdateUserArgs = {
  updateUserInput: UpdateUserInput;
};


export type MutationUpdateVideoArgs = {
  updateVideoInput: UpdateVideoInput;
};

export type Query = {
  __typename?: 'Query';
  findAllCategory: Array<CategoryEntity>;
  findAllTag: Array<TagEntity>;
  findAllUser?: Maybe<Array<UserEntity>>;
  findAllVideo: Array<VideoEntity>;
  findOneCategory: CategoryEntity;
  findOneTag: TagEntity;
  findOneUser?: Maybe<UserEntity>;
  findOneVideo: VideoEntity;
  role: RoleEntity;
};


export type QueryFindOneCategoryArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneTagArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryFindOneVideoArgs = {
  id: Scalars['Int']['input'];
};


export type QueryRoleArgs = {
  id: Scalars['Int']['input'];
};

export type RoleEntity = {
  __typename?: 'RoleEntity';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type TagEntity = {
  __typename?: 'TagEntity';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type UpdateCategoryInput = {
  id: Scalars['Int']['input'];
};

export type UpdateRoleInput = {
  id: Scalars['Int']['input'];
};

export type UpdateTagInput = {
  id: Scalars['Int']['input'];
};

export type UpdateUserInput = {
  email: Scalars['String']['input'];
  fullname: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  /** user's password */
  password: Scalars['String']['input'];
};

export type UpdateVideoInput = {
  country: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  language?: InputMaybe<Scalars['String']['input']>;
  trailerUrl?: InputMaybe<Scalars['String']['input']>;
  url: Scalars['String']['input'];
  view?: InputMaybe<Scalars['Int']['input']>;
};

export type UserEntity = {
  __typename?: 'UserEntity';
  address?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  /** user's password */
  password: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  role: RoleEntity;
  roleId: Scalars['Int']['output'];
  /** user's name */
  username: Scalars['String']['output'];
};

export type VideoEntity = {
  __typename?: 'VideoEntity';
  country: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  language?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  trailerUrl?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
  view?: Maybe<Scalars['Int']['output']>;
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserEntity', username: string, createdAt: any, fullname: string, email: string, phone?: string | null, address?: string | null, roleId: number, role: { __typename?: 'RoleEntity', name: string, id: number } } };

export type FindAllTagQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllTagQuery = { __typename?: 'Query', findAllTag: Array<{ __typename?: 'TagEntity', name: string }> };

export type FindOneTagQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type FindOneTagQuery = { __typename?: 'Query', findOneTag: { __typename?: 'TagEntity', name: string } };

export type FindAllUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllUserQuery = { __typename?: 'Query', findAllUser?: Array<{ __typename?: 'UserEntity', id: number, username: string, email: string, fullname: string, address?: string | null, phone?: string | null, createdAt: any, role: { __typename?: 'RoleEntity', id: number, name: string } }> | null };

export type FindOneUserQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type FindOneUserQuery = { __typename?: 'Query', findOneUser?: { __typename?: 'UserEntity', id: number, username: string, email: string, fullname: string, address?: string | null, phone?: string | null, createdAt: any, role: { __typename?: 'RoleEntity', id: number, name: string } } | null };

export type CreateUserMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'UserEntity', username: string, fullname: string, email: string } };

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'UserEntity', username: string, fullname: string, email: string, address?: string | null, phone?: string | null, id: number } };

export type RemoveUserMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type RemoveUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'UserEntity', username: string, fullname: string, email: string, address?: string | null, phone?: string | null, id: number } };


export const LoginDocument = gql`
    mutation login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    username
    createdAt
    fullname
    email
    phone
    address
    role {
      name
      id
    }
    roleId
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const FindAllTagDocument = gql`
    query findAllTag {
  findAllTag {
    name
  }
}
    `;

/**
 * __useFindAllTagQuery__
 *
 * To run a query within a React component, call `useFindAllTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllTagQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllTagQuery(baseOptions?: Apollo.QueryHookOptions<FindAllTagQuery, FindAllTagQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllTagQuery, FindAllTagQueryVariables>(FindAllTagDocument, options);
      }
export function useFindAllTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllTagQuery, FindAllTagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllTagQuery, FindAllTagQueryVariables>(FindAllTagDocument, options);
        }
export type FindAllTagQueryHookResult = ReturnType<typeof useFindAllTagQuery>;
export type FindAllTagLazyQueryHookResult = ReturnType<typeof useFindAllTagLazyQuery>;
export type FindAllTagQueryResult = Apollo.QueryResult<FindAllTagQuery, FindAllTagQueryVariables>;
export const FindOneTagDocument = gql`
    query findOneTag($id: Int!) {
  findOneTag(id: $id) {
    name
  }
}
    `;

/**
 * __useFindOneTagQuery__
 *
 * To run a query within a React component, call `useFindOneTagQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneTagQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneTagQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneTagQuery(baseOptions: Apollo.QueryHookOptions<FindOneTagQuery, FindOneTagQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneTagQuery, FindOneTagQueryVariables>(FindOneTagDocument, options);
      }
export function useFindOneTagLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneTagQuery, FindOneTagQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneTagQuery, FindOneTagQueryVariables>(FindOneTagDocument, options);
        }
export type FindOneTagQueryHookResult = ReturnType<typeof useFindOneTagQuery>;
export type FindOneTagLazyQueryHookResult = ReturnType<typeof useFindOneTagLazyQuery>;
export type FindOneTagQueryResult = Apollo.QueryResult<FindOneTagQuery, FindOneTagQueryVariables>;
export const FindAllUserDocument = gql`
    query findAllUser {
  findAllUser {
    id
    username
    email
    fullname
    address
    phone
    createdAt
    role {
      id
      name
    }
  }
}
    `;

/**
 * __useFindAllUserQuery__
 *
 * To run a query within a React component, call `useFindAllUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllUserQuery(baseOptions?: Apollo.QueryHookOptions<FindAllUserQuery, FindAllUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllUserQuery, FindAllUserQueryVariables>(FindAllUserDocument, options);
      }
export function useFindAllUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllUserQuery, FindAllUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllUserQuery, FindAllUserQueryVariables>(FindAllUserDocument, options);
        }
export type FindAllUserQueryHookResult = ReturnType<typeof useFindAllUserQuery>;
export type FindAllUserLazyQueryHookResult = ReturnType<typeof useFindAllUserLazyQuery>;
export type FindAllUserQueryResult = Apollo.QueryResult<FindAllUserQuery, FindAllUserQueryVariables>;
export const FindOneUserDocument = gql`
    query findOneUser($id: Int!) {
  findOneUser(id: $id) {
    id
    username
    email
    fullname
    address
    phone
    createdAt
    role {
      id
      name
    }
  }
}
    `;

/**
 * __useFindOneUserQuery__
 *
 * To run a query within a React component, call `useFindOneUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneUserQuery(baseOptions: Apollo.QueryHookOptions<FindOneUserQuery, FindOneUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneUserQuery, FindOneUserQueryVariables>(FindOneUserDocument, options);
      }
export function useFindOneUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneUserQuery, FindOneUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneUserQuery, FindOneUserQueryVariables>(FindOneUserDocument, options);
        }
export type FindOneUserQueryHookResult = ReturnType<typeof useFindOneUserQuery>;
export type FindOneUserLazyQueryHookResult = ReturnType<typeof useFindOneUserLazyQuery>;
export type FindOneUserQueryResult = Apollo.QueryResult<FindOneUserQuery, FindOneUserQueryVariables>;
export const CreateUserDocument = gql`
    mutation createUser($createUserInput: CreateUserInput!) {
  createUser(createUserInput: $createUserInput) {
    username
    fullname
    email
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    username
    fullname
    email
    address
    phone
    id
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUserInput: // value for 'updateUserInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const RemoveUserDocument = gql`
    mutation removeUser($id: Int!) {
  removeUser(id: $id) {
    username
    fullname
    email
    address
    phone
    id
  }
}
    `;
export type RemoveUserMutationFn = Apollo.MutationFunction<RemoveUserMutation, RemoveUserMutationVariables>;

/**
 * __useRemoveUserMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutation, { data, loading, error }] = useRemoveUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveUserMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserMutation, RemoveUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserMutation, RemoveUserMutationVariables>(RemoveUserDocument, options);
      }
export type RemoveUserMutationHookResult = ReturnType<typeof useRemoveUserMutation>;
export type RemoveUserMutationResult = Apollo.MutationResult<RemoveUserMutation>;
export type RemoveUserMutationOptions = Apollo.BaseMutationOptions<RemoveUserMutation, RemoveUserMutationVariables>;