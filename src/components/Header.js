import styled from 'styled-components'
import { useHistory } from 'react-router'

import Logo from './Logo'
import { Grid, Button } from "../elements"

const Header = () => {
  const history = useHistory()

  const handleClickMoveLogin = () => {
    console.log('로그인!')
    history.push('/login')
  }

  const handleClickMoveSignUp = () => {
    console.log('회원가입!')
    history.push('/signup')
  }

  return (
    <HeaderArea>
      <Grid bg="#fff" height="54px" padding="0 16px" border="border-bottom: 1px solid var(--border-color)">
        <Grid is_container is_flex>
          <Logo/>
          <Grid is_flex>
            <Button _onClick={handleClickMoveLogin} margin="0 10px 0 auto">로그인</Button>
            <Button _onClick={handleClickMoveSignUp} ver="white">회원가입</Button>
          </Grid>
        </Grid>
      </Grid>
    </HeaderArea>
  )
}

const HeaderArea = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
`

export default Header