import styled from 'styled-components'

const Input = (props) => {
  const { width, height, type, bg, placeholder, padding, margin, border, name, _onKeyUp, children } = props
  const labelStyles = {
    width,
    height
  }

  const inputStyles = {
    type,
    name,
    bg,
    placeholder,
    border,
    padding,
    margin,
    onKeyUp: _onKeyUp
  }

  return (
    <Label {...labelStyles}>
      { children }
      <input {...inputStyles} />
    </Label>
  )
}

Input.defaultProps = {
  width: '100%',
  height: '38px',
  type: 'text',
  bg: false,
  placeholder: false,
  border: false,
  padding: false,
  margin: false
}

const Label = styled.label`

  input {
    width: 100%;
    height: 100%;
    border-radius: 3px;
    ${props => props.border ?  `border: ${props.borber}` : 'border: 1px solid #dbdbdb'};
    ${props => props.bg ? `background-color: ${props.bg}` : 'background-color: #fafafa'};
    ${props => props.padding ? `padding: ${props.padding}` : 'padding: 10px'};
    ${props => props.margin ? `margin: ${props.margin}` : ''};
    &:focus {
      border: 1px solid #666;
    }
  }
`

export default Input