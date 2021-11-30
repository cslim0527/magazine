const getCookie = (name) => {
  const cookieStr = document.cookie
  let value = cookieStr.split('; ').filter(parts => parts.indexOf(`${name}=`) > -1)[0]

  if (value) {
    value = value.split(`${name}=`).pop()
    return value
  } else {
    return undefined
  }

}

const setCookie = (name, value, exp = 5) => {
  const date = new Date()
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}`
}

const deleteCookie = (name) => {
  const date = new Date('2020-01-01').toUTCString()
  document.cookie = `${name}=; expires=${date}`
}

export { getCookie, setCookie, deleteCookie }