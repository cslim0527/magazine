import { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { Grid, Input, Button, Text } from "../elements"

import Logo from '../components/Logo'

const Login = () => {
  const history = useHistory()
  const [userInfo, setUserInfo] = useState({user_email: '', user_pw: ''})
  const [loginDisabled, setLoginDisabled] = useState(false)

  useEffect(() => {
    const pass = Object.values(userInfo).some(value => value === '')
    console.log(pass)
    setLoginDisabled(pass)
  }, [userInfo])

  const handleClickMoveSignUp = () => {
    history.push('/signup')
  }

  const handleClickLoginBtn = () => {
    console.log('로그인 GO !')
    console.log(userInfo)
  }

  const handleKeyUpLoginForm = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    })
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
          <Input _onKeyUp={handleKeyUpLoginForm} type="email" name="user_email" placeholder="사용자 이메일" />
        </Grid>

        <Grid margin="0 0 14px 0">
          <Input _onKeyUp={handleKeyUpLoginForm} type="password" name="user_pw" placeholder="비밀번호" />
        </Grid>

        <Grid>
          <Button _onClick={handleClickLoginBtn} width="100%" size="15px" bold disabled={loginDisabled}>로그인</Button>
        </Grid>

        <Text center padding="20px 0 0 0" size="13px" color="#ff5722">
          존재하지 않는 아이디 입니다.
        </Text>

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