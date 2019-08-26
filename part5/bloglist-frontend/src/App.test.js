import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/__mocks__/blogs')
import { prettyDOM } from '@testing-library/dom'
import App from './App'

describe('<App />', () => {
  test('shows only log in button if user is not logged in', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('log in'))
    expect(component.container).toHaveTextContent(
        'You are loged in as'
      )
  })
})
