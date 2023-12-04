import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@testing-library/react';
import DepartmentPage from './DepartmentPage';

//This works if you get rid of navigation
// Department page test 
describe('DepartmentPage', () => {
    it('renders content for Assessing selected', () => {
        render(<DepartmentPage />);

        fireEvent.click(screen.getByText('Assessing', { selector: 'a' }));

        // Access the selected department from state
        const selectedDepartment = screen.getByText('Assessing', { selector: 'a' }).textContent;

        // Assert that the selected department is updated
        expect(selectedDepartment).toBe('Assessing');

        // Assert that the content for Assessing is rendered within a specific container
        expect(screen.getByText('Assessing', { selector: 'h2' })).toBeInTheDocument();
        expect(screen.getByText('MARCH BOARD OF REVIEW', { selector: 'h3' })).toBeInTheDocument();
    });
}); 