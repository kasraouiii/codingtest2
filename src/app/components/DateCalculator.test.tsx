import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios'; // Mock axios
import DateCalculator from './DateCalculator'; // Adjust the import path

// Mock axios.get
jest.mock('axios');

test('renders DateCalculator component', async () => {
  // Mock axios response
  const mockData = {
    data: { startDate: '2023-08-10T00:00:00Z' },
  };

  // Use jest.spyOn to mock axios.get
  const axiosGetSpy = jest.spyOn(axios, 'get');
  axiosGetSpy.mockResolvedValue(mockData);

  render(<DateCalculator />);

  // Assert the presence of Date de début label
  const startDateLabel = screen.getByText(/Date de début/i);
  expect(startDateLabel).toBeInTheDocument();

  // Wait for the API call to finish and verify the pre-filled input
  const startDateInput = await screen.findByLabelText(/Date de début/i);
  expect(startDateInput).toHaveValue('2023-08-10');

  // ... Add more tests as needed
});

test('calculates days difference correctly', async () => {
  // Mock axios response
  const mockData = {
    data: { startDate: '2023-08-10T00:00:00Z' },
  };

  // Use jest.spyOn to mock axios.get
  const axiosGetSpy = jest.spyOn(axios, 'get');
  axiosGetSpy.mockResolvedValue(mockData);

  render(<DateCalculator />);

  // Find input elements
  const startDateInput = await screen.findByLabelText(/Date de début/i);
  const endDateInput = await screen.findByLabelText(/Date de fin/i);
  const calculateButton = screen.getByText(/Calculer la différence/i);

  // Simulate user input
  fireEvent.change(startDateInput, { target: { value: '2023-08-10' } });
  fireEvent.change(endDateInput, { target: { value: '2023-08-12' } });

  // Click the Calculate button
  fireEvent.click(calculateButton);

  // Check if the days difference is correctly displayed
  const daysDifferenceText = await screen.findByText(/Nombre de jours entre les dates/i);
  expect(daysDifferenceText).toHaveTextContent('Nombre de jours entre les dates : 2');
});
