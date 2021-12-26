import emailValidation from './emailValidation'

describe('emailValidation', () => {
  it('returns a required error if the value is missing', () => {
    const values = {
      email: null
    }

    const validator = emailValidation(values)

    expect(validator.email).toEqual('Required')
  })

  it('returns invalid email if the values do not contain an email', () => {
    const values = {
      email: 'myemail'
    }

    const validator = emailValidation(values)

    expect(validator.email).toEqual('Invalid email address')
  })
})
