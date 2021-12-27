import React from "react";
import { mount } from 'enzyme';
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import axios from 'axios';

import RegistrationFormContainer, { handleSubmit } from './RegistrationFormContainer'
import AuthContext from '../../contextProviders/authContext'

jest.mock("axios")

describe('RegistrationFormContainer', () => {
  it('matches the snapshot', async () => {
    const registrationFormContainer = mount(
      <AuthContext.Provider
        value={{
          dispatch: jest.fn(),
        }}
      >
        <RegistrationFormContainer />
      </AuthContext.Provider>
    )

    expect(registrationFormContainer).toMatchSnapshot();
  });

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


    it('calls the signUp', async () => {
      const handleSubmit = jest.fn()

      render(
        <AuthContext.Provider
          value={{
            dispatch: handleSubmit(),
          }}
        >
          <RegistrationFormContainer />
        </AuthContext.Provider>
      )

      userEvent.type(screen.getByLabelText(/email:/i), 'john.dee@someemail.com')
      userEvent.type(screen.getByLabelText(/password:/i), '12345678')

      userEvent.click(screen.getByRole('button', {name: /submit/i}))

      await waitFor(() =>
        expect(handleSubmit).toHaveBeenCalled()
      )
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
})

