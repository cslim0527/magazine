import React from "react"
import styled from 'styled-components'

const Text = (props) => {
  const { style, bold, size, margin, padding, center, color, children } = props
  const styles = {
    style,
    bold,
    size,
    margin,
    padding,
    center,
    color
  }

  return (
    <TextElem {...styles}>
      { children }
    </TextElem>
  )
}

Text.defaultProps = {
  color: '#262626',
  bold: false,
  size: '14px',
  margin: false,
  padding: false,
  center: false,
  width: 'auto'
}

const TextElem = styled.div`
  word-break: break-all;
  color: ${props => props.color ? props.color : Text.defaultProps.color};
  width: ${props => props.width ? props.width : Text.defaultProps.width};
  ${props => props.size ? `font-size: ${props.size}` : Text.defaultProps.size};
  ${props => props.margin ? `margin: ${props.margin}` : ''};
  ${props => props.padding ? `padding: ${props.padding}` : ''};
  ${props => props.center ? `text-align: center` : ''};
  ${props => props.bold ? `font-family: 'Pretendard-Bold';` : `font-family: 'Pretendard-Regular';`};
  ${props => props.style && props.style}
`

export default Text