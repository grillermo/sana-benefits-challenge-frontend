import { useEffect, useState, useContext } from 'react'
import { useLocation } from 'wouter'
import { isEmpty } from 'lodash'

import AuthContext from '../../contextProviders/authContext'

import AQIWarningForm from './AQIWarningForm'
import AirQualityWidget from '../AirQualityWidget'
import { getAQIWarning, getAQI, saveAQIWarning } from '../../utils/apiClient'

export function handleSubmit(setSubmitting, aqiWarning) {
  setSubmitting(true)

  return saveAQIWarning(aqiWarning).then(() => (setSubmitting(false)))
                                   .catch(() => (setSubmitting(false)))
}

export function handleSuggestionChange(suggestion, setAqiWarning, aqiWarning) {
  const _aqiWarning = {
    ...aqiWarning,
    location: suggestion.label,
    latitude: suggestion.location.lat,
    longitude: suggestion.location.lng,
  }

  setAqiWarning(_aqiWarning)
}

export function handleThresholdChange(event, setAqiWarning, aqiWarning) {
  let value

  if(isEmpty(event.target.value)) {
    value = 0
  } else {
    value =  parseInt(event.target.value)
  }

  const _aqiWarning = {
    ...aqiWarning,
    threshold: value
  }

  setAqiWarning(_aqiWarning)
}


export default function AQIWarningFormContainer() {
  const { state: authState }        = useContext(AuthContext);
  const [aqiWarning, setAqiWarning] = useState({ location: '', threshold: 0 })
  const [aqi, setAqi]               = useState(undefined)
  const [location, setLocation]     = useLocation();

  // Initial load with a possible saved aqiWarning
  useEffect(() => {
    getAQIWarning().then((data) => {
      // The user does not have saved aqiWarning
      if(!data || !data.id) {
        return
      }

      const _aqiWarning = {
        ...aqiWarning,
        location: data.location,
        latitude: data.latitude,
        longitude: data.longitude,
        threshold: data.threshold
      }

      setAqiWarning(_aqiWarning)
    })
  },[])
  
  // On latitude longitude updates
  useEffect(() => {
    getAQI(aqiWarning.latitude, aqiWarning.longitude).then((aqi) => (setAqi(aqi)))
  },[aqiWarning.latitude, aqiWarning.longitude])
  
  useEffect(() => {
    if(!authState.isAuthenticated) {
      return setLocation('/sign_in')
    }
  }, [authState]);

  return (
    <div className='AQIWarningContainer'>
      <AQIWarningForm
        handleSuggestionChange={(suggestion) => (
          handleSuggestionChange(suggestion, setAqiWarning, aqiWarning)
        )}
        handleThresholdChange={(event) => (
          handleThresholdChange(event, setAqiWarning, aqiWarning)
        )}
        aqiWarning={aqiWarning}
        handleSubmit={(values, { setSubmitting }) => (
          handleSubmit(setSubmitting, aqiWarning)
        )}
      />

      <AirQualityWidget 
        currentLevel={aqi}
        threshold={aqiWarning.threshold}
      />
    </div>
  )
}
