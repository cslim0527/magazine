import { useState, useEffect, useRef } from 'react'
import { history } from '../redux/configureStore' 
import styled from 'styled-components'
// import notFoundImg from '../img/not_found.png'

const Escape = (props) => {
  console.log(props)
  const [count, setCounter] = useState(3)
  const interval = useRef(null)
  const initialCnt = useRef(3)

  useEffect(() => {
    interval.current = setInterval(() => {
      initialCnt.current -= 1
      setCounter(initialCnt.current)
    }, 1000)

    return  () => clearInterval(interval.current)
  }, [])

  useEffect(() => {
    if (count <= 0) {
      clearInterval(interval.current)
      history.replace('/')
    }
  }, [count])
  return (
    <NotFoundBox>
      {/*<img src={notFoundImg} alt="" />*/}
      <span>존재하지 않는 페이지에요 !</span>
      <span className="counter"><b>{ count }</b> 초 후 페이지가 이동됩니다.</span>
    </NotFoundBox>
  );
};

const NotFoundBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 22px;
  padding-top: 80px;
  
  img {
    max-width: 140px;
    width: 50%;
    padding: 40px 0;
  }

  .counter {
    font-size: 20px;
    margin-top: 10px;

    b {
      color: #e91e63;
    }
  }
`

export default Escape;