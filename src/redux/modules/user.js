import { createAction, handleActions } from 'redux-actions'
import { produce } from 'immer'
import { getCookie, setCookie, deleteCookie } from '../../shared/Cookie'
import firebase from 'firebase/compat/app';
import { auth } from '../../shared/firebase'

// action type
const LOG_OUT = "LOG_OUT"
const GET_USER = "GET_USER"
const SET_USER = "SET_USER"
const LOG_IN_FAILED = "LOG_IN_FAILED"

// initialState
const initialState = {
  user: null,
  is_login: false,
  error: null
}

// action creator
const logOut = createAction(LOG_OUT, () => ({}))
const getUser = createAction(GET_USER, (user) => ({user}))
const setUser = createAction(SET_USER, (user) => ({user}))
const loginFailed = createAction(LOG_IN_FAILED, (error) => ({error}))

// middlewares
const loginAction = (user) => {
  return (dispatch, getState, { history }) => {
    dispatch(setUser(user))
    history.push('/')
  }
}

const logoutAction = (user) => {
  return (dispatch, getState, { history }) => {
    dispatch(logOut(user))
    history.push('/')
  }
}

const loginFB = ({user_email, user_pw}) => {
  return (dispatch, getState, { history }) => {
    // 로그인 유지
    auth
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {

      // 로그인
      auth
      .signInWithEmailAndPassword(user_email, user_pw)
      .then((userCredential) => {
  
        const user = userCredential.user;
        dispatch(setUser({
          uid: user.uid, // 고유값
          user_profile: '',
          user_email: user_email,
          user_nick: user.displayName
        }))
  
        history.push('/')
      })
      .catch((error) => {
        dispatch(loginFailed(error.code))
      });
    })
  }
}

const loginCheckFB = () => {
  return (dispatch, getState) => {

    // 유저 정보의 존재 여부
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser({
          user_nick: user.displayName,
          user_email: user.email,
          user_profile: '',
          uid: user.uid
        }))
      } else {
        dispatch(logOut())
      }
    })
  }
}

const signUpFB = (email, pw, nick) => {
  return (dispatch, getState, { history }) => {
    auth
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      auth
      .createUserWithEmailAndPassword(email, pw)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user

        // Nickname update
        auth.currentUser
          .updateProfile({
            displayName: nick
          })
          .then(() => {
            dispatch(setUser({
              uid: user.uid, // 고유값
              user_email: email,
              user_pw: pw,
              user_nick: nick,
              user_profile: ''
            }))

            history.push('/')
          }) 
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
    })
  }
}

const logoutFB = () => {
  return (dispatch, getState, { history }) => {
    auth
      .signOut()
      .then(() => {
        dispatch(logOut())
        history.replace('/')
      })
  }
}

// reducer
export default handleActions({
  [SET_USER]: (state, action) => produce(state, (draft) => {
    setCookie('is_login', 'success')
    draft.user = action.payload.user
    draft.is_login = true
  }),

  [LOG_OUT]: (state, action) => produce(state, (draft) => {
    deleteCookie('is_login')
    draft.user = null
    draft.is_login = false
  }),

  [LOG_IN_FAILED]: (state, action) => produce(state, (draft) => {
    draft.user = null
    draft.is_login = false
    draft.error = action.payload.error
  }),

  [GET_USER]: (state, action) => produce(state, (draft) => {})

}, initialState)

const actionCreators = {
  logOut, 
  getUser,
  loginAction,
  logoutAction,
  signUpFB,
  loginFB,
  loginCheckFB,
  logoutFB
}

export { actionCreators }