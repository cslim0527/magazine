import React, { useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'

import PulseLoader from "react-spinners/PulseLoader"

const InfinityScroll = (props) => {
  const { children, callNext, paging } = props

  const spinnerRef = useRef(null)
  const handleObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      callNext()
    }
  })
  
  useEffect(() => {

    if (paging.next === null) return
    if (!spinnerRef.current) return

    handleObserver.observe(spinnerRef.current)

    return () => {
      spinnerRef.current && handleObserver.unobserve(spinnerRef.current)
    }
  }, [paging])

  return (
    <React.Fragment>
      { children }
      {
        paging.next &&
        <Spinner ref={spinnerRef}>
          <PulseLoader ref={spinnerRef} color="#aaa" size="8px"/>
        </Spinner>
      }
    </React.Fragment>
  )
}

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  isNext: false,
  loading: false
}

const Spinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 0 30px 0;
`

export default InfinityScroll