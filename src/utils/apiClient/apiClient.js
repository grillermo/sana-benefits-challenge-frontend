import axios from 'axios'

import { API_URL } from '../../constants'

function handleError(error) {
  let errorMessage

  if (error.response && error.response.data && error.response.data.message) {
    errorMessage = error.response.data.message
  } else {
    errorMessage = error
  }
  alert('Sorry there was an error: '+errorMessage);

  return Promise.reject(errorMessage)
}

export function signUp(data) {
  const url = `${API_URL}signup`
  const signUpData = {
    user: {
      password_confirmation: data.password,
      ...data
    }
  }

  return axios.post(url, signUpData)
    .then((response) => {
      const token = response.headers.authorization.split(' ')[1]

      return {
        token: token,
        user: response.data
      }
    })
    .catch(handleError)
}

export function signIn(data) {
  const url = `${API_URL}signin`
  const signUpData = {
    user: {
      ...data
    }
  }

  return axios.post(url, signUpData)
    .then((response) => {
      const token = response.headers.authorization.split(' ')[1]

      return {
        token: token,
        user: response.data
      }
    })
    .catch(handleError)
}

function signedInClientConfig() { 
  const jwt = localStorage.getItem('token')

  return ({
    baseURL: API_URL,
    timeout: 1000,
    headers: {
      'Authorization': 'Bearer '+jwt 
    }
  })
}

export function getAQIWarning() {
  return axios.get('aqi_warning', signedInClientConfig())
              .then((response) => (response.data))
              .catch(handleError)
}
