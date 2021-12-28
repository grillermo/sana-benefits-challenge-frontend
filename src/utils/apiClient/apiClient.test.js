import axios from 'axios';

import { signUp, signIn, getAQIWarning, saveAQIWarning, getAQI } from './apiClient'
import { API_URL, AQI_TOKEN } from '../../constants'

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

      it('does a POST request', async () => {
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

      it('does a POST request', async () => {
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
        window.localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiJ9')

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

      afterEach(() => {
        window.localStorage.clear()
      })

      it('should return an aqiWarning', async () => {
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

  describe('saveAQIWarning', () => {
    const jwt = 'eyJhbGciOiJIUzI1NiJ9'

    // The token is needed for signed in calls
    beforeEach(() => {
      window.localStorage.setItem('token', jwt)
    })

    // The token is needed for signed in calls
    afterEach(() => {
      window.localStorage.clear()
    })

    describe('when API call is successful', () => {
      let aqiWarning = {
        location: 'Texas',
        latitude: '19.002529441654687',
        longitude: '-98.26751911537335',
        threshold: 10,
      }

      beforeEach(() => {
        // We are not using the response so it can be empty
        const mockedResponse = { }

        axios.post.mockImplementationOnce(() => Promise.resolve(mockedResponse))
      })

      it('does a POST request', async () => {
        const result = await saveAQIWarning(aqiWarning)

        expect(axios.post).toHaveBeenCalledTimes(1)
      })

      it('calls the api url with the data wrapped in a aqi_warning key', async () => {
        const result = await saveAQIWarning(aqiWarning)

        expect(axios.post).toHaveBeenCalledWith(
          'aqi_warning',
          {
            aqi_warning: aqiWarning
          },
          {
            baseURL: API_URL,
            timeout: 1000,
            headers: {
              'Authorization': 'Bearer '+jwt
            }
          }
        )
      })
    })

    describe('an error was produced', () => {
      let errorMessage, error

      beforeEach(() => {
        errorMessage =  "Threshold must be greater than 0"
        error = new Error()
        error.response = { data: { message: errorMessage } }

        axios.post.mockImplementationOnce(() => Promise.reject(error))
      })

      it('display the error to the user', async () => {
        jest.spyOn(window, 'alert').mockImplementation(() => {})

        await saveAQIWarning({}).catch(function(error) { })

        expect(window.alert).toBeCalledWith('Sorry there was an error: '+errorMessage)
      })

      it('returns a rejected promise', async () => {
        await saveAQIWarning({}).catch(function(error) {
          expect(error).toEqual(errorMessage)
        })
      })
    })
  })

  describe('getAQI', () => {
    const latitude  = '19.002529441654687'
    const longitude = '-98.26751911537335'

    describe('when API call is successful', () => {
      beforeEach(() => {
        const mockedResponse = {
          data: {
            data: {
              aqi: 78
            }
          }
        }

        axios.get.mockImplementationOnce(() => Promise.resolve(mockedResponse))
      })

      it('does a GET request', async () => {
        const result = await getAQI(latitude, longitude)

        expect(axios.get).toHaveBeenCalledTimes(1)
      })

      it('calls the api url with the data wrapped in a aqi_warning key', async () => {
        const result = await getAQI(latitude, longitude)

        expect(axios.get).toHaveBeenCalledWith(
          `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${AQI_TOKEN}`,
        )
      })
    })

    describe('an error was produced', () => {
      let errorMessage, error

      beforeEach(() => {
        errorMessage =  "Invalid token"
        error = new Error()
        error.response = { data: { message: errorMessage } }

        axios.post.mockImplementationOnce(() => Promise.reject(error))
      })

      it('display the error to the user', async () => {
        jest.spyOn(window, 'alert').mockImplementation(() => {})

        await saveAQIWarning({}).catch(function(error) { })

        expect(window.alert).toBeCalledWith('Sorry there was an error: '+errorMessage)
      })

      it('returns a rejected promise', async () => {
        await saveAQIWarning({}).catch(function(error) {
          expect(error).toEqual(errorMessage)
        })
      })
    })
  })
})
