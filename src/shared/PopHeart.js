import styled, { keyframes } from 'styled-components'

import FavoriteIcon from '@material-ui/icons/Favorite';

const PopHeart = () => {
  return (
    <PopArea>
      <FavoriteIcon/>
    </PopArea>
  )
}

const popAnimation = keyframes`
  0%,
  to {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  15% {
    opacity: 0.9;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  30% {
    -webkit-transform: scale(0.95);
    transform: scale(0.95);
  }
  45%,
  80% {
    opacity: 0.9;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`

const PopArea = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    color: #ed4956;
    font-size: 120px;
  }

  animation: ${popAnimation} 0.75s forwards;
`


export default PopHeart