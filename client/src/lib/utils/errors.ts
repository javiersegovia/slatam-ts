import { GraphQLError } from 'graphql'

export const getExceptionErrors = (errors: readonly GraphQLError[]) => {
  const exceptionErrors = errors.map(({ message, extensions }) => {
    return {
      message,
      info: extensions?.exception?.response?.data,
    }
  })

  return exceptionErrors[0]
}
