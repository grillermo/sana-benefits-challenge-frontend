import { isNumber } from 'lodash'

import './AirQualityWidget.css';

export default function AirQualityWidget(props) {
  const { currentLevel, threshold } = props

  const valuesPresent = isNumber(currentLevel) && isNumber(threshold)

  let className = 'disabled'

  if(valuesPresent) {
    if(currentLevel > threshold) {
      className = 'ok'
    } else if (currentLevel <= threshold) {
      className = 'danger'
    }
  }

  let levelFriendlyName

  switch(className) {
    case 'ok':
      levelFriendlyName = 'All good'
      break
    case 'danger':
      levelFriendlyName = 'Dangerous'
      break
    default:
      levelFriendlyName = 'loading...'
      break
  }

  return(
    <div className={ 'airQualityWidget '+className }>
      <h1>
        {valuesPresent ? currentLevel : 'loading...'}
      </h1>
      <strong>
        current level
      </strong>
      <p>
        {levelFriendlyName}
      </p>
    </div>
  )
}
