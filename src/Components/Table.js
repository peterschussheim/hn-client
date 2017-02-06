import React from 'react'
import { sortBy } from 'lodash';

import { Button } from './Button'

// styles for Table
const largeColumn = { width: '40%' }
const midColumn = { width: '30%' }
const smallColumn = { width: '10%' }

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  COMMENTS: list => sortBy(list, 'num_comments').reverse(),
  POINTS: list => sortBy(list, 'points').reverse(),
};

const Sort = ({ sortKey, onSort, children }) =>
  <Button
    onClick={() => onSort(sortKey)}
    className="button-inline"
  >
    {children}
  </Button>

const Table = ({ list, sortKey, onSort, onDismiss }) =>
  <div className="table">
    <div className="table-header">
      <span style={{ largeColumn }}>
        <Sort 
          sortKey={'TITLE'}
          onSort={onSort}
        >
        Title
        </Sort>
      </span>
      <span style={{ midColumn }}>
        <Sort 
          sortKey={'AUTHOR'}
          onSort={onSort}
        >
        Author
        </Sort>
      </span>
      <span style={{ smallColumn }}>
        <Sort 
          sortKey={'COMMENTS'}
          onSort={onSort}
        >
        Comments
        </Sort>
      </span>
      <span style={{ smallColumn }}>
        Archive
      </span>
    </div>
      { SORTS[sortKey](list).map(item =>
        <div key={item.objectID} className="table-row">
          <span style={largeColumn}>
            <a href={item.url}> {item.title} </a>
          </span>
          <span style={midColumn}>
            {item.author}
          </span>
          <span style={smallColumn}>
            {item.num_comments}
          </span>
          <span style={smallColumn}>
            {item.points}
          </span>
          <span>
            <Button
              onClick={() => onDismiss(item.objectID)}
              className="button-inline">
              Dismiss
            </Button>
          </span>
        </div>
      )}
  </div>

export default Table
