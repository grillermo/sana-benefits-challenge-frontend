import React from "react";
import { mount } from 'enzyme';
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import RegistrationFormContainer from './RegistrationFormContainer'
import AuthContext from '../../contextProviders/authContext'

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
    beforeEach(() => {
      jest.spyOn(window, 'alert').mockImplementation(() => {})
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
    });
  })
})

