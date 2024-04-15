import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router } from 'react-router-dom';

import WordDefinitions from './WordDefinitions';

// Mocking React Router hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
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
    require('react-router-dom').useNavigate.mockImplementation(() => mockNavigate);
    require('react-router-dom').useParams.mockReturnValue({ word: 'example' });
  });

  it('renders and fetches word definition', async () => {
    mockAxios.onPost("/words/definition", {word: "example"}).reply(200, {
      data: {
        meanings: {
          noun: 'A thing characteristic of its kind or illustrating a general rule.',
          verb: 'Give an example of; illustrate by giving an example.'
        },
        definitions: [{
          definition: 'Primary meaning',
          synonyms: ['illustration'],
          antonyms: ['counterexample'],
          example: 'For example, a fox in the wild...'
        }]
      }
    });

    render(
      <Router>
        <WordDefinitions />
      </Router>
    );

    await waitFor(() => {
      expect(screen.getByText(/noun meaning/i)).toBeInTheDocument();
      expect(screen.getByText(/Primary meaning/i)).toBeInTheDocument();
    });
  });

  it('handles navigation click', () => {
    render(
      <Router>
        <WordDefinitions />
      </Router>
    );

    userEvent.click(screen.getByText('Go Back to Home'));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it('handles axios error', async () => {
    mockAxios.onPost("/words/definition", {word: "example"}).networkError();

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