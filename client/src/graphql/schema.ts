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

export type Mutation = {
  __typename?: 'Mutation'
  login: Scalars['Boolean']
  logout: Scalars['Boolean']
  register: Scalars['Boolean']
  requestResetPassword: Scalars['Boolean']
  resendVerificationEmail: Scalars['Boolean']
  resetPassword: Scalars['Boolean']
  verifyEmail: Scalars['Boolean']
}

export type MutationLoginArgs = {
  data: SignInInput
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
  currentUser: User
  getAllCompanies?: Maybe<Array<Company>>
  getAllProducts?: Maybe<Array<Product>>
  getAllUsers?: Maybe<Array<User>>
  getPost?: Maybe<Post>
  getPublishedPosts?: Maybe<Array<Post>>
  getUser?: Maybe<User>
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

export type SignInInput = {
  email: Scalars['String']
  password: Scalars['String']
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

export type ChangePasswordMutationVariables = Exact<{
  data: ResetPasswordInput
}>

export type ChangePasswordMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'resetPassword'
>

export type RequestConfirmationEmailMutationVariables = Exact<{
  email: Scalars['String']
}>

export type RequestConfirmationEmailMutation = {
  __typename?: 'Mutation'
} & Pick<Mutation, 'resendVerificationEmail'>

export type RequestPasswordMutationVariables = Exact<{
  email: Scalars['String']
}>

export type RequestPasswordMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'requestResetPassword'
>

export type SignInMutationVariables = Exact<{
  data: SignInInput
}>

export type SignInMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'login'
>

export type SignOutMutationVariables = Exact<{ [key: string]: never }>

export type SignOutMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'logout'
>

export type SignUpMutationVariables = Exact<{
  data: SignupInput
}>

export type SignUpMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'register'
>

export type VerifyEmailMutationVariables = Exact<{
  token: Scalars['String']
}>

export type VerifyEmailMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'verifyEmail'
>

export type AllCompaniesQueryVariables = Exact<{ [key: string]: never }>

export type AllCompaniesQuery = { __typename?: 'Query' } & {
  getAllCompanies?: Maybe<
    Array<
      { __typename?: 'Company' } & Pick<Company, 'id' | 'name'> & {
          members: Array<
            { __typename?: 'CompanyMember' } & Pick<
              CompanyMember,
              'id' | 'roles'
            > & { user: { __typename?: 'User' } & Pick<User, 'email'> }
          >
        }
    >
  >
}

export type AllUsersQueryVariables = Exact<{ [key: string]: never }>

export type AllUsersQuery = { __typename?: 'Query' } & {
  getAllUsers?: Maybe<
    Array<
      { __typename?: 'User' } & Pick<
        User,
        'id' | 'email' | 'firstName' | 'lastName'
      >
    >
  >
}

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type GetCurrentUserQuery = { __typename?: 'Query' } & {
  currentUser: { __typename?: 'User' } & Pick<
    User,
    'id' | 'email' | 'firstName' | 'lastName'
  > & {
      verification: { __typename?: 'UserVerification' } & Pick<
        UserVerification,
        'verifiedEmail'
      >
      companyMember?: Maybe<
        { __typename?: 'CompanyMember' } & Pick<CompanyMember, 'roles'> & {
            company: { __typename?: 'Company' } & Pick<Company, 'id' | 'name'>
          }
      >
    }
}
