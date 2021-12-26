import { mount } from 'enzyme';

import { reducer } from './AuthReducer'

describe('AuthReducer', () => {
  const token = 'eyJhbGciOiJIUzI1...'
  const user = {
    id: 1,
    email: 'email@domain.com'
  }

  describe('SIGNIN action', () => {
    beforeEach(() => {
      jest.spyOn(window.localStorage.__proto__, 'setItem')
      window.localStorage.__proto__.setItem = jest.fn()
    })

    const action = {
      type: 'SIGNIN',
      payload: {
        user: user,
        token: token,
      }
    };

    it('should return the user on the initial state', () => {
      const state = reducer({},action)

      expect(state).toEqual(
        {
          isAuthenticated: true,
          user: user,
          token: token
        }
      )
    })

    it('sets the user and token on the local storage', () => {
      const state = reducer({},action)

      expect(localStorage.setItem.mock.calls).toEqual([
        ['user', JSON.stringify(user)],
        ['token', token],
      ])
    })
  })

  describe('SIGNOUT action', () => {
    beforeEach(() => {
      jest.spyOn(window.localStorage.__proto__, 'clear')
      window.localStorage.__proto__.clear = jest.fn()
    })

    const action = {
      type: 'SIGNOUT',
    };

    it('clears the local storage', async () => {
      const state = reducer({},action)
      
      expect(localStorage.clear).toHaveBeenCalledTimes(1)
    })
  })
})

