import React, { forwardRef } from 'react'
import styled from 'styled-components'

const Textarea = forwardRef((props, ref) => {
  const { style, _onChange, maxh, border, placeholder, padding, size, resize, width, height } = props
  const styles = {
    border,
    placeholder,
    padding,
    size,
    resize,
    width,
    height,
    maxh,
    onChange: _onChange,
  }

  return (
    <TaBox {...styles} ref={ref}></TaBox>
  )
})

Textarea.defaultProps = {
  border: '1px solid var(--border-color)',
  placeholder: false,
  padding: '16px',
  size: '14px',
  resize: 'none',
  width: '100%',
  height: 'auto',
  maxh: 'auto'
}

const TaBox = styled.textarea`
  border: ${({border}) => border };
  padding: ${({padding}) => padding };
  font-size: ${({size}) => size };
  resize: ${({resize}) => resize };
  width: ${({width}) => width };
  height: ${({height}) => height };
  max-height: ${({maxh}) => maxh };

  border-radius: 4px;

  &:focus {
    border-color: #666;
  }
`

export default Textarea