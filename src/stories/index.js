import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Table from '../Components/Table'

const stories = storiesOf('Table', module)

stories.add('with 2 rows of data', () => (
  <Table
    list={[
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y'},
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z'},
    ]}
  />
))

stories.add('with a single row', () => {
  const items = [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y'}
    ]

  return (
    <Table
      list={items}
    />
  )
})
