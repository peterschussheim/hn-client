import React from 'react'
import { ButtonWithLoading } from './Button'

const Search = ({ value, onChange, children, onSubmit }) =>
  <form onSubmit={onSubmit}>
    <input
     type="text" 
     value={value} 
     onChange={onChange}
    />
    <ButtonWithLoading type="submit">
      {children}
    </ButtonWithLoading>
  </form>

export default Search
