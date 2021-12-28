import { mount, shallow } from 'enzyme'
import { act, render, screen } from '@testing-library/react'

import googleStub from './Geosuggest/GoogleSutb'
import axios from 'axios'

import AQIWarningFormContainer, {
  handleSubmit,
  handleSuggestionChange,
  handleThresholdChange
} from './AQIWarningFormContainer'
import AuthContext from '../../contextProviders/authContext'

import { API_URL } from '../../constants'

jest.mock('axios')

function mockPOSTAxiosCall(saveAQIWarningMock) {
  return axios.post.mockImplementationOnce(() => Promise.resolve(saveAQIWarningMock))
}

function mockGETAxiosCalls(getAQIWarningMock, getAQIMock, saveAQIWarningMock) {
  const defaultGetAQIWarning = {
    data: {
      latitude: 0,
      longitude: 0,
      location: '',
      threshold: 0
    }
  }
  const defaultgetAQIMock = {
    data: {
      data: {
        aqi: 0
      }
    }
  }
  const defaultSaveAQIWarningMock = {
    data: {
      data: {
        aqi: 0
      }
    }
  }

  return axios.get.mockImplementation((url) => {
    if(url === 'aqi_warning') {
      // Mock getAQIWarning
      return Promise.resolve(getAQIWarningMock || defaultGetAQIWarning)
    } else if (url.startsWith('https://api.waqi.info/feed/geo')) {
      // Mock getAQI
      return Promise.resolve(getAQIMock || defaultgetAQIMock)
    }
  })
}


describe('AQIWarningFormContainer', () => {
  let getAQIWarningMock, getAQIMock
  let isAuthenticated = true

  async function renderAQIWarningFormContainer() {
    return render(
      <AuthContext.Provider
        value={{state: { isAuthenticated: isAuthenticated }}}
      >
        <AQIWarningFormContainer />
      </AuthContext.Provider>
    )
  }

  beforeEach(() => {
    window.google = googleStub()
  })

  describe('an unauthenticated user', () => {
    isAuthenticated = false

    beforeEach(() => {
      mockGETAxiosCalls()
    })

    it('redirecs to the sign_in path', async () => {
      await act(() => renderAQIWarningFormContainer() )

      expect(location.pathname).toBe('/sign_in')
    })
  })

  describe('a previously created aqiWarning exists', () => {
    beforeEach(() => {
      getAQIWarningMock = {
        data: {
          id: 1,
          latitude: '19.002529441654687',
          longitude: '-98.26751911537335',
          location: 'Texas',
          threshold: 70
        }
      }

      mockGETAxiosCalls(getAQIWarningMock)
    })

    it('sets the aqiWarning values on the form', async () => {
      await act(() => renderAQIWarningFormContainer() )

      expect(screen.getByLabelText('Your location:').value).toBe(getAQIWarningMock.data.location)
      expect(screen.getByLabelText('Your warning threshold:').value).toBe(
        getAQIWarningMock.data.threshold.toString()
      )
    })

    it('matches the snapshot', async () => {
      let page
      await act(async () => {
        page = await renderAQIWarningFormContainer()
      })

      expect(page).toMatchSnapshot();
    })
  })

  describe('the user does not have an aqiWarning', () => {
    beforeEach(() => {
      getAQIWarningMock = {
        data: { }
      }

      mockGETAxiosCalls(getAQIWarningMock)
    })

    it('sets default values on the form', () => {
    })

    it('matches the snapshot', async () => {
      let page
      await act(async () => {
        page = await renderAQIWarningFormContainer()
      })

      expect(page).toMatchSnapshot();
    })
  })

  describe('handleSubmit', () => {
    let setSubmitting
    const jwt = 'eyJhbGciOiJIUzI1NiJ9'
    let AQIWarningMock 

    beforeEach(() => {
      AQIWarningMock = {
        latitude: '19.002529441654687',
        longitude: '-98.26751911537335',
        location: 'Texas',
        threshold: 70
      }

      mockPOSTAxiosCall(AQIWarningMock)

      // The token is needed for signed in calls
      window.localStorage.setItem('token', jwt)

      setSubmitting = jest.fn();
    })

    it('calls saveAQIWarning', async () => {
      const response = await handleSubmit(setSubmitting, AQIWarningMock)

      expect(axios.post).toHaveBeenCalledWith(
        'aqi_warning',
        {
          aqi_warning: AQIWarningMock
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

    it('sets the submitting flag', async () => {
      const response = await handleSubmit(setSubmitting, AQIWarningMock)

      expect(setSubmitting).toHaveBeenCalledWith(true)
    })
  })

  describe('handleSuggestionChange', () => {
    it ('updates the aqiWarning location, latitude and longitude', () => {
      const suggestion = {
        label: 'Texas',
        location: {
          lat: '19.002529441654687',
          lng: '-98.26751911537335',
        }
      }
      const setAqiWarning = jest.fn()
      const aqiWarning = {
        threshold: 60,
      }
      
      handleSuggestionChange(suggestion, setAqiWarning, aqiWarning)

      expect(setAqiWarning).toHaveBeenCalledWith({
        ...aqiWarning,
        location: suggestion.label,
        latitude: suggestion.location.lat,
        longitude: suggestion.location.lng,
      })
    })
  })

  describe('handleThresholdChange', () => {
    let event, threshold
    const setAqiWarning = jest.fn()
    const aqiWarning = {}

    describe('with a numeric threshold value', () => {
      beforeEach(() => {
        threshold = 10
        event = { target: { value: threshold.toString() } }
      })

      it('sets the threshold on the aqiWarning', async () => {
        handleThresholdChange(event, setAqiWarning, aqiWarning)

        expect(setAqiWarning).toHaveBeenCalledWith({
          ...aqiWarning,
          threshold: threshold,
        })
      })
    })

    describe('with an empty threshold value', () => {
      beforeEach(() => {
        threshold = ''
        event = { target: { value: threshold.toString() } }
      })

      it('sets the threshold as 0 on the aqiWarning', async () => {
        handleThresholdChange(event, setAqiWarning, aqiWarning)

        expect(setAqiWarning).toHaveBeenCalledWith({
          ...aqiWarning,
          threshold: 0,
        })
      })
    })
  })
})
