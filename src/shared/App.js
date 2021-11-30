import React from 'react'
import GlobalStyles from '../Global'
import styled from 'styled-components'
import { useLocation } from 'react-router'
import { Route } from 'react-router-dom'

import Header from '../components/Header'
import PostList from '../pages/PostList'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'

function App() {
  const { pathname } = useLocation()

  return (
    <React.Fragment>
      <GlobalStyles />
      {
        (pathname !== '/login' || pathname !== '/signup')
          && <Header/>
      }
      <Route path="/" exact component={PostList} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={SignUp} />
    </React.Fragment>
  );
}

export default App;
