import { shallow } from 'enzyme';

import AirQualityWidget from './AirQualityWidget'

describe('AirQualityWidget ', () => {

  describe('with empty values as props', () => {
    test('renders successfully', () => {
      const airQualityWidget = shallow(<AirQualityWidget currentLevel={null} threshold={''} />)

      expect(airQualityWidget).toMatchSnapshot()
    })
  })

  describe('with current level less than threshold', () => {
    test('renders successfully', () => {
      const airQualityWidget = shallow(<AirQualityWidget currentLevel={70} threshold={80} />)

      expect(airQualityWidget).toMatchSnapshot()
    })
  })

  describe('with current level more than threshold', () => {
    test('renders successfully', () => {
      const airQualityWidget = shallow(<AirQualityWidget currentLevel={100} threshold={80} />)

      expect(airQualityWidget).toMatchSnapshot()
    })
  })
})

