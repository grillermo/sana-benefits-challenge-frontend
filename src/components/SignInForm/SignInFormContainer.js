import { useContext } from 'react'

import { useLocation } from "wouter";

import { signIn } from '../../utils/apiClient'
import SignInForm from './SignInForm'
import AuthContext from '../../contextProviders/authContext'
import emailValidation from '../../utils/emailValidation'

export function handleSubmit(values, setSubmitting, authDispatch, setLocation) {
  setSubmitting(true)

  return signIn(values).then((user) => {
    authDispatch({
      type: 'SIGNIN',
      payload: user
    })

    setLocation('/configuration')
  }).catch((errorMessage) => {
    setSubmitting(false)
  })
}

const SignInFormContainer = () => {
  const { dispatch: authDispatch } = useContext(AuthContext);
  const setLocation = useLocation()[1];

  return (
    <SignInForm
      emailValidation={emailValidation}
      handleSubmit={(values, { setSubmitting }) => (
        handleSubmit(values, setSubmitting, authDispatch, setLocation)
      )}
    />
  )
};

export default SignInFormContainer
