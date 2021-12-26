import { useEffect } from 'react'

import { Redirect } from 'wouter'
import { useContext } from 'react'

import AuthContext from '../../contextProviders/authContext'

const SignOutContainer = () => {
  const { dispatch: authDispatch } = useContext(AuthContext)

  useEffect(() => {
    authDispatch({type: 'SIGNOUT'})
  });

  return(
    <Redirect to={'/'} />
  )
}

export default SignOutContainer
