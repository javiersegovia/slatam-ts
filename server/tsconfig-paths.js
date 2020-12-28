import tsConfig from 'tsconfig.json'
import tsConfigPaths from 'tsconfig-paths'

const baseUrl = './dist' // Either absolute or relative path. If relative it's resolved to current working directory.
tsConfigPaths.register({
  baseUrl,
  paths: tsConfig.compilerOptions.paths,
})
