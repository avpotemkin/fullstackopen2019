import React from 'react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import Togglable from './Togglable'

afterEach(cleanup)

test('renders content', () => {
  const user = {
    id: 123456,
    username: 'testuser'
  }

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'me',
    user: {
      id: 123456,
      username: 'testuser'
    }
  }

  const component = render(<Blog blog={blog} user={user} />)

  const div = component.container.querySelector('.blog')

  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})

test('clicking the button twice calls event handler two times', async () => {
  const user = {
    id: 123456,
    username: 'testuser'
  }

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'me',
    user: {
      id: 123456,
      username: 'testuser'
    }
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <Blog blog={blog} user={user} handleLikeButton={mockHandler} />
  )

  const likeButton = getByText('like')

  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockHandler.mock.calls.length).toBe(2)
})

