import React from 'react'
import { Button } from './Button'

const Search = ({ value, onChange, children, onSubmit }) =>
  <form onSubmit={onSubmit}>
    <input
     type="text" 
     value={value} 
     onChange={onChange}
    />
    <button type="submit">
      {children}
    </button>
  </form>

export default Search
