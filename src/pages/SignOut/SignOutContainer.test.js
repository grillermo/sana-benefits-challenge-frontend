import React from 'react'
import { render } from '@testing-library/react'

import SignOutContainer from './SignOutContainer'
import AuthContext from '../../contextProviders/authContext'

describe('SignOutContainer', () => {
  it('results in change of current location', () => {
    const { unmount } = render(
      <AuthContext.Provider
        value={{
          dispatch: jest.fn(),
        }}
      >
        <SignOutContainer/>
      </AuthContext.Provider>
    );

    expect(location.pathname).toBe('/');
    unmount();
  });

  it('calls dispatch with type SIGNOUT', () => {
    const dispatch = jest.fn()
    const { unmount } = render(
      <AuthContext.Provider
        value={{
          dispatch: dispatch,
        }}
      >
        <SignOutContainer/>
      </AuthContext.Provider>
    );

    expect(dispatch).toHaveBeenCalledWith({type: 'SIGNOUT'})

    unmount();
  })
})
