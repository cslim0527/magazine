import React, { useEffect } from 'react'
import GlobalStyles from '../Global'
import styled from 'styled-components'
import { useLocation } from 'react-router'
import { Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { actionCreators as userActions } from '../redux/modules/user'
import { apiKey } from '../shared/firebase'

import Header from '../components/Header'
import PostList from '../pages/PostList'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import PostWrite from '../pages/PostWrite'
import PostDetail from '../pages/PostDetail'

function App() {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const _sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`
  const hasSession = sessionStorage.getItem(_sessionKey)

  // FIXME  로그인 유지는 되지만 초기 렌더링 시에 로그아웃 상태의 UI가 그대로 나왔다가 바뀌는점 보완 할 것
  useEffect(() => {
    if (hasSession) {
      dispatch(userActions.loginCheckFB())
    }
  }, [])

  return (
    <React.Fragment>
      <GlobalStyles />
      {
        !(pathname === '/login' || pathname === '/signup')
          && <Header/>
      }
      
      <Route path="/" exact component={PostList} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/postwrite" exact component={PostWrite} />
      <Route path="/detail" exact component={PostDetail} />
    </React.Fragment>
  );
}

export default App;
