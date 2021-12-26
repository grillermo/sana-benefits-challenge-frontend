import { useContext } from 'react'

import RegistrationForm from './RegistrationForm'
import emailValidation from '../../utils/emailValidation'
import { signUp } from '../../utils/apiClient'

import AuthContext from '../../contextProviders/authContext'

function handleSubmit(values, setSubmitting, authDispatch) {
  setSubmitting(true)

  signUp(values).then((user) => {
    authDispatch({
      type: 'SIGNIN',
      payload: user
    })
  }).catch((errorMessage) => {
    setSubmitting(false)
  })

}

const RegistrationFormContainer = () => {
  const { dispatch: authDispatch } = useContext(AuthContext);

  return (
    <RegistrationForm
      emailValidation={emailValidation}
      handleSubmit={(values, { setSubmitting }) => (
        handleSubmit(values, setSubmitting, authDispatch)
      )}
    />
  )
}

export default RegistrationFormContainer
