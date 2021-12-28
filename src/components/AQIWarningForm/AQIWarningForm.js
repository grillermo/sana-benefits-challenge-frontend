import { Formik } from 'formik';
import Geosuggest from 'react-geosuggest';

import './AQIWarning.css';
import './Geosuggest/Geosuggest.css';

export default function AQIWarningForm(props) {
  const {
      handleSubmit,
      handleSuggestionChange,
      aqiWarning,
      handleThresholdChange,
  } = props

  const initialValues = { threshold: aqiWarning.threshold }

  return(
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={handleSubmit}
      >
      {({
        handleSubmit,
        isSubmitting,
        values
      }) => (
        <form onSubmit={handleSubmit}>
          <label>
            Your location:
            <Geosuggest
              name='location'
              initialValue={aqiWarning.location || ''}
              onSuggestSelect={handleSuggestionChange}
              placeholder="Beverly hills"
            />
          </label>
          <label>
            Your warning threshold:
            <input
              name='threshold'
              value={values.threshold}
              type='number'
              onChange={handleThresholdChange}
              placeholder="100"
            />
          </label>
          <button type="submit" disabled={isSubmitting}>
            Save
          </button>
        </form>
      )}
    </Formik>
  )
}
