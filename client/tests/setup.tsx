import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { FC, ReactElement, ComponentType } from 'react'

// TODO: Add application providers
const customRender = (ui: ReactElement, options: RenderOptions = {}) => {
  const Wrapper: FC = ({ children }) => {
    return <>{children}</>
  }

  return rtlRender(ui, { wrapper: Wrapper as ComponentType, ...options })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
