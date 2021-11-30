import React from "react"
import { useSelector } from "react-redux"
import { apiKey } from "./firebase"

const Permit = (props) => {
  const isLogin = useSelector(state => state.user.user)
  const _sessionKey = `firebase:authUser:${apiKey}:[DEFAULT]`
  const hasSession = sessionStorage.getItem(_sessionKey)
  console.log('permit', isLogin, hasSession)

  if (hasSession && isLogin) {
    return (
      <React.Fragment>
        {props.children}
      </React.Fragment>
    )
  }

  return null
}

export default Permit