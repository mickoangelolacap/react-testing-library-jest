import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { replaceCamelWithSpaces, red, blue } from './App'

test('button has correct initial color', () => {
  render(<App />)

  // find an element with a role of button and text of 'Change to blue'
  const colorButton = screen.getByRole('button', {name: `Change to ${blue}`})

  // expect the background color to be red
  expect(colorButton).toHaveStyle({ backgroundColor : red })

  // click button
  fireEvent.click(colorButton)

  // expect the background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: blue })

  // expect the button text to be 'Change to Red
  expect(colorButton.textContent).toBe(`Change to ${red}`)
});

test('initial conditions', () => {
  render(<App />)

  // check that the button starts out enabled
  const colorButton = screen.getByRole('button', { name: `Change to ${blue}`})
  expect(colorButton).toBeEnabled()

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole('checkbox')
  expect(checkbox).not.toBeChecked()
})

test('onchange conditions', () => {
  render(<App />)

  const checkbox = screen.getByRole('checkbox', { name: 'Disable button' })
  const colorButton = screen.getByRole('button')

  fireEvent.click(checkbox)
  expect(colorButton).toBeDisabled()
  expect(colorButton).toHaveStyle({backgroundColor: 'gray'})
  expect(checkbox).toBeChecked()

  fireEvent.click(checkbox)
  expect(colorButton).toBeEnabled()
  expect(colorButton).toHaveStyle({backgroundColor: red})
  expect(checkbox).not.toBeChecked()
})

describe('spaces before camel-case capital letters', () => {

  test('Works for no inner capital letters', () => {
    expect(replaceCamelWithSpaces('Red')).toBe('Red')
  })

  test('Works for one inner capital letter', () => {
    expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue')
  })

  test('Works for multiple inner capital letters',() => {
    expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red')
  })
})