import _tw from 'twin.macro'
// const responsiveMixin = css`
//   ${(props) => props.theme.breakpoints.down(props.isHeightAuto)} {
//     height: auto;
//   }
// `

// const FullScreen = styled.div`
//   width: 100%;
//   min-height: ${(props) => (props.double ? '200vh' : '100vh')};
//   position: relative;
//   z-index: 2;
//   background: white;
// `
// /* ${(props) => props.isHeightAuto && responsiveMixin} */

// export default FullScreen

import React from 'react'

interface IFullScreenProps {
  children: React.ReactNode
  isCentered?: boolean
}

const FullScreen = ({ children, isCentered = false }: IFullScreenProps) => {
  return (
    <section
      tw="w-full min-h-screen"
      css={[isCentered && _tw`flex items-center justify-center`]}
    >
      {children}
    </section>
  )
}

export default FullScreen
