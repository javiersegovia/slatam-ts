import React from 'react'
import { screen, render } from '@tests/setup'
import Home from '@pages/index'

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Home />)
    expect(asFragment()).toMatchInlineSnapshot(`
      <DocumentFragment>
        <h1
          class="pages__Title-sc-18u934-0 iKuUDQ text-center text-4xl"
        >
          Slatam Application
        </h1>
        <button
          class="pages__Button-sc-18u934-1 ehqjVe bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Product page
        </button>
      </DocumentFragment>
    `)
  })

  it('should have the correct title heading', async () => {
    render(<Home />)
    // fireEvent.click(screen.getByText('Test Button'))
    expect(await screen.findByText(/product page/i)).toBeInTheDocument()
  })
})
