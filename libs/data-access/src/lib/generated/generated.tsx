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
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** Represents NULL values */
  Void: { input: any; output: any; }
};

export type CategoryEntity = {
  __typename?: 'CategoryEntity';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  videos: Array<VideoEntity>;
};

export type CategoryFilter = {
  attributes?: InputMaybe<FAttributeOptions>;
  group?: InputMaybe<Scalars['String']['input']>;
  include?: InputMaybe<Array<IncludeModel>>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  mapToModel?: InputMaybe<Scalars['Boolean']['input']>;
  nest?: InputMaybe<Scalars['Boolean']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
  paranoid?: InputMaybe<Scalars['Boolean']['input']>;
  plain?: InputMaybe<Scalars['Boolean']['input']>;
  raw?: InputMaybe<Scalars['Boolean']['input']>;
  skipLocked?: InputMaybe<Scalars['Boolean']['input']>;
  subQuery?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  useMaster?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<CategoryWherClause>;
};

export type CategoryWherClause = {
  id?: InputMaybe<Array<Scalars['Int']['input']>>;
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

export type CreateVideoDto = {
  categories: Scalars['String']['input'];
  country: Scalars['String']['input'];
  description: Scalars['String']['input'];
  language?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  tags: Scalars['String']['input'];
  view?: InputMaybe<Scalars['Int']['input']>;
};

export type FAttributeOptions = {
  exclude?: InputMaybe<Array<Scalars['String']['input']>>;
  include?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type IProcessingMultipartUploadEntity = {
  __typename?: 'IProcessingMultipartUploadEntity';
  parts: Array<MapProcessingMultiPart>;
};

export type IncludeModel = {
  association?: InputMaybe<Scalars['String']['input']>;
  attributes?: InputMaybe<FAttributeOptions>;
  include?: InputMaybe<Array<IncludeModel>>;
  where?: InputMaybe<Scalars['JSON']['input']>;
};

export type InitMultiPartDto = {
  fileExt: Scalars['String']['input'];
  filename: Scalars['String']['input'];
};

export type InitMultiPartEntity = {
  __typename?: 'InitMultiPartEntity';
  fileId: Scalars['String']['output'];
  fileKey: Scalars['String']['output'];
};

export type LoginInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type MapMultiPartFinalDto = {
  fileId: Scalars['String']['input'];
  fileKey: Scalars['String']['input'];
  parts: Array<MultiPartFinal>;
};

export type MapProcessingMultiPart = {
  __typename?: 'MapProcessingMultiPart';
  PartNumber: Scalars['Int']['output'];
  signedUrl: Scalars['String']['output'];
};

export type MultiPartFinal = {
  ETag: Scalars['String']['input'];
  PartNumber: Scalars['Int']['input'];
};

export type MultiPartPreSignedUrlDto = {
  fileId: Scalars['String']['input'];
  fileKey: Scalars['String']['input'];
  parts: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: CategoryEntity;
  createRole: RoleEntity;
  createTag: TagEntity;
  createUser: UserEntity;
  createVideo: VideoEntity;
  finalizeMultipartUpload?: Maybe<Scalars['Void']['output']>;
  getMultipartPreSignedUrls: IProcessingMultipartUploadEntity;
  initializeMultipartUpload: InitMultiPartEntity;
  login: UserEntity;
  logout: ObjectMessage;
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
  createVideoDto: CreateVideoDto;
};


export type MutationFinalizeMultipartUploadArgs = {
  mapMultiPartFinalDto: MapMultiPartFinalDto;
};


export type MutationGetMultipartPreSignedUrlsArgs = {
  multiPartPreSignedUrlDto: MultiPartPreSignedUrlDto;
};


export type MutationInitializeMultipartUploadArgs = {
  initMultiPartDto: InitMultiPartDto;
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

export type ObjectMessage = {
  __typename?: 'ObjectMessage';
  message: Scalars['String']['output'];
  statusCode?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  findAllCategory?: Maybe<Array<CategoryEntity>>;
  findAllTag?: Maybe<Array<TagEntity>>;
  findAllUser?: Maybe<Array<UserEntity>>;
  findAllVideo?: Maybe<Array<VideoEntity>>;
  findOneCategory?: Maybe<CategoryEntity>;
  findOneTag?: Maybe<TagEntity>;
  findOneUser?: Maybe<UserEntity>;
  findOneVideo?: Maybe<VideoEntity>;
  refreshToken: UserEntity;
  role: RoleEntity;
};


export type QueryFindAllCategoryArgs = {
  categoryFilter?: InputMaybe<CategoryFilter>;
};


export type QueryFindAllUserArgs = {
  userFilter?: InputMaybe<UserFilter>;
};


export type QueryFindAllVideoArgs = {
  videoFilter?: InputMaybe<VideoFilter>;
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
  currentHashedRefreshToken?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  fullname: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  /** user's password */
  password: Scalars['String']['input'];
};

export type UpdateVideoInput = {
  country: Scalars['String']['input'];
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  language?: InputMaybe<Scalars['String']['input']>;
  poster?: InputMaybe<Scalars['String']['input']>;
  trailerUrl?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  view?: InputMaybe<Scalars['Int']['input']>;
};

export type UserEntity = {
  __typename?: 'UserEntity';
  accessToken?: Maybe<Scalars['String']['output']>;
  address?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  refreshToken?: Maybe<Scalars['String']['output']>;
  role: RoleEntity;
  roleId: Scalars['Int']['output'];
  /** user's name */
  username: Scalars['String']['output'];
};

export type UserFilter = {
  attributes?: InputMaybe<FAttributeOptions>;
  group?: InputMaybe<Scalars['String']['input']>;
  include?: InputMaybe<Array<IncludeModel>>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  mapToModel?: InputMaybe<Scalars['Boolean']['input']>;
  nest?: InputMaybe<Scalars['Boolean']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
  paranoid?: InputMaybe<Scalars['Boolean']['input']>;
  plain?: InputMaybe<Scalars['Boolean']['input']>;
  raw?: InputMaybe<Scalars['Boolean']['input']>;
  skipLocked?: InputMaybe<Scalars['Boolean']['input']>;
  subQuery?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  useMaster?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<UserWherClause>;
};

export type UserWherClause = {
  currentHashedRefreshToken?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** user's password */
  password?: InputMaybe<Scalars['String']['input']>;
};

export type VideoEntity = {
  __typename?: 'VideoEntity';
  country: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  language?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  poster: Scalars['String']['output'];
  tags: Array<TagEntity>;
  trailerUrl?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
  view?: Maybe<Scalars['Int']['output']>;
};

export type VideoFilter = {
  attributes?: InputMaybe<FAttributeOptions>;
  group?: InputMaybe<Scalars['String']['input']>;
  include?: InputMaybe<Array<IncludeModel>>;
  limit?: InputMaybe<Scalars['Float']['input']>;
  mapToModel?: InputMaybe<Scalars['Boolean']['input']>;
  nest?: InputMaybe<Scalars['Boolean']['input']>;
  offset?: InputMaybe<Scalars['Float']['input']>;
  paranoid?: InputMaybe<Scalars['Boolean']['input']>;
  plain?: InputMaybe<Scalars['Boolean']['input']>;
  raw?: InputMaybe<Scalars['Boolean']['input']>;
  skipLocked?: InputMaybe<Scalars['Boolean']['input']>;
  subQuery?: InputMaybe<Scalars['Boolean']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  useMaster?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<VideoWherClause>;
};

export type VideoWherClause = {
  country?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Array<Scalars['Int']['input']>>;
  language?: InputMaybe<Scalars['String']['input']>;
  poster?: InputMaybe<Scalars['String']['input']>;
  trailerUrl?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  view?: InputMaybe<Scalars['Int']['input']>;
};

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserEntity', id: number, username: string, createdAt: any, fullname: string, email: string, phone?: string | null, address?: string | null, accessToken?: string | null, roleId: number, role: { __typename?: 'RoleEntity', name: string, id: number } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'ObjectMessage', statusCode?: number | null, message: string } };

export type FindAllCategoryQueryVariables = Exact<{
  categoryFilter?: InputMaybe<CategoryFilter>;
}>;


export type FindAllCategoryQuery = { __typename?: 'Query', findAllCategory?: Array<{ __typename?: 'CategoryEntity', name: string, id: number, videos: Array<{ __typename?: 'VideoEntity', id: number, name: string, url: string, trailerUrl?: string | null, language?: string | null, view?: number | null, country: string, poster: string, description: string }> }> | null };

export type FindOneCategoryQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type FindOneCategoryQuery = { __typename?: 'Query', findOneCategory?: { __typename?: 'CategoryEntity', name: string, id: number, videos: Array<{ __typename?: 'VideoEntity', id: number, name: string, url: string, trailerUrl?: string | null, language?: string | null, view?: number | null, country: string, poster: string, description: string }> } | null };

export type CreateCategoryMutationVariables = Exact<{
  createCategoryInput: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'CategoryEntity', name: string, id: number } };

export type InitializeMultipartUploadMutationVariables = Exact<{
  initMultiPartDto: InitMultiPartDto;
}>;


export type InitializeMultipartUploadMutation = { __typename?: 'Mutation', initializeMultipartUpload: { __typename?: 'InitMultiPartEntity', fileId: string, fileKey: string } };

export type GetMultipartPreSignedUrlsMutationVariables = Exact<{
  multiPartPreSignedUrlDto: MultiPartPreSignedUrlDto;
}>;


export type GetMultipartPreSignedUrlsMutation = { __typename?: 'Mutation', getMultipartPreSignedUrls: { __typename?: 'IProcessingMultipartUploadEntity', parts: Array<{ __typename?: 'MapProcessingMultiPart', PartNumber: number, signedUrl: string }> } };

export type FinalizeMultipartUploadMutationVariables = Exact<{
  mapMultiPartFinalDto: MapMultiPartFinalDto;
}>;


export type FinalizeMultipartUploadMutation = { __typename?: 'Mutation', finalizeMultipartUpload?: any | null };

export type FindAllTagQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllTagQuery = { __typename?: 'Query', findAllTag?: Array<{ __typename?: 'TagEntity', name: string, id: number }> | null };

export type FindOneTagQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type FindOneTagQuery = { __typename?: 'Query', findOneTag?: { __typename?: 'TagEntity', name: string, id: number } | null };

export type CreateTagMutationVariables = Exact<{
  createTagInput: CreateTagInput;
}>;


export type CreateTagMutation = { __typename?: 'Mutation', createTag: { __typename?: 'TagEntity', name: string, id: number } };

export type FindAllUserQueryVariables = Exact<{
  userFilter?: InputMaybe<UserFilter>;
}>;


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

export type FindAllVideoQueryVariables = Exact<{
  videoFilter?: InputMaybe<VideoFilter>;
}>;


export type FindAllVideoQuery = { __typename?: 'Query', findAllVideo?: Array<{ __typename?: 'VideoEntity', id: number, name: string, url: string, trailerUrl?: string | null, language?: string | null, view?: number | null, country: string, description: string, poster: string, tags: Array<{ __typename?: 'TagEntity', id: number, name: string }> }> | null };

export type FindOneVideoQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type FindOneVideoQuery = { __typename?: 'Query', findOneVideo?: { __typename?: 'VideoEntity', id: number, name: string, url: string, trailerUrl?: string | null, description: string, language?: string | null, view?: number | null, country: string, poster: string, tags: Array<{ __typename?: 'TagEntity', id: number, name: string }> } | null };

export type CreateVideoMutationVariables = Exact<{
  createVideoDto: CreateVideoDto;
}>;


export type CreateVideoMutation = { __typename?: 'Mutation', createVideo: { __typename?: 'VideoEntity', id: number, name: string, url: string, language?: string | null, view?: number | null, description: string, poster: string } };


export const LoginDocument = gql`
    mutation login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    id
    username
    createdAt
    fullname
    email
    phone
    address
    accessToken
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
export const LogoutDocument = gql`
    mutation logout {
  logout {
    statusCode
    message
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const FindAllCategoryDocument = gql`
    query findAllCategory($categoryFilter: CategoryFilter) {
  findAllCategory(categoryFilter: $categoryFilter) {
    name
    id
    videos {
      id
      name
      url
      trailerUrl
      language
      view
      country
      poster
      description
    }
  }
}
    `;

/**
 * __useFindAllCategoryQuery__
 *
 * To run a query within a React component, call `useFindAllCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllCategoryQuery({
 *   variables: {
 *      categoryFilter: // value for 'categoryFilter'
 *   },
 * });
 */
export function useFindAllCategoryQuery(baseOptions?: Apollo.QueryHookOptions<FindAllCategoryQuery, FindAllCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllCategoryQuery, FindAllCategoryQueryVariables>(FindAllCategoryDocument, options);
      }
export function useFindAllCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllCategoryQuery, FindAllCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllCategoryQuery, FindAllCategoryQueryVariables>(FindAllCategoryDocument, options);
        }
export type FindAllCategoryQueryHookResult = ReturnType<typeof useFindAllCategoryQuery>;
export type FindAllCategoryLazyQueryHookResult = ReturnType<typeof useFindAllCategoryLazyQuery>;
export type FindAllCategoryQueryResult = Apollo.QueryResult<FindAllCategoryQuery, FindAllCategoryQueryVariables>;
export const FindOneCategoryDocument = gql`
    query findOneCategory($id: Int!) {
  findOneCategory(id: $id) {
    name
    id
    videos {
      id
      name
      url
      trailerUrl
      language
      view
      country
      poster
      description
    }
  }
}
    `;

/**
 * __useFindOneCategoryQuery__
 *
 * To run a query within a React component, call `useFindOneCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneCategoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneCategoryQuery(baseOptions: Apollo.QueryHookOptions<FindOneCategoryQuery, FindOneCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneCategoryQuery, FindOneCategoryQueryVariables>(FindOneCategoryDocument, options);
      }
export function useFindOneCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneCategoryQuery, FindOneCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneCategoryQuery, FindOneCategoryQueryVariables>(FindOneCategoryDocument, options);
        }
export type FindOneCategoryQueryHookResult = ReturnType<typeof useFindOneCategoryQuery>;
export type FindOneCategoryLazyQueryHookResult = ReturnType<typeof useFindOneCategoryLazyQuery>;
export type FindOneCategoryQueryResult = Apollo.QueryResult<FindOneCategoryQuery, FindOneCategoryQueryVariables>;
export const CreateCategoryDocument = gql`
    mutation createCategory($createCategoryInput: CreateCategoryInput!) {
  createCategory(createCategoryInput: $createCategoryInput) {
    name
    id
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      createCategoryInput: // value for 'createCategoryInput'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const InitializeMultipartUploadDocument = gql`
    mutation initializeMultipartUpload($initMultiPartDto: InitMultiPartDto!) {
  initializeMultipartUpload(initMultiPartDto: $initMultiPartDto) {
    fileId
    fileKey
  }
}
    `;
export type InitializeMultipartUploadMutationFn = Apollo.MutationFunction<InitializeMultipartUploadMutation, InitializeMultipartUploadMutationVariables>;

/**
 * __useInitializeMultipartUploadMutation__
 *
 * To run a mutation, you first call `useInitializeMultipartUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInitializeMultipartUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [initializeMultipartUploadMutation, { data, loading, error }] = useInitializeMultipartUploadMutation({
 *   variables: {
 *      initMultiPartDto: // value for 'initMultiPartDto'
 *   },
 * });
 */
export function useInitializeMultipartUploadMutation(baseOptions?: Apollo.MutationHookOptions<InitializeMultipartUploadMutation, InitializeMultipartUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InitializeMultipartUploadMutation, InitializeMultipartUploadMutationVariables>(InitializeMultipartUploadDocument, options);
      }
export type InitializeMultipartUploadMutationHookResult = ReturnType<typeof useInitializeMultipartUploadMutation>;
export type InitializeMultipartUploadMutationResult = Apollo.MutationResult<InitializeMultipartUploadMutation>;
export type InitializeMultipartUploadMutationOptions = Apollo.BaseMutationOptions<InitializeMultipartUploadMutation, InitializeMultipartUploadMutationVariables>;
export const GetMultipartPreSignedUrlsDocument = gql`
    mutation getMultipartPreSignedUrls($multiPartPreSignedUrlDto: MultiPartPreSignedUrlDto!) {
  getMultipartPreSignedUrls(multiPartPreSignedUrlDto: $multiPartPreSignedUrlDto) {
    parts {
      PartNumber
      signedUrl
    }
  }
}
    `;
export type GetMultipartPreSignedUrlsMutationFn = Apollo.MutationFunction<GetMultipartPreSignedUrlsMutation, GetMultipartPreSignedUrlsMutationVariables>;

/**
 * __useGetMultipartPreSignedUrlsMutation__
 *
 * To run a mutation, you first call `useGetMultipartPreSignedUrlsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetMultipartPreSignedUrlsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getMultipartPreSignedUrlsMutation, { data, loading, error }] = useGetMultipartPreSignedUrlsMutation({
 *   variables: {
 *      multiPartPreSignedUrlDto: // value for 'multiPartPreSignedUrlDto'
 *   },
 * });
 */
export function useGetMultipartPreSignedUrlsMutation(baseOptions?: Apollo.MutationHookOptions<GetMultipartPreSignedUrlsMutation, GetMultipartPreSignedUrlsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetMultipartPreSignedUrlsMutation, GetMultipartPreSignedUrlsMutationVariables>(GetMultipartPreSignedUrlsDocument, options);
      }
export type GetMultipartPreSignedUrlsMutationHookResult = ReturnType<typeof useGetMultipartPreSignedUrlsMutation>;
export type GetMultipartPreSignedUrlsMutationResult = Apollo.MutationResult<GetMultipartPreSignedUrlsMutation>;
export type GetMultipartPreSignedUrlsMutationOptions = Apollo.BaseMutationOptions<GetMultipartPreSignedUrlsMutation, GetMultipartPreSignedUrlsMutationVariables>;
export const FinalizeMultipartUploadDocument = gql`
    mutation finalizeMultipartUpload($mapMultiPartFinalDto: MapMultiPartFinalDto!) {
  finalizeMultipartUpload(mapMultiPartFinalDto: $mapMultiPartFinalDto)
}
    `;
export type FinalizeMultipartUploadMutationFn = Apollo.MutationFunction<FinalizeMultipartUploadMutation, FinalizeMultipartUploadMutationVariables>;

/**
 * __useFinalizeMultipartUploadMutation__
 *
 * To run a mutation, you first call `useFinalizeMultipartUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFinalizeMultipartUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [finalizeMultipartUploadMutation, { data, loading, error }] = useFinalizeMultipartUploadMutation({
 *   variables: {
 *      mapMultiPartFinalDto: // value for 'mapMultiPartFinalDto'
 *   },
 * });
 */
export function useFinalizeMultipartUploadMutation(baseOptions?: Apollo.MutationHookOptions<FinalizeMultipartUploadMutation, FinalizeMultipartUploadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FinalizeMultipartUploadMutation, FinalizeMultipartUploadMutationVariables>(FinalizeMultipartUploadDocument, options);
      }
export type FinalizeMultipartUploadMutationHookResult = ReturnType<typeof useFinalizeMultipartUploadMutation>;
export type FinalizeMultipartUploadMutationResult = Apollo.MutationResult<FinalizeMultipartUploadMutation>;
export type FinalizeMultipartUploadMutationOptions = Apollo.BaseMutationOptions<FinalizeMultipartUploadMutation, FinalizeMultipartUploadMutationVariables>;
export const FindAllTagDocument = gql`
    query findAllTag {
  findAllTag {
    name
    id
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
    id
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
export const CreateTagDocument = gql`
    mutation createTag($createTagInput: CreateTagInput!) {
  createTag(createTagInput: $createTagInput) {
    name
    id
  }
}
    `;
export type CreateTagMutationFn = Apollo.MutationFunction<CreateTagMutation, CreateTagMutationVariables>;

/**
 * __useCreateTagMutation__
 *
 * To run a mutation, you first call `useCreateTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagMutation, { data, loading, error }] = useCreateTagMutation({
 *   variables: {
 *      createTagInput: // value for 'createTagInput'
 *   },
 * });
 */
export function useCreateTagMutation(baseOptions?: Apollo.MutationHookOptions<CreateTagMutation, CreateTagMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTagMutation, CreateTagMutationVariables>(CreateTagDocument, options);
      }
export type CreateTagMutationHookResult = ReturnType<typeof useCreateTagMutation>;
export type CreateTagMutationResult = Apollo.MutationResult<CreateTagMutation>;
export type CreateTagMutationOptions = Apollo.BaseMutationOptions<CreateTagMutation, CreateTagMutationVariables>;
export const FindAllUserDocument = gql`
    query findAllUser($userFilter: UserFilter) {
  findAllUser(userFilter: $userFilter) {
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
 *      userFilter: // value for 'userFilter'
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
export const FindAllVideoDocument = gql`
    query findAllVideo($videoFilter: VideoFilter) {
  findAllVideo(videoFilter: $videoFilter) {
    id
    name
    url
    trailerUrl
    language
    view
    country
    description
    poster
    tags {
      id
      name
    }
  }
}
    `;

/**
 * __useFindAllVideoQuery__
 *
 * To run a query within a React component, call `useFindAllVideoQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllVideoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllVideoQuery({
 *   variables: {
 *      videoFilter: // value for 'videoFilter'
 *   },
 * });
 */
export function useFindAllVideoQuery(baseOptions?: Apollo.QueryHookOptions<FindAllVideoQuery, FindAllVideoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllVideoQuery, FindAllVideoQueryVariables>(FindAllVideoDocument, options);
      }
export function useFindAllVideoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllVideoQuery, FindAllVideoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllVideoQuery, FindAllVideoQueryVariables>(FindAllVideoDocument, options);
        }
export type FindAllVideoQueryHookResult = ReturnType<typeof useFindAllVideoQuery>;
export type FindAllVideoLazyQueryHookResult = ReturnType<typeof useFindAllVideoLazyQuery>;
export type FindAllVideoQueryResult = Apollo.QueryResult<FindAllVideoQuery, FindAllVideoQueryVariables>;
export const FindOneVideoDocument = gql`
    query findOneVideo($id: Int!) {
  findOneVideo(id: $id) {
    id
    name
    url
    trailerUrl
    description
    language
    view
    country
    poster
    tags {
      id
      name
    }
  }
}
    `;

/**
 * __useFindOneVideoQuery__
 *
 * To run a query within a React component, call `useFindOneVideoQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOneVideoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOneVideoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindOneVideoQuery(baseOptions: Apollo.QueryHookOptions<FindOneVideoQuery, FindOneVideoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindOneVideoQuery, FindOneVideoQueryVariables>(FindOneVideoDocument, options);
      }
export function useFindOneVideoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOneVideoQuery, FindOneVideoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindOneVideoQuery, FindOneVideoQueryVariables>(FindOneVideoDocument, options);
        }
export type FindOneVideoQueryHookResult = ReturnType<typeof useFindOneVideoQuery>;
export type FindOneVideoLazyQueryHookResult = ReturnType<typeof useFindOneVideoLazyQuery>;
export type FindOneVideoQueryResult = Apollo.QueryResult<FindOneVideoQuery, FindOneVideoQueryVariables>;
export const CreateVideoDocument = gql`
    mutation createVideo($createVideoDto: CreateVideoDto!) {
  createVideo(createVideoDto: $createVideoDto) {
    id
    name
    url
    language
    view
    description
    poster
  }
}
    `;
export type CreateVideoMutationFn = Apollo.MutationFunction<CreateVideoMutation, CreateVideoMutationVariables>;

/**
 * __useCreateVideoMutation__
 *
 * To run a mutation, you first call `useCreateVideoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVideoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVideoMutation, { data, loading, error }] = useCreateVideoMutation({
 *   variables: {
 *      createVideoDto: // value for 'createVideoDto'
 *   },
 * });
 */
export function useCreateVideoMutation(baseOptions?: Apollo.MutationHookOptions<CreateVideoMutation, CreateVideoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVideoMutation, CreateVideoMutationVariables>(CreateVideoDocument, options);
      }
export type CreateVideoMutationHookResult = ReturnType<typeof useCreateVideoMutation>;
export type CreateVideoMutationResult = Apollo.MutationResult<CreateVideoMutation>;
export type CreateVideoMutationOptions = Apollo.BaseMutationOptions<CreateVideoMutation, CreateVideoMutationVariables>;