import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import '@testing-library/jest-dom';
import LetterSelector from '../LetterSelector/LetterSelector';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
    useNavigate: () => jest.fn(),
    NavLink: ({ children }) => <div>{children}</div> // Simplify NavLink for testing
}));

describe('Home Component', () => {
    const mockAxios = new AxiosMockAdapter(axios);

    beforeEach(() => {
        mockAxios.reset();
    });

    it('renders correctly and fetches initial word', async () => {
        // Mocking Axios
        mockAxios.onGet('https://random-word-api.herokuapp.com/word').reply(201, ['magnolia']);

        render(
            <Router>
                <Home />
            </Router>
        );

        // Assert that axios was called
        await waitFor(() => expect(mockAxios.history.get.length).toBe(1));
        expect(mockAxios.history.get[0].url).toBe('https://random-word-api.herokuapp.com/word');

        // Wait for the component to update with fetched data
        await waitFor(() => {
            expect(screen.getByText(/You have/i)).toBeInTheDocument();
            expect(screen.getByText(/6 guesses/i)).toBeInTheDocument();
            expect(screen.getByText(/remaining./i)).toBeInTheDocument()

        });

        // Test to ensure the fetched word is being displayed in a NavLink or another component
        await waitFor(() => {
            expect(screen.getByText(/MAGNOLIA: View Definition/i)).toBeInTheDocument();
        });
    })
    it('behaves correctly when a user clicks the right letter', async () => {
        mockAxios.onGet('https://random-word-api.herokuapp.com/word').reply(201, ['magnolia']);
        render(
            <Router>
                <Home />
            </Router>
        );
        userEvent.click(screen.getByText('A'));
        await waitFor(() => {
            const button = screen.getByTestId('letter-A');
            expect(button).toHaveClass('clicked');
            expect(screen.getByText(/6 guesses/i)).toBeInTheDocument();
        })
    })
    it('behaves correctly when a user clicks the wrong letter', async () => {
        mockAxios.onGet('https://random-word-api.herokuapp.com/word').reply(201, ['magnolia']);
        render(
            <Router>
                <Home />
            </Router>
        );
        userEvent.click(screen.getByText('B'));
        await waitFor(() => {
            const button = screen.getByTestId('letter-B');
            expect(button).toHaveClass('clicked');
            expect(screen.getByText(/5 guesses/i)).toBeInTheDocument();
        })
    })

})



