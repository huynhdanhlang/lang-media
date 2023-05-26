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
};

export type CategoryClient = {
  __typename?: 'CategoryClient';
  name: Scalars['String']['output'];
};

export type CreateCategoryInput = {
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
  view?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: CategoryClient;
  createTag: TagClient;
  createUser: UserClient;
  createVideo: VideoClient;
  removeCategory: CategoryClient;
  removeTag: TagClient;
  removeUser: UserClient;
  removeVideo: VideoClient;
  updateCategory: CategoryClient;
  updateTag: TagClient;
  updateUser: UserClient;
  updateVideo: VideoClient;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
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


export type MutationRemoveCategoryArgs = {
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
  findAllCategory: Array<CategoryClient>;
  findAllTag: Array<TagClient>;
  findAllUser?: Maybe<Array<UserClient>>;
  findAllVideo: Array<VideoClient>;
  findOneCategory: CategoryClient;
  findOneTag: TagClient;
  findOneUser?: Maybe<UserClient>;
  findOneVideo: VideoClient;
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

export type TagClient = {
  __typename?: 'TagClient';
  name: Scalars['String']['output'];
};

export type UpdateCategoryInput = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTagInput = {
  id: Scalars['Int']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  fullname?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  /** user's password */
  password?: InputMaybe<Scalars['String']['input']>;
  /** user's name */
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateVideoInput = {
  country?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  language?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  trailerUrl?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
  view?: InputMaybe<Scalars['String']['input']>;
};

export type UserClient = {
  __typename?: 'UserClient';
  address?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  fullname: Scalars['String']['output'];
  /** user's password */
  password: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  /** user's name */
  username: Scalars['String']['output'];
};

export type VideoClient = {
  __typename?: 'VideoClient';
  country: Scalars['String']['output'];
  language?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  trailerUrl?: Maybe<Scalars['String']['output']>;
  url: Scalars['String']['output'];
  view?: Maybe<Scalars['String']['output']>;
};

export type FindAllTagQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllTagQuery = { __typename?: 'Query', findAllTag: Array<{ __typename?: 'TagClient', name: string }> };


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