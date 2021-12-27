import axios from 'axios';

import { signUp, signIn, getAQIWarning } from './apiClient'
import { API_URL } from '../../constants'

jest.mock("axios")

describe('apiClient', () => {
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

  describe('signIn', () => {
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
        const result = await signIn({email: user.email, password: password})

        expect(axios.post).toHaveBeenCalledTimes(1)
      })

      it('calls the signup api url with the passed data', async () => {
        const result = await signIn({email: user.email, password: password})

        expect(axios.post).toHaveBeenCalledWith(
          `${API_URL}signin`,
          {
            user: {
              email: user.email,
              password: password,
            }
          }
        )
      })

      it('should return user', async () => {
        const result = await signIn({email: user.email, password: password})

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

        await signIn({email: '', password: ''}).catch(function(error) { })

        expect(window.alert).toBeCalledWith('Sorry there was an error: '+errorMessage)
      })

      it('returns a rejected promise', async () => {
        await signIn({email: '', password: ''}).catch(function(error) {
          expect(error).toEqual(errorMessage)
        })
      })
    })
  })

  describe('getAQIWarning', () => {
    describe('when API call is successful', () => {
      let mockedResponse

      beforeEach(() => {
        window.localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImpAai5jb20iLCJzdWIiOiIxOCIsInNjcCI6InVzZXIiLCJhdWQiOm51bGwsImlhdCI6MTY0MDU3ODE3MywiZXhwIjoiMTY0MTQ0MjE3MyIsImp0aSI6IjE2NTZhYzY0LWNhNmQtNDZlNi1hMWJjLTIxNWU2ZmNkY2YwMyJ9.QjdhCpmHww9j_Tby3ibFYqORYk9icRq9JiTnQyvp4eE')

        mockedResponse = {
          data: {
            id:        1,
            latitude:  "19.0004738",
            longitude: "-98.2180794",
            location:  "Puebla",
            threshold: 10
          }
        }

        axios.get.mockImplementationOnce(() => Promise.resolve(mockedResponse))
      })

      it('should return an aqi_warning', async () => {
        const result = await getAQIWarning()

        expect(result).toEqual(mockedResponse.data)
      })
    })

    describe('an error was produced', () => {
      let errorMessage, error

      beforeEach(() => {
        errorMessage =  "Unauthorized 401"
        error = new Error()
        error.response = { data: { message: errorMessage } }

        axios.post.mockImplementationOnce(() => Promise.reject(error))
      })

      it('display the error to the user', async () => {
        jest.spyOn(window, 'alert').mockImplementation(() => {})

        await signIn({email: '', password: ''}).catch(function(error) { })

        expect(window.alert).toBeCalledWith('Sorry there was an error: '+errorMessage)
      })

      it('returns a rejected promise', async () => {
        await signIn({email: '', password: ''}).catch(function(error) {
          expect(error).toEqual(errorMessage)
        })
      })
    })
  })
})
