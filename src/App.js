import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'react'
const DEFAULT_PAGE = 0
const DEFAULT_HPP = '100'

const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='
const PARAM_PAGE = 'page='
const PARAM_HPP = 'hitsPerPage='

// var url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}&${PARAM_PAGE}`

 /*
// when a searchTerm is set, match inbound searchTerm pattern with item title
const isSearched = searchTerm => item => 
  // condition that returns true or false
  !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
*/

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
    };

    this.setSearchTopstories = this.setSearchTopstories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
    this.onDismiss = this.onDismiss.bind(this);
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state
    this.setState({ searchKey: searchTerm })
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE)
    event.preventDefault()
  }

  setSearchTopstories(result) {
    // pluck hits and page from the result
    const { hits, page } = result
    const { searchKey, results } = this.state

    // check if there are already old hits
    // page = 0 means new search req from componentDidMount() or onSearchSubmit()
    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

    // merge old and new hits from recent API call
    const updatedHits = [
      ...oldHits,
      ...hits
    ]

    // set updatedHits and page in component state
    // using computed prop names, [searchKey] will be allocated
    // dynamically at runtime.
    this.setState({
       results: {
          ...results,
          [searchKey]: { hits: updatedHits, page }
       }  
    })
  }

  fetchSearchTopStories(searchTerm, page) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result))
  }

  componentDidMount() {
    const { searchTerm } = this.state
    this.setState({ searchKey: searchTerm })
    this.fetchSearchTopStories(searchTerm, DEFAULT_PAGE)
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: { ...this.state.result, hits: updatedHits }
    });
  }

  render() {
    const { searchTerm, results, searchKey } = this.state;
    
    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
            >
            Search
          </Search>
        </div>
        <Table 
          list={list}
          onDismiss={this.onDismiss}
        />
        <div className="interactions">
          <Button onClick={() => this.fetchSearchTopStories(searchKey, page + 1)}>
            More
          </Button>
        </div>
      </div>
    );
  }
}

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

// styles for Table
const largeColumn = { width: '40%' }
const midColumn = { width: '30%' }
const smallColumn = { width: '10%' }

const Table = ({ list, onDismiss }) =>
  <div className="table">
    {list.map(item =>
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

const Button = ({ onClick, className = '', children }) =>
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>

export default App;
