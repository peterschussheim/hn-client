import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import { shallow } from 'enzyme'
import App from '../Components/App';
import Search from '../Components/Search'
import Button from '../Components/Button'
import Table from '../Components/Table'

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });

  test('snapshots', () => {
    const component = renderer.create(<App />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Search', () => {
  it('renders', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Search>Search</Search>, div)
  })

  test('snapshots', () => {
    const component = renderer.create(
      <Search>Search</Search>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Button', () => {
  it('renders', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Button>Give me moar!!!!!</Button>, div)
  })

  test('snapshots', ()=> {
    const component = renderer.create(
      <Button>Give me moar!!!!!</Button>
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Table', () => {
  const props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y'},
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z'},
    ],
  }
  it('renders', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Table { ...props } />, div)
  })

  it('shows two items in the list', () => {
    const element = shallow(
      <Table { ...props }/>
    )

    expect(element.find('.table-row').length).toBe(2)
  })

  test('snapshots', () => {
    const component = renderer.create(
      <Table { ...props } />
    )
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
