import React, { useEffect } from 'react'

const ScrollTop = (props) => {
  const { children } = props

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div>
      { children }
    </div>
  )
}

export default ScrollTop