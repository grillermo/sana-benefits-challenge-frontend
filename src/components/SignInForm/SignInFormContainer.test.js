import React from 'react'
import { mount } from 'enzyme'
import axios from 'axios'

import SignInFormContainer, { handleSubmit } from './SignInFormContainer'
import AuthContext from '../../contextProviders/authContext'

jest.mock("axios")

describe('SignInFormContainer', () => {
  it('matches the snapshot', async () => {
    const signInFormContainer = mount(
      <AuthContext.Provider value={{
        dispatch: jest.fn()
      }} >
        <SignInFormContainer />
      </AuthContext.Provider>
    )

    expect(signInFormContainer).toMatchSnapshot();
  });
})
  
describe('handleSubmit', () => {
  // arguments
  const values = {}
  const setSubmitting = jest.fn()
  const authDispatch = jest.fn()
  const setLocation = jest.fn()
  const user = { id: 1, email: "email@domain.com" }
  const token = 'eyJhbGciOiJIUzI1...'

  beforeEach(() => {
    jest.clearAllMocks()

    let mockedResponse = {
      data: user,
      status: 200,
      headers: {
        authorization: 'Bearer '+token
      },
    }

    axios.post.mockImplementationOnce(() => Promise.resolve(mockedResponse))
  })

  it('sets the submitting flag', async () => {
    await handleSubmit(values, setSubmitting, authDispatch, setLocation)

    expect(setSubmitting).toHaveBeenCalledWith(true);
  })

  it('signs in the user', async () => {
    await handleSubmit(values, setSubmitting, authDispatch, setLocation)

    expect(authDispatch).toHaveBeenCalledWith({
      type: 'SIGNIN',
      payload: {
        token: token,
        user: user,
      }
    })
  })

  it('redirecs the user to configuration', async () => {
    await handleSubmit(values, setSubmitting, authDispatch, setLocation)

    expect(setLocation).toHaveBeenCalledWith('/configuration')
  })
})

