const traverseQuery = async (obj, callback) => {
  const path = []
  const deepRead = async (obj, path) => {
    for (let key in obj) {
      path.push(key)
      if (typeof obj[key] === 'object') {
        await callback(key, obj[key], path)
        await deepRead(obj[key], path)
        path.pop()
      } else {
        await callback(key, obj[key], path)
        path.pop()
      }
    }
  }
  await deepRead(obj, path)
}

export default traverseQuery
