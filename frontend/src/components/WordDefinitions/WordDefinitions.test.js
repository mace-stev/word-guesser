import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router, useParams, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';
import WordDefinitions from './WordDefinitions';

// Mocking React Router hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('WordDefinitions Component', () => {
  const mockNavigate = jest.fn();
  const mockAxios = new AxiosMockAdapter(axios);

  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    mockNavigate.mockReset();
    mockAxios.reset();
    require('react-router-dom').useNavigate.mockImplementation(() => mockNavigate(-1));
    require('react-router-dom').useParams.mockReturnValue({ word: 'example' });
  });


  it('renders and fetches word definition', async () => {
    mockAxios.onPost("/words/definition", { word: "example" }).reply(201, {
      
        meanings: {
          noun: 'A thing characteristic of its kind or illustrating a general rule.',
          verb: 'Give an example of; illustrate by giving an example.',
          adjective: "example text",
          adverb: "example text",
          examples: ['example1', 'example2']
        },
        definitions: [{
          antonyms: ['counterexample'],
          definition: 'Primary meaning',
          example: 'For example, a fox in the wild...',
          synonyms: ['illustration']
        }]
      
    });

    const { getByText } = render(
    <Router>
    <WordDefinitions />
    </Router>);
    await waitFor(() => {
      expect(getByText(/Primary meaning/i)).toBeInTheDocument();
      expect(getByText('For example, a fox in the wild...')).toBeInTheDocument();
      expect(getByText(/illustration/i)).toBeInTheDocument();
      expect(screen.queryByText(/Hello World/i)).not.toBeInTheDocument();
    
  
    });
  });

it('handles navigation click', () => {
  render(
   
    <Router>
      <WordDefinitions />
      </Router>
    
  );

  userEvent.click(screen.getByText(/Go Back to Home/i));
  expect(mockNavigate).toHaveBeenCalledWith(-1);
});

it('handles axios error', async () => {
  mockAxios.onPost("/words/definition", { word: "example" }).networkError();

  render(
  
    <Router>
      <WordDefinitions />
    </Router>
    
  );

  await waitFor(() => {
    expect(screen.getByText(/If nothing is rendered, you can continue your search here./i)).toBeInTheDocument();
  });
});
});