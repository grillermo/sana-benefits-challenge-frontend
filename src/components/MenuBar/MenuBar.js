import { useContext } from "react";

import { Link } from "wouter";

import AuthContext from '../../contextProviders/authContext'

const SignedInLinks = () => (
  <li>
    <Link href='/sign_out'>
      <a href='/sign_out'> Sign out</a>
    </Link>
  </li>
)

const SignedOutLinks = () => (
  <>
    <li>
      <Link href='/sign_up'>
        <a href='/sign_up'>Sign up</a>
      </Link>
    </li>
    <li>
      <Link href='/sign_in'>
        <a href='/sign_in'>Sign in</a>
      </Link>
    </li>
  </>
)

export default function MenuBar(){
  const { state: authState } = useContext(AuthContext);

  return(
    <nav>
      <ul>
        <li>
          Sana Warnings
        </li>
      </ul>
      <ul>
        {authState.isAuthenticated ? <SignedInLinks /> : <SignedOutLinks />}
      </ul>
    </nav>
  )
}
