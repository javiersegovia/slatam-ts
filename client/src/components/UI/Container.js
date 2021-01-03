import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Styles = styled.div`
  margin: 0 auto;
  padding: 0 60px;
  width: 100%;

  /* ${(props) => props.theme.breakpoints.down('lg')} {
    padding: 0 30px;
  } */

  /* ${(props) => props.theme.breakpoints.down('sm')} {
    padding: 0 30px;
    ${(props) => props.fullWidth === 'sm' && `padding: 0;`}
  } */

  /* ${(props) => props.theme.breakpoints.down('xs')} {
    max-width: 100%;
    padding: 0 15px;
    ${(props) =>
    (props.fullWidth === 'sm' || props.fullWidth === 'xs') && `padding: 0;`} */
  /* } */

  /* ${(props) =>
    props.limited &&
    `
    max-width: 1500px;
  `} */
`

const Container = ({ children, ...otherProps }) => (
  <Styles {...otherProps}>{children}</Styles>
)

Container.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Container
