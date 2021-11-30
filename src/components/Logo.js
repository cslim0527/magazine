import styled from 'styled-components'
import { useHistory } from 'react-router'

import logo from '../images/logo.jpg'

const Logo = (props) => {
  const { maxWidth, margin } = props
  const styles = {
    maxWidth,
    margin
  }

  const history = useHistory()
  const handleClickLogo = () => {
    console.log('메인으로!')
    history.push('/')
  }

  return (
    <LogoElem {...styles} onClick={handleClickLogo}>
      <img src={logo} alt="magazingram" title="magazingram"/>
    </LogoElem>
  )
}

Logo.defaultProps = {
  margin: false,
  maxWidth: "94px"
}

const LogoElem = styled.h1`
  cursor: pointer;
  max-width: ${props => props.maxWidth ? props.maxWidth : '94px'};
  ${props => props.margin ? `margin: ${props.margin}` : ''};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
  }

  &:active {
    opacity: 0.5;
  }
`
export default Logo