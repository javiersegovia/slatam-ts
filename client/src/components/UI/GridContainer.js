import styled from 'styled-components'
import Container from './Container'

const GridContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(12, [col-start] 1fr);
  grid-gap: 20px;
`

export default GridContainer
