import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { actionCreators as userActions } from '../redux/modules/user'
import { apiKey } from '../shared/firebase'

import Logo from './Logo'
import { Grid, Button } from "../elements"

const Header = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const isLogin = useSelector(state => state.user.is_login)
  const _sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`
  const hasSession = sessionStorage.getItem(_sessionKey)
  console.log(apiKey, hasSession, isLogin)
  const handleClickMoveLogin = () => {
    console.log('로그인!')
    history.push('/login')
  }

  const handleClickMoveSignUp = () => {
    console.log('회원가입!')
    history.push('/signup')
  }

  const handleClickMoveLogOut = () => {
    dispatch(userActions.logoutFB())
  }

  if (isLogin && hasSession) {
    return (
      <HeaderArea>
        <Grid bg="#fff" height="54px" padding="0 16px" border="border-bottom: 1px solid var(--border-color)">
          <Grid is_container is_flex>
            <Logo/>
            <Grid is_flex>
              <Button margin="0 10px 0 auto">내정보</Button>
              <Button ver="white">알림</Button>
              <Button _onClick={handleClickMoveLogOut} ver="white">로그아웃</Button>
            </Grid>
          </Grid>
        </Grid>
      </HeaderArea>
    )
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