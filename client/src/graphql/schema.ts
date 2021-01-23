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

export type Address = {
  __typename?: 'Address'
  country: Country
  /** Identifies the date and time when the object was created */
  createdAt: Scalars['DateTime']
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  owner: UserInformation
  postalCode?: Maybe<Scalars['String']>
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']
}

export type Category = {
  __typename?: 'Category'
  /** Identifies the date and time when the object was created */
  createdAt: Scalars['DateTime']
  id: Scalars['Int']
  name: Scalars['String']
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']
}

export type Company = {
  __typename?: 'Company'
  /** Identifies the date and time when the object was created */
  createdAt: Scalars['DateTime']
  id: Scalars['Int']
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
  id: Scalars['Int']
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

export type Country = {
  __typename?: 'Country'
  code2: Scalars['String']
  /** Identifies the date and time when the object was created */
  createdAt: Scalars['DateTime']
  flag: Scalars['String']
  id: Scalars['Int']
  name: Scalars['String']
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']
}

export type CountryInput = {
  id: Scalars['Int']
}

export type CreateCategoryInput = {
  name: Scalars['String']
}

export type CreateCountryInput = {
  code2: Scalars['String']
  flag: Scalars['String']
  name: Scalars['String']
}

export type CreateOrUpdateAddressInput = {
  country: CountryInput
  description?: Maybe<Scalars['String']>
  postalCode?: Maybe<Scalars['String']>
}

/** User gender */
export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE',
  NonBinary = 'NON_BINARY',
}

export type Mutation = {
  __typename?: 'Mutation'
  createCategory: Category
  createCountry: Country
  deleteCategory: Scalars['Boolean']
  deleteCountry: Scalars['Boolean']
  login: Scalars['Boolean']
  logout: Scalars['Boolean']
  register: Scalars['Boolean']
  requestResetPassword: Scalars['Boolean']
  resendVerificationEmail: Scalars['Boolean']
  resetPassword: Scalars['Boolean']
  updateCategory: Category
  updateCountry: Country
  updateCurrentUser: Scalars['Boolean']
  verifyEmail: Scalars['Boolean']
}

export type MutationCreateCategoryArgs = {
  data: CreateCategoryInput
}

export type MutationCreateCountryArgs = {
  data: CreateCountryInput
}

export type MutationDeleteCategoryArgs = {
  id: Scalars['Int']
}

export type MutationDeleteCountryArgs = {
  id: Scalars['Int']
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

export type MutationUpdateCategoryArgs = {
  data: UpdateCategoryInput
}

export type MutationUpdateCountryArgs = {
  data: UpdateCountryInput
}

export type MutationUpdateCurrentUserArgs = {
  data: UpdateUserInput
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
  id: Scalars['Int']
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
  getAllCategories?: Maybe<Array<Category>>
  getAllCompanies?: Maybe<Array<Company>>
  getAllCountries?: Maybe<Array<Country>>
  getAllProducts?: Maybe<Array<Product>>
  getAllUsers?: Maybe<Array<User>>
  getCategory: Category
  getCountry: Country
  getPost?: Maybe<Post>
  getPublishedPosts?: Maybe<Array<Post>>
  getUser?: Maybe<User>
  helloProduct: Scalars['String']
}

export type QueryGetCategoryArgs = {
  id: Scalars['Int']
}

export type QueryGetCountryArgs = {
  id: Scalars['Int']
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

export type UpdateCategoryInput = {
  id: Scalars['Int']
  name: Scalars['String']
}

export type UpdateCountryInput = {
  code2: Scalars['String']
  flag: Scalars['String']
  id: Scalars['Int']
  name: Scalars['String']
}

export type UpdateUserInformationInput = {
  address?: Maybe<CreateOrUpdateAddressInput>
  birthDate?: Maybe<Scalars['DateTime']>
  gender?: Maybe<Gender>
  nationality?: Maybe<Array<CountryInput>>
  occupation?: Maybe<Scalars['String']>
}

export type UpdateUserInput = {
  firstName?: Maybe<Scalars['String']>
  information?: Maybe<UpdateUserInformationInput>
  lastName?: Maybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  companyMember?: Maybe<CompanyMember>
  /** Identifies the date and time when the object was created */
  createdAt: Scalars['DateTime']
  email: Scalars['String']
  firstName?: Maybe<Scalars['String']>
  id: Scalars['Int']
  information?: Maybe<UserInformation>
  lastName?: Maybe<Scalars['String']>
  posts?: Maybe<Array<Post>>
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']
  verification: UserVerification
}

export type UserInformation = {
  __typename?: 'UserInformation'
  address?: Maybe<Address>
  birthDate?: Maybe<Scalars['DateTime']>
  /** Identifies the date and time when the object was created */
  createdAt: Scalars['DateTime']
  gender?: Maybe<Gender>
  id: Scalars['ID']
  nationality?: Maybe<Array<Country>>
  occupation?: Maybe<Scalars['String']>
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['DateTime']
  user: User
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

export type UpdateCurrentUserMutationVariables = Exact<{
  data: UpdateUserInput
}>

export type UpdateCurrentUserMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'updateCurrentUser'
>

export type VerifyEmailMutationVariables = Exact<{
  token: Scalars['String']
}>

export type VerifyEmailMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'verifyEmail'
>

export type CurrentUserProfileDataQueryVariables = Exact<{
  [key: string]: never
}>

export type CurrentUserProfileDataQuery = { __typename?: 'Query' } & {
  currentUser: { __typename?: 'User' } & Pick<
    User,
    'id' | 'email' | 'firstName' | 'lastName'
  > & {
      information?: Maybe<
        { __typename?: 'UserInformation' } & Pick<
          UserInformation,
          'gender' | 'birthDate' | 'occupation'
        > & {
            nationality?: Maybe<
              Array<{ __typename?: 'Country' } & Pick<Country, 'id'>>
            >
            address?: Maybe<
              { __typename?: 'Address' } & Pick<
                Address,
                'description' | 'postalCode'
              > & {
                  country: { __typename?: 'Country' } & Pick<
                    Country,
                    'id' | 'name'
                  >
                }
            >
          }
      >
    }
  getAllCountries?: Maybe<
    Array<{ __typename?: 'Country' } & Pick<Country, 'id' | 'name'>>
  >
}

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

export type GetAllCountriesQueryVariables = Exact<{ [key: string]: never }>

export type GetAllCountriesQuery = { __typename?: 'Query' } & {
  getAllCountries?: Maybe<
    Array<{ __typename?: 'Country' } & Pick<Country, 'id' | 'name' | 'flag'>>
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
