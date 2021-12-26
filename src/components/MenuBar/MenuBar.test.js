import React from "react";
import { mount } from 'enzyme';
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import MenuBar from './MenuBar'

import AuthContext from '../../contextProviders/authContext'

describe('MenuBar', () => {
  describe('signed in user', () => {
    it('matches the snapshot', async () => {
      const menuBar = mount(
        <AuthContext.Provider
          value={{state: { isAuthenticated: true }}}
        >
          <MenuBar />
        </AuthContext.Provider>
      )

      expect(menuBar).toMatchSnapshot();
    })
  })

  describe('signed out user', () => {
    it('matches the snapshot', async () => {
      const menuBar = mount(
        <AuthContext.Provider
          value={{state: { isAuthenticated: false }}}
        >
          <MenuBar />
        </AuthContext.Provider>
      )

      expect(menuBar).toMatchSnapshot();
    })
  })
})

