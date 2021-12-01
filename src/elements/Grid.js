import React from 'react'
import styled from 'styled-components'

/* 
   FIXME  index.js:1 Warning: Received `false` for a non-boolean attribute `bg`.
  초기 렌더링에서 나오는 오류 동작에는 문제가 없지만 오류 콘솔 뜨는것 확인하고 안뜨게 할것
*/
const Grid = (props) => {
  const { className, style, is_flex, is_container, width, height, padding, margin, border, round, bg, children } = props
  const styles = {
    is_flex,
    is_container,
    width,
    height,
    padding,
    margin,
    border,
    round,
    bg,
    style,
    className
  }

  return (
    <GridBox {...styles}>
      { children }
    </GridBox>
  )
}

Grid.defaultProps = {
  is_flex: false,
  is_container: false,
  width: '100%',
  height: '100%',
  padding: '0',
  margin: 'auto',
  border: '0',
  round: '4px',
  bg: false
}

const GridBox = styled.div`
  ${props => props.is_container ? `max-width: var(--container-size); margin: 0 auto` : ''};
  width: ${props => props.width};
  height: ${props => props.height};
  ${props => props.padding ? `padding: ${props.padding}` : ''};
  ${props => props.margin ? `margin: ${props.margin}` : ''};
  ${props => props.bg ? `background-color: ${props.bg}` : ''};
  ${props => props.border ? `${props.border}` : ''};
  border-radius: ${props => props.round ? `${Grid.defaultProps.round}` : ''};
  ${props => props.is_flex ? `display: flex; align-items: center; justify-content: space-between` : ''};
`

export default Grid