import styled from 'styled-components'

const Button = (props) => {
  const { ver, width, height, margin, bold, size, disabled, _onClick, children } = props
  const styles = {
    ver,
    width,
    height,
    margin,
    bold,
    size,
    onClick: _onClick
  }

  return (
    <ButtonElem {...styles} disabled={disabled}>
      { children }
    </ButtonElem>
  )
}

Button.defaultProps = {
  ver: 'blue',
  width: 'auto',
  height: '30px',
  margin: false,
  bold: false,
  size: 'inherit',
  disabeld: false
}

const ButtonElem = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 5px 9px;
  height: ${props => props.height};
  ${props => props.width ? `width: ${props.width}` : ''};
  ${props => props.margin ? `margin: ${props.margin}` : ''};
  ${props => props.size ? `font-size: ${props.size}` : ''};

  ${ props => props.ver === 'white' && 'color: var(--button-bg); background-color: #fff'};
  ${ props => props.ver === 'blue' && 'color: #fff; background-color: var(--button-bg)'};
  ${ props => props.ver === 'heart-off' && 'color: #bbb'};
  ${ props => props.ver === 'heart-on' && 'color: #ed4956'};

  ${
    props => props.bold 
      ? `font-family: 'Pretendard-Bold';` 
      : `font-family: 'Pretendard-Regular';`
  };

  &:disabled {
    cursor: default;
    background-color: #0095f657;
  }
`

export default Button