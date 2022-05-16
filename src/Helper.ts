import path from 'path'

function root(folder = '') {
  return path.resolve(process.cwd()) + '/' + removeSlash(folder)
}

function publicPath(file = '') {
  return root('public') + '/' + removeSlash(file)
}

function storagePath(file = '') {
  return root('storage') + '/' + removeSlash(file)
}

function removeSlash(data: any): any {
  return data.replace(/^\/|\/$/g, '')
}

export { root, publicPath, storagePath, removeSlash }
