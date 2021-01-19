import * as Types from './schema.graphql'

import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query'
import { gqlFetcher } from 'src/lib/react-query/client'

export const SignUpDocument = `
    mutation signUp($data: SignupInput!) {
  register(data: $data)
}
    `
export const useSignUpMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Types.SignUpMutation,
    TError,
    Types.SignUpMutationVariables,
    TContext
  >
) =>
  useMutation<
    Types.SignUpMutation,
    TError,
    Types.SignUpMutationVariables,
    TContext
  >(
    (variables?: Types.SignUpMutationVariables) =>
      gqlFetcher<Types.SignUpMutation, Types.SignUpMutationVariables>(
        SignUpDocument,
        variables
      )(),
    options
  )
export const VerifyEmailDocument = `
    mutation verifyEmail($token: String!) {
  verifyEmail(token: $token) {
    id
    email
    firstName
    lastName
  }
}
    `
export const useVerifyEmailMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    Types.VerifyEmailMutation,
    TError,
    Types.VerifyEmailMutationVariables,
    TContext
  >
) =>
  useMutation<
    Types.VerifyEmailMutation,
    TError,
    Types.VerifyEmailMutationVariables,
    TContext
  >(
    (variables?: Types.VerifyEmailMutationVariables) =>
      gqlFetcher<Types.VerifyEmailMutation, Types.VerifyEmailMutationVariables>(
        VerifyEmailDocument,
        variables
      )(),
    options
  )
export const AllCompaniesDocument = `
    query allCompanies {
  getAllCompanies {
    id
    name
    members {
      id
      roles
      user {
        email
      }
    }
  }
}
    `
export const useAllCompaniesQuery = <
  TData = Types.AllCompaniesQuery,
  TError = unknown
>(
  variables?: Types.AllCompaniesQueryVariables,
  options?: UseQueryOptions<Types.AllCompaniesQuery, TError, TData>
) =>
  useQuery<Types.AllCompaniesQuery, TError, TData>(
    ['allCompanies', variables],
    gqlFetcher<Types.AllCompaniesQuery, Types.AllCompaniesQueryVariables>(
      AllCompaniesDocument,
      variables
    ),
    options
  )
export const AllUsersDocument = `
    query allUsers {
  getAllUsers {
    id
    email
    firstName
    lastName
  }
}
    `
export const useAllUsersQuery = <TData = Types.AllUsersQuery, TError = unknown>(
  variables?: Types.AllUsersQueryVariables,
  options?: UseQueryOptions<Types.AllUsersQuery, TError, TData>
) =>
  useQuery<Types.AllUsersQuery, TError, TData>(
    ['allUsers', variables],
    gqlFetcher<Types.AllUsersQuery, Types.AllUsersQueryVariables>(
      AllUsersDocument,
      variables
    ),
    options
  )
export const GetCurrentUserDocument = `
    query getCurrentUser {
  currentUser {
    id
    email
    firstName
    lastName
    verification {
      verifiedEmail
    }
    companyMember {
      roles
      company {
        id
        name
      }
    }
  }
}
    `
export const useGetCurrentUserQuery = <
  TData = Types.GetCurrentUserQuery,
  TError = unknown
>(
  variables?: Types.GetCurrentUserQueryVariables,
  options?: UseQueryOptions<Types.GetCurrentUserQuery, TError, TData>
) =>
  useQuery<Types.GetCurrentUserQuery, TError, TData>(
    ['getCurrentUser', variables],
    gqlFetcher<Types.GetCurrentUserQuery, Types.GetCurrentUserQueryVariables>(
      GetCurrentUserDocument,
      variables
    ),
    options
  )
