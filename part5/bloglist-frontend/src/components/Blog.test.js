import React from 'react'
import '@testing-library/jest-dom'
import render from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

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
  console.log(prettyDOM(div))

  //   expect(div).toHaveTextContent(
  //     'Component testing is done with react-testing-library'
  //   )
})
