import * as React from 'react'
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ContactUs from './ContactUs';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter, Routes } from 'react-router-dom';
import { alert } from 'jest';
import _fetch from 'isomorphic-fetch'; //node does not have fetch so need this

//again its authprovider giving an issue
test('submits the form successfully', async () => {
    // Mock the fetch function to return a successful response
    global.fetch = jest.fn().mockResolvedValue({
        status: 201,
        json: jest.fn().mockResolvedValue({}),
    });

    // Mock the alert function
    jest.spyOn(window, 'alert').mockImplementation(() => { });

    render( //need this to render or it won't work 
        <BrowserRouter>
            <AuthProvider>
                <ContactUs />
            </AuthProvider>
        </BrowserRouter>
    );

    // Fill out the form and submit it
    fireEvent.change(screen.getByLabelText('Department:'), { target: { value: 'Some Department' } });
    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john@example.com' } });
    fireEvent.change(screen.getByLabelText('Message:'), { target: { value: 'This is a test message' } });

    fireEvent.click(screen.getByText('Submit'));

    // Assert that the fetch function was called
    await waitFor(() => {
        // Assert that the fetch function was called
        expect(global.fetch).toHaveBeenCalled();

        // Assert that the alert function was called with the correct message
        expect(window.alert).toHaveBeenCalledWith('Contact us form sent!');
    });
});

test('handles form submission error', async () => {
    // Mock the fetch function to return an error response
    global.fetch = jest.fn().mockResolvedValue({
        status: 500,
        json: jest.fn().mockResolvedValue({}),
    });

    // Mock the alert function
    jest.spyOn(window, 'alert').mockImplementation(() => { });

    render(
        <BrowserRouter>
            <AuthProvider>
                <ContactUs />
            </AuthProvider>
        </BrowserRouter>
    );

    // Fill out the form and submit it
    fireEvent.change(screen.getByLabelText('Department:'), { target: { value: 'Some Department' } });
    fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Email:'), { target: { value: 'john@example.com' } });

    fireEvent.click(screen.getByText('Submit'));

    // Assert that the fetch function was called
    await waitFor(() => {
        // Assert that the fetch function was called
        expect(global.fetch).toHaveBeenCalled();

        // Assert that the alert function was called with the correct message
        expect(window.alert).toHaveBeenCalledWith('Something went wrong!');
    });
});