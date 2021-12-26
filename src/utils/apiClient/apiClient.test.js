import axios from 'axios';

import { signUp } from './apiClient'
import { API_URL } from '../../constants'

jest.mock("axios")

describe('signUp', () => {
  describe('when API call is successful', () => {
    let user, password, token

    beforeEach(() => {
      // Initialize mocking data
      user = { id: 1, email: "email@domain.com" }
      password = '12345678'
      token = 'eyJhbGciOiJIUzI1...'

      const mockedResponse = {
        data: user,
        status: 200,
        headers: {
          authorization: 'Bearer '+token
        },
      }

      axios.post.mockImplementationOnce(() => Promise.resolve(mockedResponse))
    })

    it('does a post request', async () => {
      const result = await signUp({email: user.email, password: password})

      expect(axios.post).toHaveBeenCalledTimes(1)
    })

    it('calls the signup api url with confirmation password', async () => {
      const result = await signUp({email: user.email, password: password})

      expect(axios.post).toHaveBeenCalledWith(
        `${API_URL}signup`,
        {
          user: {
            email: user.email,
            password: password,
            password_confirmation: password,
          }
        }
      )
    })

    it('should return user', async () => {
      const result = await signUp({email: user.email, password: password})

      expect(result).toEqual({ user: user, token: token })
    })
  })

  describe('an error was produced', () => {
    let errorMessage, error

    beforeEach(() => {
      errorMessage =  "Email can't be blank,Password can't be blank"
      error = new Error()
      error.response = { data: { message: errorMessage } }

      axios.post.mockImplementationOnce(() => Promise.reject(error))
    })

    it('display the error to the user', async () => {
      jest.spyOn(window, 'alert').mockImplementation(() => {})

      await signUp({email: '', password: ''}).catch(function(error) { })

      expect(window.alert).toBeCalledWith('Sorry there was an error: '+errorMessage)
    })

    it('returns a rejected promise', async () => {
      await signUp({email: '', password: ''}).catch(function(error) {
        expect(error).toEqual(errorMessage)
      })
    })
  })
})
