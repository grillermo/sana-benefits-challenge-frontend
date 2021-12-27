import { mount } from 'enzyme';

import { reducer } from './AuthReducer'

describe('AuthReducer', () => {
  const token = 'eyJhbGciOiJIUzI1...'
  const user = {
    id: 1,
    email: 'email@domain.com'
  }

  describe('SIGNIN action', () => {
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

      expect(localStorage.getItem('user')).toEqual(JSON.stringify(user))
      expect(localStorage.getItem('token')).toEqual(token)
    })
  })

  describe('SIGNOUT action', () => {
    const action = {
      type: 'SIGNOUT',
    };

    it('clears the local storage', async () => {
      const state = reducer({},action)
      
      expect(localStorage.getItem('user')).toEqual(undefined)
      expect(localStorage.getItem('token')).toEqual(undefined)
    })
  })
})

