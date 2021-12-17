import { useCallback } from 'react'
import { useStore, useMutations, useModel } from 'services/qonsoll-data/Store'
import moment from 'moment'
import _ from 'lodash'

const useCreateRecord = () => {
  const { runtimeStorage } = useStore()
  const { add } = useMutations()
  const [userModel] = useModel('user')

  const createRecord = useCallback(
    (currentUserId, currentAddressId) => {
      let userData = runtimeStorage.get(`unsaved.users.${currentUserId}`)
      userData.address = currentAddressId
      userData.birthDate =
        moment(userData.birthDate).format('YYYY-MM-DD') || null

      userData = _.merge(userModel.defaultValues, userData)

      let addressData = runtimeStorage.get(
        `unsaved.addresses.${currentAddressId}`
      )
      const interestsData = runtimeStorage.get(`unsaved.interests`)

      userData && addressData && add('user', currentUserId, userData)
      userData && addressData && add('address', currentAddressId, addressData)
      interestsData &&
        Object.entries(interestsData).forEach(
          (interest) => interest && add('interest', interest?.id, interest)
        )

      console.log(runtimeStorage)
    },
    [add, runtimeStorage, userModel?.defaultValues]
  )

  return createRecord
}

export default useCreateRecord
