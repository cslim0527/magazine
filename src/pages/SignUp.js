import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { Grid, Input, Button, Text } from "../elements"

import Logo from '../components/Logo'
import PulseLoader from "react-spinners/PulseLoader";

const SignUp = () => {
  const history = useHistory()

  const inputsObj = {
    user_email: '',
    user_nick: '',
    user_pw: '',
    user_check_pw: ''
  }

  const alertObj = {
    user_email: false,
    user_nick: false,
    user_pw: false,
    user_check_pw: false
  }

  const [alertValues, setAlerts] = useState(alertObj)
  const [inputValues, setInputs] = useState(inputsObj)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {
    checkInputValid()
  }, [inputValues])

  useEffect(() => {

  }, [spinner, alertValues])

  const checkInputValid = () => {
    const pass = Object.values(inputValues).some(value => value === '')
    setBtnDisabled(pass)
  }

  const checkAlertValid = () => {
    const validObj = {}
    const emailValid = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/g
    if (emailValid.test(inputValues.user_email)) {
      validObj.user_email = false
    } else {
      validObj.user_email = true
    }

    const nickValid = /^[가-힣a-zA-Z][가-힣a-zA-Z0-9]{1,8}/g
    if (nickValid.test(inputValues.user_nick) && inputValues.user_nick.length <= 8) {
      validObj.user_nick = false
    } else {
      validObj.user_nick = true
    }

    const pwValid = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/g
    if (pwValid.test(inputValues.user_pw) && inputValues.user_pw.length <= 20) {
      validObj.user_pw = false
    } else {
      validObj.user_pw = true
    }

    const checkPwValie = inputValues.user_pw === inputValues.user_check_pw
    if (checkPwValie) {
      validObj.user_check_pw = false
    } else {
      validObj.user_check_pw = true
    }

    setAlerts({
      ...validObj
    })

    const pass = Object.values(validObj).some(value => !value)
    setBtnDisabled(pass)
  }

  const handleKeyUpInput = (e) => {
    setInputs({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }

  const handleClickSignUp = () => {
    checkAlertValid()

    // TODO  회원가입 비동기 통신 시 가입하기 버튼을 스피너로 변경 할 것
    console.log('회원가입 GO!')
  }

  const handleClickMoveLogin = () => {
    history.push('/login')
  }

  return (
    <SignUpArea>
      <Grid 
        is_container 
        margin="50px auto 10px auto"
        padding="30px 40px"
        border="border: 1px solid var(--border-color)"
        bg="#fff"
      >

        <Logo maxWidth="180px" margin="0 auto 30px auto"/>

        <Text size="16px" color="#aaa" margin="0 0 20px 0" center bold>
          매거진그램에 가입하세요!
        </Text>

        <Grid margin="0 0 6px 0">
          <Input _onKeyUp={handleKeyUpInput} name="user_email" type="email" placeholder="사용자 이메일" autoComplete="off"/>
          { alertValues.user_email && <Text padding="4px" size="12px" color="#ff5722">이메일 형식으로 입력해주세요.</Text> }
        </Grid>

        <Grid margin="0 0 6px 0">
          <Input _onKeyUp={handleKeyUpInput} name="user_nick" type="text" placeholder="닉네임" autoComplete="off"/>
          { alertValues.user_nick && <Text padding="4px" size="12px" color="#ff5722">영문/한글로 시작하는 2-8자 닉네임을 입력해주세요.</Text> }
        </Grid>

        <Grid margin="0 0 6px 0">
          <Input _onKeyUp={handleKeyUpInput} name="user_pw" type="password" placeholder="비밀번호" autoComplete="off"/>
          { alertValues.user_pw && <Text padding="4px" size="12px" color="#ff5722">비밀번호는 숫자와 영문자 특수문자(!@#$%^*+=-)<br/>조합으로 8~20자리를 사용해야 합니다.</Text> }
        </Grid>

        <Grid margin="0 0 14px 0">
          <Input _onKeyUp={handleKeyUpInput} name="user_check_pw" type="password" placeholder="비밀번호 확인" autoComplete="off"/>
          { alertValues.user_check_pw && <Text padding="4px" size="12px" color="#ff5722">비밀번호 확인이 일치하지 않습니다.</Text> }
        </Grid>

        <Grid>
          <Button _onClick={handleClickSignUp} width="100%" size="15px" bold disabled={btnDisabled}>
            { spinner ? <PulseLoader color="#fff" size="5px"/> : '가입하기' }
          </Button>
        </Grid>

      </Grid>

      <Grid 
        is_flex
        is_container 
        padding="20px 40px"
        border="border: 1px solid var(--border-color)"
        bg="#fff"
      >
        계정이 있으신가요? <Button _onClick={handleClickMoveLogin} ver="white" size="15px" bold>로그인</Button>
      </Grid>
    </SignUpArea>
  )
}

const SignUpArea = styled.section`
  max-width: 350px;
  margin: 0 auto;
`

export default SignUp