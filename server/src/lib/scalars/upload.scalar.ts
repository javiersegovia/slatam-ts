import { Scalar } from '@nestjs/graphql'
import { GraphQLUpload } from 'apollo-server-express'
import { FileUpload } from 'graphql-upload'

@Scalar('Upload')
export class Upload {
  description = 'Upload custom scalar type'

  parseValue(value: FileUpload) {
    return GraphQLUpload.parseValue(value)
  }

  serialize(value: any) {
    return GraphQLUpload.serialize(value)
  }

  parseLiteral(ast) {
    return GraphQLUpload.parseLiteral(ast, ast.value)
  }
}
