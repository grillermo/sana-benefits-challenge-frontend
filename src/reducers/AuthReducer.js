import React from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGNIN':
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      localStorage.setItem("token", action.payload.token)
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token
      };
    case 'SIGNOUT':
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    default:
      return state
  }
}
export { reducer }

function AuthReducer() {
  const storedUser = localStorage.getItem('user')
  const user = storedUser ? JSON.parse(storedUser) : null
  const token = localStorage.getItem('token')

  const initialState = {
    isAuthenticated: !!user,
    user: user,
    token: token,
  };

  return React.useReducer(reducer, initialState)
}

export default AuthReducer
