import useStore from '../useStore'
import { peekAll } from '../methods'

const usePeekAll = (query, config) => {
  const { runtimeStorage, defaultAdapter, models } = useStore()
  const jsonData = JSON.parse(
    '{"users":{"7WB6kbZSPbrzuJJlmOwQ":{"firstName":"Yevhen","lastName":"Bogdanov1","id":"7WB6kbZSPbrzuJJlmOwQ","birthDate":null,"age":"30","public":true,"interests":["interest1","interest2","interest3"],"address":"address1"}},"addresses":{"address1":{"country":"country1","city":"city1","id":"address1"}},"cities":{"city1":{"id":"city1","name":"Khmelnitskiy"}},"countries":{"country1":{"id":"country1","name":"Ukraine"}},"interests":{"interest1":{"id":"interest1","name":"JS"},"interest2":{"id":"interest2","name":"MongoDB"},"interest3":{"name":"NodeJS","id":"interest3"}}}'
  )

  runtimeStorage.state = jsonData
  console.log(runtimeStorage)

  peekAll(query, runtimeStorage, models)
}

export default usePeekAll
