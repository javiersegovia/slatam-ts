import styled from 'styled-components'

// const responsiveMixin = css`
//   ${(props) => props.theme.breakpoints.down(props.isHeightAuto)} {
//     height: auto;
//   }
// `

const FullScreen = styled.div`
  width: 100%;
  min-height: ${(props) => (props.double ? '200vh' : '100vh')};
  position: relative;
  z-index: 2;
  background: white;
`
/* ${(props) => props.isHeightAuto && responsiveMixin} */

export default FullScreen
