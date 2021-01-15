import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any
}

export type AuthPayload = {
  __typename?: 'AuthPayload'
  accessToken: Scalars['String']
  user: User
}

export type Company = {
  __typename?: 'Company'
  /** Identifies the date and time when the object was created */
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  members: Array<CompanyMember>
  name: Scalars['String']
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']
}

export type CompanyMember = {
  __typename?: 'CompanyMember'
  company: Company
  /** Identifies the date and time when the object was created */
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  roles: Array<CompanyMemberRole>
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']
  user: User
}

/** Company member role */
export enum CompanyMemberRole {
  Manager = 'MANAGER',
  Member = 'MEMBER',
  Owner = 'OWNER',
}

export type LoginInput = {
  email: Scalars['String']
  password: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  login: AuthPayload
  logout: Scalars['Boolean']
  logoutFromAllDevices: Scalars['Boolean']
  refreshAccessToken: AuthPayload
  register: Scalars['Boolean']
  requestResetPassword: Scalars['Boolean']
  resendVerificationEmail: Scalars['Boolean']
  resetPassword: Scalars['Boolean']
  verifyEmail: AuthPayload
}

export type MutationLoginArgs = {
  data: LoginInput
}

export type MutationLogoutFromAllDevicesArgs = {
  userId: Scalars['Int']
}

export type MutationRegisterArgs = {
  data: SignupInput
}

export type MutationRequestResetPasswordArgs = {
  email: Scalars['String']
}

export type MutationResendVerificationEmailArgs = {
  email: Scalars['String']
}

export type MutationResetPasswordArgs = {
  data: ResetPasswordInput
}

export type MutationVerifyEmailArgs = {
  token: Scalars['String']
}

export type Post = {
  __typename?: 'Post'
  author?: Maybe<User>
  content?: Maybe<Scalars['String']>
  /** Identifies the date and time when the object was created */
  createdAt: Scalars['DateTime']
  id: Scalars['ID']
  published: Scalars['Boolean']
  title: Scalars['String']
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']
}

export type Product = {
  __typename?: 'Product'
  /** Identifies the date and time when the object was created */
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  name: Scalars['String']
  owner: Company
  status: ProductStatus
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']
}

/** Product status (visibility) role */
export enum ProductStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export type Query = {
  __typename?: 'Query'
  getAllCompanies?: Maybe<Array<Company>>
  getAllProducts?: Maybe<Array<Product>>
  getAllUsers?: Maybe<Array<User>>
  getPost?: Maybe<Post>
  getPublishedPosts?: Maybe<Array<Post>>
  getUser?: Maybe<User>
  helloCompany: Scalars['String']
  helloProduct: Scalars['String']
}

export type QueryGetPostArgs = {
  id: Scalars['String']
}

export type QueryGetUserArgs = {
  id: Scalars['Int']
}

export type ResetPasswordInput = {
  password: Scalars['String']
  resetPasswordToken: Scalars['String']
}

export type SignupInput = {
  email: Scalars['String']
  firstName?: Maybe<Scalars['String']>
  lastName?: Maybe<Scalars['String']>
  password: Scalars['String']
}

export type User = {
  __typename?: 'User'
  companyMember?: Maybe<CompanyMember>
  /** Identifies the date and time when the object was created */
  createdAt: Scalars['DateTime']
  email: Scalars['String']
  firstName?: Maybe<Scalars['String']>
  id: Scalars['ID']
  lastName?: Maybe<Scalars['String']>
  posts?: Maybe<Array<Post>>
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']
  verification: UserVerification
}

export type UserVerification = {
  __typename?: 'UserVerification'
  verifiedEmail: Scalars['Boolean']
}

export type HelloCompanyQueryVariables = Exact<{ [key: string]: never }>

export type HelloCompanyQuery = { __typename?: 'Query' } & Pick<
  Query,
  'helloCompany'
>

export const HelloCompanyDocument = gql`
  query helloCompany {
    helloCompany
  }
`

/**
 * __useHelloCompanyQuery__
 *
 * To run a query within a React component, call `useHelloCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloCompanyQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloCompanyQuery(
  baseOptions?: Apollo.QueryHookOptions<
    HelloCompanyQuery,
    HelloCompanyQueryVariables
  >
) {
  return Apollo.useQuery<HelloCompanyQuery, HelloCompanyQueryVariables>(
    HelloCompanyDocument,
    baseOptions
  )
}
export function useHelloCompanyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    HelloCompanyQuery,
    HelloCompanyQueryVariables
  >
) {
  return Apollo.useLazyQuery<HelloCompanyQuery, HelloCompanyQueryVariables>(
    HelloCompanyDocument,
    baseOptions
  )
}
export type HelloCompanyQueryHookResult = ReturnType<
  typeof useHelloCompanyQuery
>
export type HelloCompanyLazyQueryHookResult = ReturnType<
  typeof useHelloCompanyLazyQuery
>
export type HelloCompanyQueryResult = Apollo.QueryResult<
  HelloCompanyQuery,
  HelloCompanyQueryVariables
>
