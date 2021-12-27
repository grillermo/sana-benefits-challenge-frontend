import { useContext } from 'react'
import { useLocation } from 'wouter';

import RegistrationForm from './RegistrationForm'
import emailValidation from '../../utils/emailValidation'
import { signUp } from '../../utils/apiClient'

import AuthContext from '../../contextProviders/authContext'

export function handleSubmit(values, setSubmitting, authDispatch, setLocation) {
  setSubmitting(true)

  return signUp(values).then((user) => {
    authDispatch({
      type: 'SIGNIN',
      payload: user
    })

    setLocation('/configuration')
  }).catch((errorMessage) => {
    setSubmitting(false)
  })

}

const RegistrationFormContainer = () => {
  const { dispatch: authDispatch } = useContext(AuthContext);
  const setLocation = useLocation()[1];

  return (
    <RegistrationForm
      emailValidation={emailValidation}
      handleSubmit={(values, { setSubmitting }) => (
        handleSubmit(values, setSubmitting, authDispatch, setLocation)
      )}
    />
  )
}

export default RegistrationFormContainer
