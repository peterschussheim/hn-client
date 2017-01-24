import React, { Component } from 'react';
import './App.css';

const DEFAULT_QUERY = 'react'
const PATH_BASE = 'https://hn.algolia.com/api/v1'
const PATH_SEARCH = '/search'
const PARAM_SEARCH = 'query='
var url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`

console.log(url);

// when a searchTerm is set, match inbound searchTerm pattern with item title
const isSearched = searchTerm => item => // condition that returns true or false
  !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY,
    };

    this.setSearchTopstories = this.setSearchTopstories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

  setSearchTopstories(result) {
    this.setState({ result })
  }

  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result))
  }

  componentDidMount() {
    const { searchTerm } = this.state
    this.fetchSearchTopStories(searchTerm)
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
    const { searchTerm, result } = this.state;

    if (!result) { return null }

    return (
      <div className="page">
        <div className="interactions">
          <Search value={searchTerm} onChange={this.onSearchChange}>
            Search
          </Search>
        </div>
        <Table list={result.hits} pattern={searchTerm} onDismiss={this.onDismiss} />
      </div>
    );
  }
}

const Search = ({ value, onChange, children }) =>
  <form action="">
    {children} <input type="text" value={value} onChange={onChange} />
  </form>

// styles for Table
const largeColumn = { width: '40%' }
const midColumn = { width: '30%' }
const smallColumn = { width: '10%' }

const Table = ({ list, pattern, onDismiss }) =>
  <div className="table">
    {list.filter(isSearched(pattern)).map(item => (
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
    ))}
  </div>

const Button = ({ onClick, className = '', children }) =>
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>

export default App;
