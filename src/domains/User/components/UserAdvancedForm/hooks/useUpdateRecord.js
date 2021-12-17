import { useCallback } from 'react'
import { useStore, useMutations } from 'services/qonsoll-data/Store'
import moment from 'moment'

const useUpdateRecord = () => {
  const { runtimeStorage } = useStore()
  const { add, update } = useMutations()

  const updateRecord = useCallback(
    (currentUserId, currentAddressId) => {
      const userData = runtimeStorage.get(`unsaved.users.${currentUserId}`)
      userData.address = currentAddressId

      const addressData = runtimeStorage.get(
        `unsaved.addresses.${currentAddressId}`
      )
      userData.birthDate = moment(userData.birthDate).format('YYYY-MM-DD')

      const interestsData = runtimeStorage.get(`unsaved.interests`)
      console.log('interestsData --->', interestsData)

      interestsData &&
        Object.entries(interestsData).forEach((interestItem) => {
          const [id, interest] = interestItem
          interest && add('interest', id, interest)
        })

      userData && update('user', currentUserId, userData)
      addressData && update('address', currentAddressId, addressData)

      console.log(runtimeStorage)
    },
    [add, runtimeStorage, update]
  )

  return updateRecord
}

export default useUpdateRecord
