import React from 'react'
import ReactDOM from 'react-dom'
import Card from './Card';
import {render} from '@testing-library/react';
const mockStories = [
  {
    title: 'Headline story',
    score: 4,
    url: 'http://reddit.com/r/news'
  },
  {
    title: 'Second Headline story',
    score: 10,
    url: 'http://reddit.com/r/js'
  }
];

it("Renders without crashing", () => {
  console.log('Card test');
  const div = document.createElement('div');
  ReactDOM.render(<Card></Card>, div);
})

it('Renders card correctly', () => {
  const {getByTestId} = render(<Card feed={mockStories[0]}></Card>)
  expect( getByTestId('card')).toHaveTextContent("click me please");
})