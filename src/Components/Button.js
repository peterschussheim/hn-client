import React from 'react'
import Loading from './Loading'

export const Button = ({ onClick, className = '', children }) =>
  <button
    onClick={onClick}
    className={className}
    type="button"
  >
    {children}
  </button>

export const withLoading = Component => ({ isLoading, ...rest }) =>
  isLoading ? <Loading /> : <Component { ...rest } />

export const ButtonWithLoading = withLoading(Button);

