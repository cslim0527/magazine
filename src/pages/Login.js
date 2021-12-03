import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionCreators as userActions } from '../redux/modules/user'

import Logo from '../components/Logo'
import { Grid, Input, Button, Text } from "../elements"

const Login = (props) => {
  const dispatch = useDispatch()
  const history = props.history
  const [userInfo, setUserInfo] = useState({user_email: '', user_pw: ''})
  const [loginDisabled, setLoginDisabled] = useState(false)
  const loginFailed = useSelector(state => state.user.error)

  const handleGlobalEnter = (e) => {
    if (e.key === 'Enter') {
      dispatch(userActions.loginFB(userInfo))
    }
  }

  useEffect(() => {
    const pass = Object.values(userInfo).some(value => value === '')
    setLoginDisabled(pass)
    window.addEventListener('keyup', handleGlobalEnter)

    return () => {
      window.removeEventListener('keyup', handleGlobalEnter)
    }
  }, [userInfo])

  const handleClickMoveSignUp = () => {
    history.push('/signup')
  }

  const handleClickLoginBtn = () => {
    setLoginDisabled(true)
    // dispatch(userActions.loginFB(userInfo))
  }

  const handleKeyUpLoginForm = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
  }

  const setFailedMessage = () => {
    if (!loginFailed) {
      return null
    } else if (loginFailed === 'auth/invalid-email') {
      return <Text center padding="20px 0 0 0" size="13px" color="#ff5722">
                존재하지 않는 이메일 입니다.
              </Text>
    } else if (loginFailed === 'auth/wrong-password') {
      return <Text center padding="20px 0 0 0" size="13px" color="#ff5722">
                비밀번호가 옳바르지 않습니다.
              </Text>
    }
  }

  return (
    <LoginArea>
      <Grid 
            is_container 
            margin="50px auto 10px auto"
            padding="30px 40px"
            border="border: 1px solid var(--border-color)"
            bg="#fff"
      >
        <Logo maxWidth="180px" margin="0 auto 30px auto"/>

        <Grid margin="0 0 6px 0">
          <Input _onKeyUp={handleKeyUpLoginForm} type="email" name="user_email" placeholder="사용자 이메일" autoComplete="off"/>
        </Grid>

        <Grid margin="0 0 14px 0">
          <Input _onKeyUp={handleKeyUpLoginForm} type="password" name="user_pw" placeholder="비밀번호"  autoComplete="off" />
        </Grid>

        <Grid>
          <Button _onClick={handleClickLoginBtn} width="100%" size="15px" bold disabled={loginDisabled}>로그인</Button>
        </Grid>

        {
          setFailedMessage()
        }

      </Grid>

      <Grid 
        is_flex
        is_container 
        padding="20px 40px"
        border="border: 1px solid var(--border-color)"
        bg="#fff"
      >
        계정이 없으신가요? <Button _onClick={handleClickMoveSignUp} ver="white" size="15px" bold>가입하기</Button>
      </Grid>
    </LoginArea>
  )
}

const LoginArea = styled.section`
  max-width: 350px;
  margin: 0 auto;
`

export default Login