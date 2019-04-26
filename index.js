import { checkNpmVersions } from 'meteor/tmeasday:check-npm-versions'

checkNpmVersions({
  'react': '16.8.0'
}, 'quarterto:hooks')

export * from './hooks'