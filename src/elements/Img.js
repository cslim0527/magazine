import React from "react"
import styled from 'styled-components'

const Img = (props) => {
  const { shape, content_img, width, height, margin, user_profile } = props
  const rectStyles = {
    margin,
    content_img
  }

  const circleStyles = {
    width,
    height,
    margin,
    user_profile,
  }

  if (shape === 'circle') {
    return (
      <CircleElem {...circleStyles} />
    )
  }

  if (shape === 'rect') {
    return (
      <RatioBox {...rectStyles}/>
    )
  }
}

Img.defaultProps = {
  shape: 'normal',
  width: '32px',
  height: '32px',
  margin: false,
  content_img: 'https://www.freeiconspng.com/uploads/no-image-icon-1.jpg',
  user_profile: 'https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png'
}

const RatioBox = styled.div`
  position: relative;
  padding-bottom: 75%;
  background-image: url("${props => props.content_img}");
  background-size: auto 100%;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
`

const CircleElem = styled.div`
  width: ${({ width }) => width };
  height: ${({ height }) => height };
  margin: ${({ margin }) => margin ? `${margin}` : '' };
  background-image: url("${({ user_profile }) => user_profile ? user_profile : Img.defaultProps.user_profile}");
  background-size: cover;
  border-radius: 50%;
  flex-shrink: 0;
`

export default Img